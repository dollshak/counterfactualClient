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
    <div className="HomePage">
      <div className="homepage_container">
        <h1 className="homePageTitle">Welcome! what would you like to do?</h1>
        <button className="add_alg_button" onClick={onClickAddAlgorithm}>
          add new algorithm
        </button>
        <button className="run_alg_button" onClick={onClickRunAlgorithms}>
          run algorithms
        </button>
      </div>
    </div>
  );
};

export default HomePage;
