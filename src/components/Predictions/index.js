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
            filterType: 'all',
            sortType: 'alphabetical',
            arrayOfDisciplines: []
        }
        
    }
    componentDidUpdate() {
     
   
    }
    render() {
        this.array()
        return (
            <section className="l-section c-predictions" >
                <h2 className="header">Predictions</h2>
                <label>filter</label>
                <select value={this.state.value} onChange={this.setFilterType.bind(this)}>
                    <option>all</option>
                    <option>team</option>
                    <option>individual</option>
                </select>
                <label>sort</label>
                <select value={this.state.value} onChange={this.setSortType.bind(this)}>
                    <option>alphabetical</option>
                    <option>score</option>
                </select>
                <div className="content">
                {this.state.arrayOfDisciplines.map((discipline)=>{
                    return(
                        <div key={discipline.name} className="c-discipline">
                        <span className="name">{discipline.name}</span> - <span className="score">{disciplineScore(this.props.athlete.skillset, discipline.requirements)}</span>
                    </div>
                    )
                })}

                </div>
            </section>
        )
    }
    //returning sort and filter array of disciplines
    array(e) {
        let disciplinesArray = this.props.disciplines
        disciplinesArray = this.props.disciplines.map((discipline) => {
            return discipline = {
                ...discipline,
                score: disciplineScore(this.props.athlete.skillset, discipline.requirements)
            }
           
        })
        switch (this.state.sortType) {
            case 'alphabetical':
                disciplinesArray = disciplinesArray.sort((a, b) => {
                    return a.name.localeCompare(b.name)
                })
                break
            case 'score':
                disciplinesArray = disciplinesArray.sort((a, b) => {
                    return a.score - b.score
                })
                break
            default:


        }
        switch (this.state.filterType) {
            case 'team':
                disciplinesArray = disciplinesArray.filter((discipline) => {
                    return discipline.isIndividual === false
                })
                break
            case 'individual':
                disciplinesArray = disciplinesArray.filter((discipline) => {
                    return discipline.isIndividual === true
                })
                break
            default:
        }
       this.setState({
           arrayOfDisciplines: disciplinesArray
       })
    }

    //setting sort type
    setSortType(e) {
        this.setState({
            sortType: e.target.value
        })
    }
    //setting filter type
    setFilterType(e) {
       this.setState({
           filterType: e.target.value
       })
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