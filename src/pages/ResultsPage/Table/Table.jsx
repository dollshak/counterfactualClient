import React, { useState } from "react";
import "./Table.css";

const ResultsTable = ({ tableHeaders, rows, isInput }) => {
  // const inputList = [
  //   [
  //     "alibi",
  //     [
  //       [5, 8],
  //       [2, 4],
  //     ],
  //   ],
  //   [
  //     "dummy",
  //     [
  //       [12, 4],
  //       [5, 5],
  //       [7, 8],
  //     ],
  //   ],
  //   ["dice", [[6, 7]]],
  // ];

  const [rowsVals, setRowsVals] = useState(rows);

  const [newRows, setNewRows] = useState(
    rowsVals.map((row) => (
      <tr>
        {row.map((value) => (
          <td>{value}</td>
        ))}
      </tr>
    ))
  );

  const toTableRows = (res) => {
    return res.map((row) => (
      <tr>
        {row.map((value) => (
          <td>{value}</td>
        ))}
      </tr>
    ));
  };

  const [sortColumn, setSortColumn] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");

  const headers = tableHeaders.map((columnHeader, index) => (
    <th key={index} className="clickable" onClick={() => handleSort(index)}>
      {columnHeader}
    </th>
  ));

  const sort = (rowsToSort) => {
    if (sortColumn !== null) {
      rowsToSort.sort((row1, row2) => {
        const value1 = row1[sortColumn];
        const value2 = row2[sortColumn];
        return value1 - value2;
      });
    }
    return rowsToSort;
  };

  const handleSort = (index) => {
    console.log("index " + index);
    console.log("sort column " + sortColumn);
    if (index === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(index);
      console.log(sortOrder);
      setSortOrder("asc");
    }
    const sortRes = sort(rowsVals);
    console.log("sortRes ");
    console.log(sortRes);
    setRowsVals(sortRes);
    const trows = toTableRows(sortRes);
    setNewRows(trows);
  };

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
