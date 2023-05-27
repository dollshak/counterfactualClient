import Table from "./Table/Table";
import "./ResultsPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResultsPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [filterValue, setFilterValue] = useState("");
  const [showedMessage, setShowedMessage] = useState(false);

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
  const [filteredRows, setFilteredRows] = useState(inputList);

  console.log(state);
  console.log(Object.values(state.output));

  const times = Object.values(state.output).map((entry) => entry.time + "s");
  console.log(times);

  const onBackClick = () => {
    navigate("/");
  };

  useEffect(() => {
    console.log(showedMessage);
    Object.keys(state.output).forEach((algo) => {
      const { errorMessage } = state.output[algo];
      if (errorMessage && !showedMessage) {
        setShowedMessage(true);
        toast.error(
          <div>
            There was an error in the <strong>{algo}</strong> algorithm:{" "}
            {errorMessage}
          </div>
        );
      }
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    const filterValue = event.target.value.toLowerCase();
    const filteredRows = inputList.filter((row) =>
      row[0].toLowerCase().includes(filterValue)
    );
    setFilteredRows(filteredRows);
  };

  return (
    <div className="resultsPage-container">
      <button className="back_button" onClick={onBackClick}>
        back
      </button>
      <ToastContainer hideProgressBar={true} />
      <h1 className="white-font mainTitle">Results</h1>
      <h2 className="white-font">input:</h2>
      <Table
        tableHeaders={state.input.names}
        rows={[state.input.values]}
        isInput={true}
      ></Table>
      <div>
        <h2 className="output-title white-font">output:</h2>

        <div className="additional-options">
          <Popup
            trigger={
              <button className="back_button times_button"> Run-times</button>
            }
            position="right center"
            contentStyle={{
              width: "auto",
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            <Table
              tableHeaders={Object.keys(state.output)}
              rows={[times]}
              isInput={false}
            ></Table>
          </Popup>

          <input
            type="text"
            value={filterValue}
            onChange={handleFilterChange}
            placeholder="Enter algorithm name"
            className="filterInput"
          />
        </div>
        <Table
          tableHeaders={["algorithm", ...state.input.names]}
          rows={filteredRows}
          isInput={false}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
        ></Table>
      </div>
    </div>
  );
};

export default ResultsPage;
