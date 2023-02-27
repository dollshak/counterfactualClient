import React from "react";

const AddAlgorithmPage = () => {
  return (
    <div className="AddAlgorithmPage">
      <h1>add new algorithm</h1>
      <div className="addFile">
        <form>
          <label>
            add file
            <input type="text" />
          </label>
        </form>
      </div>
      <div className="add description">
        <form>
          <label>
            add description
            <input type="text" />
          </label>
        </form>

        <div className="add arguments">
          <form>
            <label>
              add arguments
              <input type="text" />
            </label>
          </form>
        </div>

        <div className="add additional info">
          <form>
            <label>
              add additional info
              <input type="text" />
            </label>
          </form>
        </div>

        <div className="add output example">
          <form>
            <label>
              add output example
              <input type="text" />
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAlgorithmPage;
