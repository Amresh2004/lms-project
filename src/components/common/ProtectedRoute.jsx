import React from "react";

const CommonButton = ({ text, ...props }) => {
  return (
    <button className="btn btn-custom w-100" {...props}>
      {text}
    </button>
  );
};

export default CommonButton;