import React, { Component } from "react";
import * as messagesService from "../../services/Message";
import Input from "../Shared/Input";
import Button from "../Shared/Button";
import socketIo from "socket.io-client";

export default class SendMessage extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      telephone: "",
      errors: {},
      status: false,
      sended: false,
    };
  }
  componentDidMount() {
    const socket = socketIo("http://localhost:8000/");
    socket.on("new-message", function (message) {
      console.log("Se envio un mensaje desde un cliente::", message);
    });
  }
  validateForm = (fields) => {
    const errors = {};
    if (!fields.message) {
      errors.message = "Message required";
    }
    if (!fields.telephone) {
      errors.telephone = "Telephone required";
    }
    return errors;
  };
  submit = (e) => {
    e.preventDefault();
    const { message, telephone } = this.state;
    const { errors, ...sinErrors } = this.state;
    const result = this.validateForm(sinErrors);
    this.setState({ errors: result });
    if (!Object.keys(result).length) {
      const messageForm = {
        message: message,
        telephone: telephone,
      };
      messagesService
        .sendMessage(messageForm)
        .then((response) => this.setState({ sended: true }))
        .catch((error) => this.setState({ status: true }));
    }
  };

  render() {
    return (
      <div className="mt-5">
        {this.state.sended && (
          <div className="alert alert-info">Message sended to friend</div>
        )}
        {this.state.status && (
          <div className="alert alert-danger">Error al enviar mensaje</div>
        )}
        <div className="card">
          <div className="card-header">Send a message text to a friend</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <Input
                  onChange={(e) => this.setState({ message: e.target.value })}
                  value={this.state.message}
                  placeholder="Write a message"
                />
                {this.state.errors.message && (
                  <div className="alert alert-danger">
                    {this.state.errors.message}
                  </div>
                )}
              </div>
              <div className="form-group">
                <Input
                  onChange={(e) => this.setState({ telephone: e.target.value })}
                  value={this.state.telephone}
                  placeholder="Cell phone +0969164843"
                />
                {this.state.errors.telephone && (
                  <div className="alert alert-danger">
                    {this.state.errors.telephone}
                  </div>
                )}
              </div>
              <div className="form-group">
                <Button onClick={this.submit}>{"Send message"}</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
