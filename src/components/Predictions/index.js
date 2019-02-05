/**
 * Component displaying and managing list of disciplines with calculated athlete score.
 */

import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import { disciplineScore } from '../../libs/calculate'

export default class Predictions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           
        }

    }
    render() {
        return (
            <section className="l-section c-predictions" >
                <h2 className="header">Predictions</h2>
                <label>filter</label>
                <select>
                    <option>all</option>
                    <option>team</option>
                    <option>individual</option>
                </select>
                <label>sort</label>
                <select>
                    <option>alphabetical</option>
                    <option>score</option>
                </select>
                <div className="content">
                {this.arrayOfDisciplines().map((discipline) => {
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
    arrayOfDisciplines(){
        return this.props.disciplines
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