import { Component } from "react";

export default class Input extends Component {
  render() {
    return <input type="text" className="form-control" {...this.props} />;
  }
}
