import React from "react";
import Search from "./components/search";

function App() {
  const [dataset, setDataset] = useState(null);

  return (
    <div>
      <Search onSelect={setDataset} />
    </div>
  );
}

export default App;
