import React, {Component} from "react";

export default class ApiStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pythonApiMsg: "",
      nodejsApiMsg: "",
    };
  }

  componentDidMount() {
    fetch("http://pythonapi:8080")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            pythonApiMsg: result.message,
          });
        },
        (error) => {
            console.log(error)
          this.setState({
            pythonApiMsg: "API Call failed",
          });
        }
      );

    fetch("http://nodejsapi:8080")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            nodejsApiMsg: result.message,
          });
        },
        (error) => {
          this.setState({
            nodejsApiMsg: "API Call failed",
          });
        }
      );
  }

  render() {
    return (
      <div>
        <div className="row">
          <h3>Python API : {this.state.pythonApiMsg}</h3>
          <br />
          <h3>NodeJS API : {this.state.nodejsApiMsg}</h3>
        </div>
      </div>
    );
  }
}
