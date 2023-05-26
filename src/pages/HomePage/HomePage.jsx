import React from "react";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();

  const onClickAddAlgorithm = () => {
    navigate("/addAlgorithm");
  };

  const onClickRunAlgorithms = () => {
    navigate("/runAlgorithms");
  };
  return (
    <div className="backgroundComp">
      <p className="mainTitle">Welcome!</p>
      <p className="subTitle">please choose your action</p>
      <div>
        <button className="button" onClick={onClickAddAlgorithm}>
          Add New Algorithm
        </button>
      </div>
      <div>
        <button className="button" onClick={onClickRunAlgorithms}>
          run algorithms
        </button>
      </div>
    </div>
  );
};

export default HomePage;
