import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import Popup from "reactjs-popup";

const HomePage = () => {
  const navigate = useNavigate();
  const api = Axios.create({
    baseURL: "http://127.0.0.1:5000",
  });
  const [algorithms, setAlgorithms] = useState([]);

  useEffect(() => {
    api
      .get("/getAllAlgorithms")
      .then((res) => {
        console.log(res?.data);
        setAlgorithms(res?.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
  }, []);

  const onClickAddAlgorithm = () => {
    navigate("/addAlgorithm");
  };

  const onClickRunAlgorithms = () => {
    navigate("/runAlgorithms");
  };

  const editAlgorithm = (algo) => {
    navigate("/addAlgorithm", { state: algo });
  };

  return (
    <div className="backgroundComp">
      <ToastContainer hideProgressBar={true} />
      <p className="mainTitle">Welcome!</p>
      <p className="subTitle">please choose your action</p>
      <div>
        <button className="button" onClick={onClickAddAlgorithm}>
          Add New Algorithm
        </button>
      </div>
      <div>
        <button className="button" onClick={onClickRunAlgorithms}>
          Run algorithms
        </button>
      </div>
      <div>
        <Popup
          trigger={
            <button className="button" onClick={onClickRunAlgorithms}>
              Edit algorithm
            </button>
          }
          position="right center"
          contentStyle={{
            width: "auto",
            maxHeight: "80vh",
            overflow: "auto",
            borderRadius: "10px",
          }}
        >
          <div className="popupAlgoList">
            {algorithms.map((algo) => (
              <button
                className="button popupButton"
                onClick={() => editAlgorithm(algo)}
              >
                {algo.name}
              </button>
            ))}
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default HomePage;
