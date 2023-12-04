import { React } from "react";

export default function AlertDis(props) {
  return (
    <>
      <div className={"alert alert-" + props.alertType + " alert-dismissible"}>
        {props.children}
        <button
          type="button"
          className="btn-close"
          onClick={props.onClose}
          data-dismiss="alert"
        ></button>
      </div>
    </>
  );
}
