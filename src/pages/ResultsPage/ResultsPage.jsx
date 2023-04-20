import Table from "./Table/Table";
import "./ResultsPage.css";
import { useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const navigate = useNavigate();

  const reqbody = {
    input: { size: 4, color: 2 },
    output: {
      alibi: [
        [5, 8],
        [2, 4],
      ],
      dummy: [
        [12, 4],
        [5, 5],
        [7, 8],
      ],
      dice: [[6, 7]],
    },
  };

  const inputList = Object.entries(reqbody.output).map(([key, value]) => [
    key,
    value,
  ]);

  const body = [["input", [Object.values(reqbody.input)]]];

  const onBackClick = () => {
    navigate("/");
  };

  console.log("page input list " + inputList);
  console.log(Object.values(reqbody.input));

  return (
    <div className="resultsPage-container">
      <button className="back_button" onClick={onBackClick}>
        back
      </button>
      <h1>Results</h1>
      <h2>input</h2>
      <Table
        tableHeaders={Object.keys(reqbody.input)}
        tableRows={body}
        isInput={true}
      ></Table>
      <h2>output</h2>
      <Table
        tableHeaders={["algorithm", ...Object.keys(reqbody.input)]}
        tableRows={inputList}
        isInput={false}
      ></Table>
    </div>
  );
};

export default ResultsPage;
