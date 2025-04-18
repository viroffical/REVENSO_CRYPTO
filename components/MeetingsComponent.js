import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faClock,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import meetings from "../data/meetings";

const MeetingsComponent = ({ meeting }) => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="center-align">
          <button
            className="waves-effect waves-light btn-large"
            style={{ backgroundColor: "#ee6e73", cursor:"pointer" }}
          >
            Log in with Calendly
          </button>
        </div>
      </div>
    </div>
  );
};



export default MeetingsComponent;
