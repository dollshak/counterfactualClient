import React, { useState } from "react";

const RunAlgorithmsPage = () => {
  // const [algorithmsList, setAlgorithmsList] = useState([]);
  const algorithmsList = [
    {
      _id: "1",
      name: "Dummy_CF",
      file_content: "from server.businessLayer...",
      description: "dummy",
      argument_lst: [
        { param_name: "x", description: "param desc", accepted_types: "int" },
      ],
      additional_info: "some info",
      output_example: ["6000 -> 1200", "4 -> 40"],
    },
    {
      _id: "2",
      name: "Alibi",
      file_content: "from server.businessLayer...",
      description: "albidesc",
      argument_lst: [
        { param_name: "x", description: "param desc", accepted_types: "int" },
      ],
      additional_info: "some info",
      output_example: ["6000 -> 1200", "4 -> 40"],
    },
  ];
  return (
    <div className="RunAlgorithmsPage">
      <h1>run algorithms</h1>
      <div className="algorithms_list">
        {algorithmsList.map((algorithm) => (
          <div className="algorithm">
            <input
              type="checkbox"
              id={algorithm._id}
              name={algorithm.name}
              value={algorithm.name}
            />
            <label for={algorithm._id}>{algorithm.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RunAlgorithmsPage;
