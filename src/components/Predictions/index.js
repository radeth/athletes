/**
 * Component displaying and managing list of disciplines with calculated athlete score.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { disciplineScore } from '../../libs/calculate'
import './index.css'

export default class Predictions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 'all',
            sort: 'alphabetical',
            array: []
        }
        this.array = this.array.bind(this)
        this.array()
    }
    v(nextProps, nextState) {
        console.log("Should Component update", nextProps, nextState);
        return true;
    }
    componentWillUpdate(nextProps, nextState) {
        console.log("Component will update", nextProps, nextState);
    }
    componentDidUpdate(prevProps,prevState){
        console.log("component did update",prevProps,prevState)
    }

    render() {
        return (
            <section className="l-section c-predictions" >
                <h2 className="header">Predictions</h2>
                <label>filter</label>
                <select value={this.state.value} onChange={this.filter.bind(this)}>
                    <option>all</option>
                    <option>team</option>
                    <option>individual</option>
                </select>
                <label>sort</label>
                <select value={this.state.value} onChange={this.sort.bind(this)}>
                    <option>alphabetical</option>
                    <option>score</option>
                </select>
                <div className="content">
                    {this.state.array.map((discipline) => {
                        switch (this.state.type) {
                            case 'all':
                                return (
                                    <div key={discipline.name} className="c-discipline">
                                        <span className="name">{discipline.name}</span> - <span className="score">{disciplineScore(this.props.athlete.skillset, discipline.requirements)}</span>
                                    </div>
                                )
                                break;
                            case 'team':
                                if (discipline.isIndividual === false) {
                                    return (
                                        <div key={discipline.name} className="c-discipline">
                                            <span className="name">{discipline.name}</span> - <span className="score">{disciplineScore(this.props.athlete.skillset, discipline.requirements)}</span>
                                        </div>
                                    )
                                }
                                break;
                            case 'individual':
                                if (discipline.isIndividual === true) {
                                    return (
                                        <div key={discipline.name} className="c-discipline">
                                            <span className="name">{discipline.name}</span> - <span className="score">{disciplineScore(this.props.athlete.skillset, discipline.requirements)}</span>
                                        </div>
                                    )
                                }

                                break;

                            default:
                                break;
                        }
                        
                    })}
                </div>
            </section>
        )
    }

    sort(e) {
        let sortType = e.target.value
        this.setState({
            sort: sortType
        })
    }
    filter(e) {
        let type = e.target.value
        this.setState({
            type: type
        })
    }
    array(){
        var disciplinesArray = []
        let counter = 0
        this.props.disciplines.map((discipline) =>{
            disciplinesArray[counter] = {
                ...discipline,
                score: disciplineScore(this.props.athlete.skillset, discipline.requirements)
            }
            counter++
        })
        console.log(disciplinesArray)
        this.setState({
            array: [...disciplinesArray]
        })
        this.setState({
            array: [...disciplinesArray]
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