import Table from "./Table/Table";
import "./ResultsPage.css";
import { useLocation, useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // const state = {
  //   input: { size: 4, color: 2 },
  //   input: {
  //      values: [4, 2]
  //      names: [size, color]
  //}
  //   output: {
  //     alibi: [
  //       [5, 8],
  //       [2, 4],
  //     ],
  //     dummy: [
  //       [12, 4],
  //       [5, 5],
  //       [7, 8],
  //     ],
  //     dice: [[6, 7]],
  //   },
  // };

  // const inputList = Object.entries(state.output).map(([key, value]) => [
  //   key,
  //   value,
  // ]);

  // const body = [["input", [Object.values(state.input)]]];

  const inputList = Object.entries(state.output).flatMap(([key, values]) => {
    return values.results.map((innerArray) => {
      return [key, ...innerArray];
    });
  });

  console.log(inputList);

  const body = [Object.values(state.input)];

  const onBackClick = () => {
    navigate("/");
  };

  return (
    <div className="resultsPage-container">
      <button className="back_button" onClick={onBackClick}>
        back
      </button>
      <h1>Results</h1>
      <h2 className="input-output-title">input</h2>
      <Table
        tableHeaders={state.input.names}
        rows={[state.input.values]}
        isInput={true}
      ></Table>
      <h2 className="input-output-title">output</h2>
      <Table
        tableHeaders={["algorithm", ...state.input.names]}
        rows={inputList}
        isInput={false}
      ></Table>
    </div>
  );
};

export default ResultsPage;
