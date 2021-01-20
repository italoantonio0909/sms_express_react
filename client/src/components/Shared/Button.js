import { Component } from "react";
import "./index.css";

export default class Button extends Component {
  render() {
    return (
      <button
        type="submit"
        className="btn btn-success button-1 form-control"
        {...this.props}
      ></button>
    );
  }
}
