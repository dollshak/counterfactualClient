import Table from "./Table/Table";
import "./ResultsPage.css";
import { useLocation, useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { reqbody } = state;
  console.log(state);
  console.log(reqbody);

  // const reqbody = {
  //   input: { size: 4, color: 2 },
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

  const inputList = Object.entries(state.output).map(([key, value]) => [
    key,
    value,
  ]);

  const body = [["input", [Object.values(state.input)]]];

  const onBackClick = () => {
    navigate("/");
  };

  return (
    <div className="resultsPage-container">
      <button className="back_button" onClick={onBackClick}>
        back
      </button>
      <h1>Results</h1>
      <h2>input</h2>
      <Table
        tableHeaders={Object.keys(state.input)}
        tableRows={body}
        isInput={true}
      ></Table>
      <h2>output</h2>
      <Table
        tableHeaders={["algorithm", ...Object.keys(state.input)]}
        tableRows={inputList}
        isInput={false}
      ></Table>
    </div>
  );
};

export default ResultsPage;
