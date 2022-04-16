import React, { useState } from "react";

const LargeSelection = ({ title, id, manualCode, eventHandler }) => {
  // Handle form submission
  // Create submit button
  return (
    <div className="col-lg-4 col-md-6 col-sm-6 col-12">
      <div className="col-lg-4 col-md-6 col-sm-6 col-12">
        <div className="features-small-item">
          <div className="icon">
            <i>
              <img
                src={require("../images/" + id + ".png")}
                height="100%"
                width="100%"
                alt=""
              />
            </i>
          </div>
          <h4 className="features-title">{title}</h4>
          <div className="col-12">
            <form id={id} action="">
              <input
                style={{ visibility: !manualCode && "hidden" }}
                name="code"
                type="text"
                placeholder="Code"
                required
              />
              <button
                type="submit"
                id={id}
                className="main-button"
                onClick={eventHandler}
              >
                {title + " Room"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LargeSelection;
