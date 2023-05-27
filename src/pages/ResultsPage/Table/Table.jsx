import React, { useState, useEffect } from "react";
import "./Table.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
const ResultsTable = ({ tableHeaders, rows, isInput, filterValue }) => {
  const [filteredRows, setFilteredRows] = useState(rows);

  useEffect(() => {
    filterRows();
  }, [rows, filterValue]);

  const filterRows = () => {
    if (!filterValue) {
      setFilteredRows(rows);
      return;
    }

    const lowercasedFilter = filterValue.toLowerCase();
    const filtered = rows.filter((row) => {
      for (let i = 0; i < row.length; i++) {
        const cellValue = row[i].toString().toLowerCase();
        if (cellValue.includes(lowercasedFilter)) {
          return true;
        }
      }
      return false;
    });

    setFilteredRows(filtered);
  };

  const [sortColumn, setSortColumn] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");

  const headers = tableHeaders.map((columnHeader, index) => {
    if (isInput) {
      return <th key={index}>{columnHeader}</th>;
    } else {
      return (
        <th
          key={index}
          className="clickable"
          onClick={() => handleSort(index)}
          data-tooltip-content="Click to sort by this column"
          data-tooltip-id={`tooltip-${index}`}
        >
          {columnHeader}
          <Tooltip
            id={`tooltip-${index}`}
            place="top"
            effect="solid"
            style={{ backgroundColor: "white", color: "black" }}
          />
        </th>
      );
    }
  });

  const handleSort = (index) => {
    if (index === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(index);
      setSortOrder("asc");
    }

    const sortRes = [...filteredRows].sort((row1, row2) => {
      const value1 = row1[index];
      const value2 = row2[index];
      return sortOrder === "asc" ? value1 - value2 : value2 - value1;
    });

    setFilteredRows(sortRes);
  };

  // const toTableRows = (res) => {
  //   return res.map((row, index) => (
  //     <tr key={index}>
  //       {row.map((value) => (
  //         <td>{value}</td>
  //       ))}
  //     </tr>
  //   ));
  // };

  const toTableRows = (res) => {
    return res.map((row, index) => {
      const rowClass = index % 2 === 0 ? "row-even" : "row-odd";
      return (
        <tr key={index} className={rowClass}>
          {row.map((value, columnIndex) => (
            <td key={columnIndex}>{value}</td>
          ))}
        </tr>
      );
    });
  };
  const tableRows = toTableRows(filteredRows);

  return (
    <div className="resultsTable-container">
      <table>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
