import React from "react";
import "./index.scss";
import Flip from "react-reveal/Flip";
class Discipline extends React.Component {
  constructor() {
    super();
    this.state = {
      isHidden: false
    };
  }
  render() {
    return (
      <div key={this.props.discipline.name} className="c-discipline">
        <span className="name">{this.props.discipline.name}</span> -{" "}
        <span className="score">{this.props.discipline.score}</span>
        {this.props.discipline.isIndividual ? (
          <div className="flag">Individual</div>
        ) : (
          <div className="flag">Team</div>
        )}
      </div>
    );
  }
}
export default Discipline;
