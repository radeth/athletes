/**
 * Component displaying and managing list of disciplines with calculated athlete score.
 */

import React from "react";
import PropTypes from "prop-types";
import "./index.scss";
import Discipline from "./Discipline";
import { disciplineScore } from "../../libs/calculate";

export default class Predictions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterType: "all",
      sortType: "alphabetical",
      arrayOfDiciplines: this.setArray("all", "alphabetical")
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.athlete !== this.props.athlete) {
      this.setState({
        arrayOfDiciplines: this.setArray()
      });
    }
  }
  render() {
    return (
      <section className="l-section c-predictions">
        <h2 className="header">Predictions</h2>
        <div className="content">
          <form onSubmit={e => this.action(e)}>
            <label>filter</label>
            <select onChange={this.setFilterType.bind(this)}>
              <option>all</option>
              <option>team</option>
              <option>individual</option>
            </select>
            <label>sort</label>
            <select onChange={this.setSortType.bind(this)}>
              <option>alphabetical</option>
              <option>score</option>
            </select>
          </form>
          {this.state.arrayOfDiciplines.map(discipline => {
            return <Discipline discipline={discipline} />;
          })}
        </div>
      </section>
    );
  }
  setSortType(e) {
    console.log(e.target.value);
    this.setState({
      arrayOfDiciplines: this.setArray(this.state.filterType, e.target.value),
      sortType: e.target.value
    });
  }
  setFilterType(e) {
    console.log(e.target.value);
    this.setState({
      arrayOfDiciplines: this.setArray(e.target.value, this.state.sortType),
      filterType: e.target.value
    });
  }
  //returning sort and filter array of disciplines
  setArray(filterType, sortType) {
    let disciplinesArray = this.props.disciplines;
    disciplinesArray = disciplinesArray.map(discipline => {
      return (discipline = {
        ...discipline,
        score: disciplineScore(
          this.props.athlete.skillset,
          discipline.requirements
        )
      });
    });
    switch (filterType) {
      case "team":
        disciplinesArray = disciplinesArray.filter(discipline => {
          return discipline.isIndividual === false;
        });
        break;
      case "individual":
        disciplinesArray = disciplinesArray.filter(discipline => {
          return discipline.isIndividual === true;
        });
        break;
      default:
    }
    switch (sortType) {
      case "alphabetical":
        disciplinesArray = disciplinesArray.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        break;
      case "score":
        disciplinesArray = disciplinesArray.slice().sort((a, b) => {
          return a.score - b.score;
        });
        break;
      default:
    }
    return disciplinesArray;
  }
}

Predictions.propTypes = {
  athlete: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    skillset: PropTypes.objectOf(PropTypes.number).isRequired,
    nativeDisciplines: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  disciplines: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      isIndividual: PropTypes.bool.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      requirements: PropTypes.objectOf(PropTypes.number).isRequired
    })
  ).isRequired
};
