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
            arrayOfDisciplines: this.setInitialArray()
        }

    }

    componentDidUpdate(prevState) {
        console.log(this.state)
        if (prevState===this.state) {
            this.setState({
                disciplinesArray: this.setArray()
           
            })
        }
    }
    render() {
        this.setArray()
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
                    {this.state.arrayOfDisciplines.map((discipline) => {
                        return (
                            <div onClick={() => this.setToggle(discipline.name)} key={discipline.name} className="c-discipline">
                                <span className="name">{discipline.name}</span> - <span className="score">{disciplineScore(this.props.athlete.skillset, discipline.requirements)}</span>
                                {discipline.isHidden && <div>some tek</div>}

                            </div>
                        )
                    })}

                </div>
            </section>
        )
    }
    //return initial array
    setInitialArray() {
        let disciplinesArray = this.props.disciplines
        disciplinesArray = disciplinesArray.map((discipline) => {
            return discipline = {
                ...discipline,
                score: disciplineScore(this.props.athlete.skillset, discipline.requirements),
                isHidden: false
            }
        })

        return disciplinesArray
    }
    //returning sort and filter array of disciplines
    setArray() {
        let disciplinesArray = this.state.arrayOfDisciplines
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
                console.log('team')
                disciplinesArray = disciplinesArray.filter((discipline) => {
                    return discipline.isIndividual === false
                })
                break
            case 'individual':
                console.log('team')
                disciplinesArray = disciplinesArray.filter((discipline) => {
                    return discipline.isIndividual === true
                })
                break
            default:
        }
        return disciplinesArray
    }
    setToggle(disciplineName, props) {
        let disciplinesArray = this.state.arrayOfDisciplines

        disciplinesArray.find((discipline) => {
            return discipline.name === disciplineName
        }).isHidden = !disciplinesArray.find((discipline) => {
            return discipline.name === disciplineName
        }).isHidden

        return disciplinesArray

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