import React from "react";
import "./Table.css";

const ResultsTable = ({ tableHeaders, tableRows, isInput }) => {
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

  const inputList = [
    [
      "alibi",
      [
        [5, 8],
        [2, 4],
      ],
    ],
    [
      "dummy",
      [
        [12, 4],
        [5, 5],
        [7, 8],
      ],
    ],
    ["dice", [[6, 7]]],
  ];

  console.log("inputlist " + inputList);

  const headers = tableHeaders.map((columnHeader, index) => (
    <th key={index}>{columnHeader}</th>
  ));

  const newRows = tableRows.map((algorithmRowsAndName) =>
    algorithmRowsAndName[1].map((rowValues, index) => (
      <tr key={index}>
        {!isInput && <td>{algorithmRowsAndName[0]}</td>}
        {rowValues.map((cellValue, index) => (
          <td key={index}>{cellValue}</td>
        ))}
      </tr>
    ))
  );

  const rows = tableRows.map((rowValues, index) => (
    <tr key={index}>
      {rowValues.map((cellValue, index) => (
        <td key={index}>{cellValue}</td>
      ))}
    </tr>
  ));

  return (
    <div className="resultsTable-container">
      <table>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{newRows}</tbody>
      </table>
    </div>
  );
};
export default ResultsTable;
