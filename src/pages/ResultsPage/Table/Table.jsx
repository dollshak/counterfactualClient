import React from "react";

const ResultsTable = ({ tableHeaders, tableRows }) => {
  const headers = tableHeaders.map((columnHeader, index) => (
    <th>{columnHeader}</th>
  ));

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
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};
export default ResultsTable;
