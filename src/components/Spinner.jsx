import React from "react";

const Spinner = ({ size = 40, darkColor = "#4F46E5", brightColor = "#A855F7" }) => {
  return (
    <div className="flex items-center justify-center">
      <svg
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 50 50"
      >        
        <circle
          className="opacity-20"
          cx="25"
          cy="25"
          r="20"
          stroke={darkColor}
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke={brightColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="31.4 125.6"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default Spinner;
