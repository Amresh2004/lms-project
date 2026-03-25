import React from "react";


const Modal = ({ isOpen, onClose,title, children }) => {
    if (!isOpen) return null;

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                {/* Header */}
                <div style={headerStyle}>
                    <h3 style={{ margin: 0 }}>{title}</h3>

                    <button onClick={onClose} style={closeBtn}>
                        ✖
                    </button>
                </div>
                {/* Body */}
                <div style={{ marginTop: "15px" }}>{children}</div>
            </div>
        </div>
    );
};



// Styles
const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};

const modalStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    position: "relative",
     transform: "scale(0.8)",
  animation: "zoomIn 0.3s ease forwards",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
    marginBottom: "10px",
};


const closeBtn = {
    position: "absolute",
    top: "10px",
    right: "10px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "16px",
};

export default Modal;