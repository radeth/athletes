import React from "react";
import "./index.scss";
import Flip from "react-reveal";
class Discipline extends React.Component {
  constructor() {
    super();
    this.state = {
      isHidden: false
    };
  }
  render() {
    return (
      <div
        key={this.props.discipline.name}
        onClick={this.handleChange.bind(this)}
        className="c-discipline"
      >
        <span className="name">{this.props.discipline.name}</span> -{" "}
        <span className="score">{this.props.discipline.score}</span>
        {this.props.discipline.isIndividual ? (
          <div className="flag">Individual</div>
        ) : (
          <div className="flag">Team</div>
        )}
        {this.state.isHidden && (
          <Flip bottom className="toggleContent">
            <div>
              <img
                alt={`discipline-${this.props.discipline.name}`}
                className="discipline-photo"
                src={this.props.discipline.photo}
              />
              <div className="tags">
                <span>Tags:</span>
                {this.props.discipline.tags.map(tag => {
                  return <p key={tag}>{tag}</p>;
                })}
              </div>
            </div>
          </Flip>
        )}
      </div>
    );
  }
  handleChange() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }
}
export default Discipline;
