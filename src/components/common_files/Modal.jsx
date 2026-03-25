import React from "react";
import colors from "../style/colors";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <div style={headerStyle}>
                    <h3 style={{ margin: 0 }}>{title}</h3>
                    <button onClick={onClose} style={closeBtn}>
                        ✖
                    </button>
                </div>
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
    background: colors.white,
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    position: "relative",
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