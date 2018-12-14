/**
 * Component displaying and managing list of disciplines with calculated athlete score.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { disciplineScore } from '../../libs/calculate'
import './index.css'

export default class Predictions extends React.Component {
    constructor(props){
        super(props)
        this.state={
            typeTeam: "all"
        }

        this.allDisciplines = this.allDisciplines.bind(this)
        this.allIndividual = this.allIndividual.bind(this)
        this.allTeam = this.allTeam.bind(this)
    }
    allDisciplines(){
        this.setState({
            typeTeam:"all"
        })
        console.log(this.state)

    }
    allIndividual(){
        this.setState({
            typeTeam:"individual"
        })
        console.log(this.state)
    }
    allTeam(){
        this.setState({
            typeTeam:"team"
        })
        console.log(this.state)
    }
    render() {
        return (
            <section className="l-section c-predictions" >
                <h2 className="header" >Predictions</h2>
                <button className="btn" onClick={this.discipline.bind(this)}>all</button>
                <button className="btn" onClick={this.allIndividual.bind(this)}>individual</button>
                <button className="btn" onClick={this.allTeam.bind(this)}>team</button> 
                <div className="content">
                    {this.props.disciplines.map((discipline) => {
                        
                        return (
                            <div key={discipline.name} className="c-discipline">
                                <span className="name">{discipline.name}</span> - <span className="score">{disciplineScore(this.props.athlete.skillset, discipline.requirements)}</span>
                            </div>
                        )
                    })}
                </div>
            </section>
        )
    }
}

Predictions.propTypes = {
    athlete: PropTypes.shape({
        name: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        skillset: PropTypes.objectOf(PropTypes.number).isRequired,
        nativeDisciplines: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    disciplines: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        isIndividual: PropTypes.bool.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        requirements: PropTypes.objectOf(PropTypes.number).isRequired,
    })).isRequired
}