import React, { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import { IoMdCloudUpload } from "react-icons/io";
import axios from "axios";

import Tag from "../../../../components/tag";
import { Container, Dataset, File, NotFound } from "./styles";

function Options({ open, data, onSelect }) {
  const fileRef = useRef();
  const [uploading, setUploading] = useState(false);

  const upload = useCallback(() => {
    if (fileRef?.current?.files[0]) {
      const [file] = fileRef?.current?.files;
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target.result.search(/^name\r\n/i) === -1) {
          alert('The first line must be the header "name"');
        }

        const rows = event.target.result
          .replace(/^name\r\n/gi, "")
          .split("\r\n");

        if (rows.length > 22) {
          const formData = new FormData();

          formData.append("file", fileRef.current.files[0]);
          return axios
            .post(`${process.env.REACT_APP_API_BASE_URL}/upload`, formData)
            .then((response) => {
              onSelect(
                {
                  id: response.data.id,
                  category: "Custom",
                  color:
                    "#" +
                    ((Math.random() * 0xffffff) << 0)
                      .toString(16)
                      .padStart(6, "0"),
                  title: file.name,
                  tmp: 1,
                },
                true
              );
              setUploading(false);
            });
        }
        alert("The CSV file must have at least 23 names");
      };
      reader.readAsText(fileRef.current.files[0]);
    }
  }, [onSelect]);

  return (
    <Container open={uploading || open} data-testid="options">
      <File>
        <input
          type="file"
          ref={fileRef}
          onChange={upload}
          onClick={() => setUploading(true)}
          onFocus={() => setUploading(false)}
        />
        <div>
          <div>
            <IoMdCloudUpload size={24} />
            <span>Upload a custom dataset</span>
          </div>
          <a href="/example.csv" target="_blank">
            example.csv
          </a>
        </div>
      </File>

      {data.map((option) => {
        return (
          <React.Fragment key={option.id}>
            <Dataset
              onClick={() => {
                onSelect(option);
              }}
              data-testid={`option-${option.id}`}
            >
              {option.category && (
                <Tag color={option.color}>{option.category}</Tag>
              )}
              {option.title}
            </Dataset>
          </React.Fragment>
        );
      })}
      {data.length === 0 && <NotFound>No datasets found</NotFound>}
    </Container>
  );
}

Options.propTypes = {
  open: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ),
};

export default Options;
