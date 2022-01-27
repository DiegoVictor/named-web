import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { GrFormClose } from "react-icons/gr";
import axios from "axios";

import Input from "../../../../components/input";
import { Modal } from "../../../../components/modal/styles";
import Options from "../options";

function Search({ onSelect }) {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);
  const [datasets, setDatasets] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/datasets`)
      .then((response) => {
        setDatasets(response.data);
        setResults(response.data);
      });
  }, []);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (query.length > 2) {
      setResults(
        datasets.filter(
          ({ title }) => title.search(new RegExp(query, "gi")) > -1
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
          query.length > 0 && (
            <button
              type="button"
              data-testid="clear"
              onClick={() => {
                setOpen(false);
                setQuery("");
              }}
            >
              <GrFormClose size={26} color="#CBCDD7" />
            </button>
          )
        }
      />
      <Options
        data={results}
        open={open}
        onSelect={(dataset, custom = null) => {
          if (custom) {
            setDatasets([...datasets, dataset]);
            setOpen(true);
          } else {
            setOpen(false);
            setQuery("");
            onSelect(dataset);
          }
        }}
      />
    </Modal>
  );
}

export default Search;
