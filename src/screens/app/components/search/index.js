import React, { useEffect, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { GrFormClose } from 'react-icons/gr';
import PropTypes from 'prop-types';

import Input from 'components/input';
import { Modal } from 'components/modal/styles';
import api from 'services/api';
import Options from '../options';

function Search({ onSelect }) {
  const [query, setQuery] = useState('');

  const [results, setResults] = useState([]);
  const [datasets, setDatasets] = useState([]);
  useEffect(() => {
    api.get('/datasets').then((response) => {
      setDatasets(response.data);
      setResults(response.data);
    });
  }, []);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (query.length > 2) {
      setResults(
        datasets.filter(
          ({ title }) => title.search(new RegExp(query, 'gi')) > -1
        )
      );
    } else {
      setResults(datasets);
    }
  }, [query, open, datasets]);

  return (
    <Modal>
      <Input
        placeholder="Choose a datasets"
        left={<GoSearch size={26} color="#CBCDD7" />}
        onChange={setQuery}
        onFocus={() => setOpen(true)}
        onBlur={() =>
          query.length < 3 &&
          setTimeout(() => {
            setOpen(false);
          }, 100)
        }
        value={query}
        right={
          query.length > 0 ? (
            <button
              type="button"
              data-testid="clear"
              onClick={() => {
                setOpen(false);
                setQuery('');
              }}
            >
              <GrFormClose size={26} color="#CBCDD7" />
            </button>
          ) : null
        }
      />
      <Options
        data={results}
        open={open}
        onSelect={(dataset, custom = false) => {
          if (!custom) {
            setQuery('');
            onSelect(dataset);
          } else {
            setDatasets([...datasets, dataset]);
          }
          setOpen(custom);
        }}
      />
    </Modal>
  );
}

Search.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default Search;
