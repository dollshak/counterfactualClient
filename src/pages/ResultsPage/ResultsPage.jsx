import Table from "./Table/Table";
import "./ResultsPage.css";

const ResultsPage = () => {
  const reqbody = {
    input: { size: 4, color: 2 },
    output: {
      alibi: [5, 8],
      dummy: [12, 4],
      dice: [6, 7],
    },
  };

  return (
    <div className="resultsPage-container">
      <p>Results</p>
      <Table
        tableHeaders={Object.keys(reqbody.input)}
        tableRows={[Object.values(reqbody.input)]}
      ></Table>
      <Table
        tableHeaders={Object.keys(reqbody.input)}
        tableRows={Object.values(reqbody.output)}
      ></Table>
      {/* <ResultsTable></ResultsTable> */}
    </div>
  );
};

export default ResultsPage;
