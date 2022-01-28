import React from "react";
import Search from "./components/search";

function App() {
  const [dataset, setDataset] = useState(null);

  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const reList = useCallback(() => {
    setLoading("list");

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

  return (
    <div>
      <Search onSelect={setDataset} />

      <Container>
        <p>
          Click on the generated names to give feedback, bad feedbacks makes
          names to not be listed again!
        </p>

        <List data={names} onFeedback={(data) => setNames(data)} />
      </Container>
    </div>
  );
}

export default App;
