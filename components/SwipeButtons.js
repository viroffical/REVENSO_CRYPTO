"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";

const SwipeButtons = ({ onSwipeLeft, onSwipeRight }) => {
  return (
    <div className="flex justify-center items-center gap-8 py-2">
      {/* Dislike Button */}
      <button
        className="w-14 h-14 bg-white rounded-full border border-gray-300 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
        onClick={onSwipeLeft}
        aria-label="Dislike profile"
      >
        <FontAwesomeIcon
          icon={faXmark}
          className="text-red-500 text-2xl"
        />
      </button>

      {/* Like Button */}
      <button
        className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg flex items-center justify-center hover:from-yellow-500 hover:to-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
        onClick={onSwipeRight}
        aria-label="Like profile"
      >
        <FontAwesomeIcon
          icon={faHeart}
          className="text-white text-2xl"
        />
      </button>
    </div>
  );
};

export default SwipeButtons;