import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import Adapter from 'axios-mock-adapter';
import axios from 'axios';
import faker from 'faker';

import factory from '../utils/factory';
import App from '../../src/screens/app';

const mock = new Adapter(axios);

jest.useFakeTimers();

describe('App', () => {
  beforeAll(() => {
    process.env.REACT_APP_API_BASE_URL = 'http://localhost:8080';
  });

  it('should be able to search a dataset', async () => {
    const datasets = await factory.attrsMany('Dataset', 3);

    mock
      .onGet(`${process.env.REACT_APP_API_BASE_URL}/datasets`)
      .reply(200, datasets);

    const { getByPlaceholderText, queryByText, getByTestId } = render(<App />);

    const [dataset] = datasets;
    const input = getByPlaceholderText('Choose a datasets');

    await act(async () => {
      fireEvent.change(input, { target: { value: dataset.title } });
    });

    datasets.slice(1).forEach(({ title }) => {
      expect(queryByText(title)).not.toBeInTheDocument();
    });
    expect(getByTestId(`option-${dataset.id}`)).toBeInTheDocument();
  });

  it('should be able to clear the search', async () => {
    const datasets = await factory.attrsMany('Dataset', 3);

    mock
      .onGet(`${process.env.REACT_APP_API_BASE_URL}/datasets`)
      .reply(200, datasets);

    const { getByPlaceholderText, queryByText, getByTestId } = render(<App />);

    const [dataset] = datasets;
    const input = getByPlaceholderText('Choose a datasets');

    await act(async () => {
      fireEvent.change(input, { target: { value: dataset.title } });
    });

    datasets.slice(1).forEach(({ title }) => {
      expect(queryByText(title)).not.toBeInTheDocument();
    });
    expect(getByTestId(`option-${dataset.id}`)).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(getByTestId('clear'));
    });
    datasets.forEach(({ title }) => {
      expect(queryByText(title)).toBeInTheDocument();
    });
  });

  it('should the list be closed after lost focus', async () => {
    const datasets = await factory.attrsMany('Dataset', 3);

    mock
      .onGet(`${process.env.REACT_APP_API_BASE_URL}/datasets`)
      .reply(200, datasets);

    const { getByPlaceholderText, getByText, getByTestId } = render(<App />);

    const [dataset] = datasets;
    await waitFor(() => getByText(dataset.title));

    expect(getByTestId('options')).toHaveStyle({ 'max-height': '0px' });

    const input = getByPlaceholderText('Choose a datasets');
    await act(async () => {
      fireEvent.focus(input);
    });

    expect(getByTestId('options')).toHaveStyle({ 'max-height': '300px' });

    await act(async () => {
      fireEvent.blur(input);
      jest.advanceTimersByTime(1000);
    });

    expect(getByTestId('options')).toHaveStyle({ 'max-height': '0px' });
  });

  it('should be able to get generated names', async () => {
    const datasets = await factory.attrsMany('Dataset', 3);
    const names = Array.from({ length: 6 }, () => faker.name.findName());

    mock
      .onGet(`${process.env.REACT_APP_API_BASE_URL}/datasets`)
      .reply(200, datasets)
      .onGet(`${process.env.REACT_APP_API_BASE_URL}/names`)
      .reply(200, names);

    const { getByPlaceholderText, getByTestId, getByText } = render(<App />);

    const input = getByPlaceholderText('Choose a datasets');

    await act(async () => {
      fireEvent.focus(input);
    });

    const [dataset] = datasets;
    await act(async () => {
      fireEvent.click(getByTestId(`option-${dataset.id}`));
    });

    names.forEach((name) => {
      expect(getByText(name)).toBeInTheDocument();
    });
  });

  it('should be able to upload a custom dataset', async () => {
    const [dataset, ...datasets] = await factory.attrsMany('Dataset', 3);

    const csv = Array.from(
      { length: 50 },
      () => `${faker.name.firstName()}\r\n`
    );
    csv.unshift('name\n');
    const file = new File(csv, 'file.csv');

    mock
      .onGet(`${process.env.REACT_APP_API_BASE_URL}/datasets`)
      .reply(200, datasets)
      .onPost(`${process.env.REACT_APP_API_BASE_URL}/upload`)
      .reply(200, { id: dataset.id });

    const { getByTestId, getByText, getByPlaceholderText } = render(<App />);

    await act(async () => {
      fireEvent.change(getByTestId('file'), {
        target: { files: [file] },
      });
    });

    await act(async () => {
      fireEvent.focus(getByPlaceholderText('Choose a datasets'));
    });

    await waitFor(() => getByText('Custom'));

    expect(getByTestId(`option-${dataset.id}`)).toBeInTheDocument();
  });

  it('should not be able to upload a dataset without headers', async () => {
    const [dataset, ...datasets] = await factory.attrsMany('Dataset', 3);

    const csv = Array.from(
      { length: 50 },
      () => `${faker.name.firstName()}\r\n`
    );
    const file = new File(csv, 'file.csv');

    mock
      .onGet(`${process.env.REACT_APP_API_BASE_URL}/datasets`)
      .reply(200, datasets)
      .onPost(`${process.env.REACT_APP_API_BASE_URL}/upload`)
      .reply(200, { id: dataset.id });

    const alert = jest.fn();
    window.alert = alert;

    const { getByTestId, getByPlaceholderText } = render(<App />);

    await act(async () => {
      fireEvent.change(getByTestId('file'), {
        target: { files: [file] },
      });
    });

    await act(async () => {
      fireEvent.focus(getByPlaceholderText('Choose a datasets'));
    });

    expect(alert).toHaveBeenCalledWith(
      'The first line must be the header "name"'
    );
  });

  it('should not be able to upload a dataset without enough data', async () => {
    const [dataset, ...datasets] = await factory.attrsMany('Dataset', 3);

    const csv = Array.from(
      { length: 5 },
      () => `${faker.name.firstName()}\r\n`
    );
    csv.unshift('name\n');
    const file = new File(csv, 'file.csv');

    mock
      .onGet(`${process.env.REACT_APP_API_BASE_URL}/datasets`)
      .reply(200, datasets)
      .onPost(`${process.env.REACT_APP_API_BASE_URL}/upload`)
      .reply(200, { id: dataset.id });

    const alert = jest.fn();
    window.alert = alert;

    const { getByTestId, getByPlaceholderText } = render(<App />);

    await act(async () => {
      fireEvent.change(getByTestId('file'), {
        target: { files: [file] },
      });
    });

    await act(async () => {
      fireEvent.focus(getByPlaceholderText('Choose a datasets'));
    });

    expect(alert).toHaveBeenCalledWith(
      'The CSV file must have at least 23 names'
    );
  });

  it('should be able to give feedback to generated names', async () => {
    const datasets = await factory.attrsMany('Dataset', 3);
    const names = Array.from({ length: 6 }, () => faker.name.findName());
    const [good, bad] = names;

    mock
      .onGet(`${process.env.REACT_APP_API_BASE_URL}/datasets`)
      .reply(200, datasets)
      .onGet(`${process.env.REACT_APP_API_BASE_URL}/names`)
      .reply(200, names)
      .onPost(
        new RegExp(
          `${process.env.REACT_APP_API_BASE_URL}/datasets/\\d+/feedbacks`
        )
      )
      .reply((config) => {
        const data = JSON.parse(config.data);

        [bad, good].forEach((item, index) => {
          expect(data.find(({ name }) => name === item)).toStrictEqual({
            name: item,
            value: index > 0 ? 1 : -1,
          });
        });
        return [200];
      });

    const { getByPlaceholderText, getByTestId, getByText } = render(<App />);

    const input = getByPlaceholderText('Choose a datasets');

    await act(async () => {
      fireEvent.focus(input);
    });

    const [dataset] = datasets;
    await act(async () => {
      fireEvent.click(getByTestId(`option-${dataset.id}`));
    });

    names.forEach((name) => {
      expect(getByText(name)).toBeInTheDocument();
    });

    [good, bad, bad].forEach((item) => {
      fireEvent.click(getByTestId(`name-${item.replace(/\s/gi, '')}`));
    });

    const feedbackButton = getByTestId('feedback');
    await act(async () => {
      fireEvent.click(feedbackButton);
    });
    expect(feedbackButton).toBeDisabled();

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(feedbackButton).not.toBeDisabled();
  });

  it('should be able to get more generated names', async () => {
    const datasets = await factory.attrsMany('Dataset', 3);
    const names = Array.from({ length: 12 }, () => faker.name.findName());

    mock.reset();
    mock
      .onGet(`${process.env.REACT_APP_API_BASE_URL}/datasets`)
      .reply(200, datasets)
      .onGet(`${process.env.REACT_APP_API_BASE_URL}/names`)
      .replyOnce(200, names.slice(0, 6))
      .onGet(`${process.env.REACT_APP_API_BASE_URL}/names`)
      .replyOnce(200, names.slice(6));

    const { getByPlaceholderText, getByTestId, getByText } = render(<App />);

    const input = getByPlaceholderText('Choose a datasets');

    await act(async () => {
      fireEvent.focus(input);
    });

    const [dataset] = datasets;
    await act(async () => {
      fireEvent.click(getByTestId(`option-${dataset.id}`));
    });

    names.slice(0, 6).forEach((name) => {
      expect(getByText(name)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(getByTestId('refresh'));
    });

    names.slice(6).forEach((name) => {
      expect(getByText(name)).toBeInTheDocument();
    });
  });
});
