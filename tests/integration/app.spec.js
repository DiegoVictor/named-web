import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import Adapter from 'axios-mock-adapter';
import faker from 'faker';

import api from '../../src/services/api';
import factory from '../utils/factory';
import App from '../../src/screens/app';

const mock = new Adapter(api);
const baseUrl = 'http://localhost:8080';

jest.useFakeTimers();

describe('App', () => {
  beforeAll(() => {
    process.env.REACT_APP_API_BASE_URL = baseUrl;
  });

  it('should be able to search between datasets', async () => {
    const datasets = await factory.attrsMany('Dataset', 3);
    mock.onGet('/datasets').reply(200, datasets);

    const { getByPlaceholderText, queryByText, getByText, getByTestId } =
      render(<App />);

    const [dataset, ...rest] = datasets;
    await waitFor(() => getByText(dataset.title));

    expect(getByTestId('options')).toHaveStyle({ 'max-height': '0px' });
    const input = getByPlaceholderText('Choose a datasets');
    await act(async () => {
      fireEvent.focus(input);
    });
    expect(getByTestId('options')).toHaveStyle({ 'max-height': '300px' });

    await act(async () => {
      fireEvent.change(input, { target: { value: dataset.title } });
    });
    rest.forEach(({ title }) => {
      expect(queryByText(title)).not.toBeInTheDocument();
    });
    expect(getByTestId(`option-${dataset.id}`)).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(getByTestId('clear'));
    });
    datasets.forEach(({ title }) => {
      expect(queryByText(title)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.blur(input);
      jest.advanceTimersByTime(1000);
    });
    expect(getByTestId('options')).toHaveStyle({ 'max-height': '0px' });
  });

  it('should be able to get generated names list', async () => {
    const datasets = await factory.attrsMany('Dataset', 3);
    const names = Array.from({ length: 6 }, () => faker.name.findName());

    mock
      .onGet('/datasets')
      .reply(200, datasets)
      .onGet('/names')
      .reply(200, names);

    const { getByPlaceholderText, getByTestId, getByText } = render(<App />);

    await act(async () => {
      fireEvent.focus(getByPlaceholderText('Choose a datasets'));
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
    const [{ id }, ...datasets] = await factory.attrsMany('Dataset', 3);

    const csv = Array.from(
      { length: 50 },
      () => `${faker.name.firstName()}\r\n`
    );
    csv.unshift('name\n');
    const file = new File(csv, 'file.csv');

    mock
      .onGet('/datasets')
      .reply(200, datasets)
      .onPost('/upload')
      .reply(200, { id });

    const { getByTestId, getByText, getByPlaceholderText, queryByText } =
      render(<App />);

    expect(queryByText('Temporary')).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.change(getByTestId('file'), {
        target: { files: [file] },
      });
    });
    await act(async () => {
      fireEvent.focus(getByPlaceholderText('Choose a datasets'));
    });

    await waitFor(() => getByText('Temporary'));
    expect(getByTestId(`option-${id}`)).toBeInTheDocument();
  });

  it('should not be able to upload a dataset without headers', async () => {
    const [{ id }, ...datasets] = await factory.attrsMany('Dataset', 3);

    const csv = Array.from(
      { length: 50 },
      () => `${faker.name.firstName()}\r\n`
    );
    const file = new File(csv, 'file.csv');

    mock
      .onGet('/datasets')
      .reply(200, datasets)
      .onPost('/upload')
      .reply(200, { id });

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

  it('should not be able to upload a dataset without enough names sample', async () => {
    const [{ id }, ...datasets] = await factory.attrsMany('Dataset', 3);

    const csv = Array.from(
      { length: 5 },
      () => `${faker.name.firstName()}\r\n`
    );
    csv.unshift('name\n');
    const file = new File(csv, 'file.csv');

    mock
      .onGet('/datasets')
      .reply(200, datasets)
      .onPost('/upload')
      .reply(200, { id });

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
    const [goodFeedback, badFeedback] = names;

    mock
      .onGet('/datasets')
      .reply(200, datasets)
      .onGet('/names')
      .reply(200, names)
      .onPost(/datasets\/\d+\/feedbacks/gi)
      .reply((config) => {
        const data = JSON.parse(config.data);

        expect(data).toStrictEqual([
          {
            name: goodFeedback,
            value: 1,
          },
          {
            name: badFeedback,
            value: -1,
          },
        ]);
        return [200];
      });

    const { getByPlaceholderText, getByTestId, getByText } = render(<App />);

    await act(async () => {
      fireEvent.focus(getByPlaceholderText('Choose a datasets'));
    });

    const [{ id }] = datasets;
    await act(async () => {
      fireEvent.click(getByTestId(`option-${id}`));
    });

    names.forEach((name) => {
      expect(getByText(name)).toBeInTheDocument();
    });

    const regex = /\s/gi;
    fireEvent.click(getByTestId(`name-${goodFeedback.replace(regex, '')}`));
    Array.from({ length: 2 }, () =>
      fireEvent.click(getByTestId(`name-${badFeedback.replace(regex, '')}`))
    );

    const sendFeedbackButton = getByTestId('feedback');
    await act(async () => {
      fireEvent.click(sendFeedbackButton);
    });
    expect(sendFeedbackButton).toBeDisabled();

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(sendFeedbackButton).not.toBeDisabled();
  });

  it('should be able to get more generated names', async () => {
    const datasets = await factory.attrsMany('Dataset', 3);
    const names = Array.from({ length: 12 }, () => faker.name.findName());

    mock.reset();
    mock
      .onGet('/datasets')
      .reply(200, datasets)
      .onGet('/names')
      .replyOnce(200, names.slice(0, 6))
      .onGet('/names')
      .replyOnce(200, names.slice(6));

    const { getByPlaceholderText, getByTestId, getByText } = render(<App />);

    await act(async () => {
      fireEvent.focus(getByPlaceholderText('Choose a datasets'));
    });

    const [{ id }] = datasets;
    await act(async () => {
      fireEvent.click(getByTestId(`option-${id}`));
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
