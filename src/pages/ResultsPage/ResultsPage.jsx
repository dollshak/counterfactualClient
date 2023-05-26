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
  const [rerender, setRerender] = useState(0);

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

  console.log(state);
  console.log(Object.values(state.output));

  const times = Object.values(state.output).map((entry) => entry.time + "s");
  console.log(times);

  const onBackClick = () => {
    navigate("/");
  };

  useEffect(() => {
    Object.keys(state.output).forEach((algo) => {
      const { errorMessage } = state.output[algo];
      if (errorMessage) {
        toast.error(
          <div>
            There was an error in the <strong>{algo}</strong> algorithm:{" "}
            {errorMessage}
          </div>
        );
      }
    });
  }, []);

  const handleClick = () => {
    setRerender((prevClicks) => prevClicks + 1);
  };

  return (
    <div className="resultsPage-container">
      <button className="back_button" onClick={onBackClick}>
        back
      </button>
      <ToastContainer hideProgressBar={true} />
      <h1 className="white-font mainTitle">Results</h1>
      <h2 className="input-output-title white-font">input:</h2>
      <Table
        tableHeaders={state.input.names}
        rows={[state.input.values]}
        isInput={true}
      ></Table>
      <h2 className="input-output-title white-font">output:</h2>
      {/* <button onClick={handleClick}>Original order</button> */}

      <Popup
        trigger={
          <button className="back_button times_button"> Run-times</button>
        }
        position="right center"
        contentStyle={{ width: "auto", maxHeight: "80vh", overflow: "auto" }}
      >
        <Table
          tableHeaders={Object.keys(state.output)}
          rows={[times]}
          isInput={false}
        ></Table>
      </Popup>
      <Table
        tableHeaders={["algorithm", ...state.input.names]}
        rows={inputList}
        isInput={false}
      ></Table>
    </div>
  );
};

export default ResultsPage;
