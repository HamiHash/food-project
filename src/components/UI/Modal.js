import { Fragment } from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

function Backdrop(props) {
  return <div className={classes.backdrop} />;
}
function ModalOverlay(props) {
  return (
    <div className={classes.modal}>
      <div classname={classes.content}>{props.children}</div>
    </div>
  );
}

const portalPlace = document.getElementById("overlays");

function Modal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalPlace)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalPlace
      )}
    </Fragment>
  );
}

export default Modal;
