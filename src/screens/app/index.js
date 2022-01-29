import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { BiLoaderAlt } from 'react-icons/bi';
import { BsArrowRightSquareFill } from 'react-icons/bs';
import axios from 'axios';

import Search from './components/search';
import List from './components/list';
import { Actions, Button, Container } from './styles';

function App() {
  const [dataset, setDataset] = useState(null);

  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const reList = useCallback(() => {
    setLoading('list');

    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/names`, {
        params: {
          dataset: dataset.id,
          tmp: String(dataset.tmp || 0),
        },
      })
      .then((response) => {
        setNames(
          response.data.map((name) => ({
            name,
          }))
        );
        setLoading(false);
      });
  }, [dataset]);

  useEffect(() => {
    if (dataset) {
      reList(dataset);
    }
  }, [dataset, reList]);

  const sendFeedback = useCallback(() => {
    setLoading('feedback');
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/datasets/${dataset.id}/feedbacks`,
        names.filter(({ value }) => value && value !== 0)
      )
      .then(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, [dataset, names]);

  return (
    <div>
      <Search onSelect={setDataset} />

      <Container>
        <p>
          Click on the generated names to give feedback, bad feedbacks makes
          names to not be listed again!
        </p>

        <List data={names} onFeedback={(data) => setNames(data)} />

        {names.length > 0 && (
          <Actions>
            <Button
              type="button"
              onClick={() => reList(dataset)}
              disabled={loading}
              $rotate={loading === 'list'}
              data-testid="refresh"
            >
              <AiOutlineReload size={20} color="#bbb" />
              <span>Refresh</span>
            </Button>
            <Button
              onClick={sendFeedback}
              disabled={loading}
              $rotate={loading === 'feedback'}
              data-testid="feedback"
            >
              <span>Send Feedback</span>
              {loading === 'feedback' ? (
                <BiLoaderAlt size={20} />
              ) : (
                <BsArrowRightSquareFill size={20} color="#bbb" />
              )}
            </Button>
          </Actions>
        )}
      </Container>
    </div>
  );
}

export default App;
