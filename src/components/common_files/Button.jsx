import React from 'react'


const Button = ({
  text,
  onClick,
  htmlType = "button",
  style = {}
}) => {
  

  return (
    <button
      type={htmlType}
      onClick={onClick}
      style={{
        background: "linear-gradient(135deg,#3b82f6,#9333ea)",
        color: "#fff",
        border: "none",
        
        padding: "10px 18px",
        borderRadius: "30px",
        cursor: "pointer",
        fontWeight: "bold",
        ...style,
      }}
    >
      {text}
    </button>
  );
};

export default Button;