/**
 * Component displaying and managing list of disciplines with calculated athlete score.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { disciplineScore } from '../../libs/calculate'
import './index.scss'

export default class Predictions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 'all',
            sort: 'alphabetical',
            array: this.array().sort((a, b) => {
                return a.name.localeCompare(b.name)})
        }
        this.array = this.array.bind(this)
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
                   {this.renderContent(this.state.type,this.state.sort)}
                </div>
            </section>
        )
    }
    renderContent(){
       
    }
    sort(e) {
        this.setState({
            sort: e.target.value
        })
        if(e.target.value==='alphabetical'){
            this.setState({
                array: this.state.array.sort((a, b) => {
                    return a.name.localeCompare(b.name)})
            })
        }
        if(e.target.value==='score'){
            this.setState({
                array: this.state.array.sort((a, b) => {
                    return a.score-b.score})
            })
        }
        

       
    }
    filter(e) {
        this.setState({
            type:  e.target.value
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
        return disciplinesArray
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