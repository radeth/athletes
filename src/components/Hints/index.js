/**
 * Component for aggregating user data. Displays disciplines with lowest & highest scores for the given athlete.
 */

import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import { Tabs, Tab } from '../../../node_modules/react-bootstrap'
import { disciplineScore } from '../../libs/calculate'


export default class Hints extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arrayOfdisciplines: this.setInitialArray(),
            shouldTryArray: [],
            shouldAvoidArray: []

        }

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState({
                arrayOfdisciplines: this.setInitialArray()
            })
        }
        if (prevState === this.state) {
            this.setState({
                shouldTryArray: this.setShouldTryArray(),
                shouldAvoidArray: this.setShouldAvoidArray()
            })

        }
    }

    render() {
        this.setShouldTryArray()
        this.setShouldAvoidArray()
        return (
            <section className="l-section c-hints">
                <h2 className="header" >Hints</h2>
                <div className="content">
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="Should try">
                            <div className="content">
                                {this.state.shouldTryArray.map((discipline) => {
                                    return (
                                        <div className="c-discipline" key={discipline.name}>
                                            <span className="name">{discipline.name}</span> -
                                        <span className="score">{discipline.score}</span>
                                        </div>)
                                })}

                            </div>

                        </Tab>
                        <Tab eventKey={2} title="Should avoid">
                            <div className="content">
                                {this.state.shouldAvoidArray.map((discipline) => {
                                    return (
                                        <div className="c-discipline" key={discipline.name}>
                                            <span className="name">{discipline.name}</span> -
                                        <span className="score">{disciplineScore(this.props.athlete.skillset, discipline.requirements)}</span>
                                        </div>)
                                })}

                            </div>

                        </Tab>
                    </Tabs>

                </div>
            </section>
        )
    }
    setInitialArray() {
        let disciplinesArray = this.props.disciplines
        disciplinesArray = disciplinesArray.map((discipline) => {
            return discipline = {
                ...discipline,
                score: disciplineScore(this.props.athlete.skillset, discipline.requirements)
            }
        })

        return disciplinesArray
    }
    setShouldTryArray() {
        let disciplinesArray = this.state.arrayOfdisciplines
        disciplinesArray.sort((a, b) => {
            return b.score - a.score
        })
        let bestValuesArray = []
        let lastValue = null
        let bestValueCounter = 0
        for (let i = 0; i < Object.keys(disciplinesArray).length && bestValueCounter < 3; i++) {
            if (this.checkNative(disciplinesArray[i].name) === false) {
                bestValuesArray[i] = disciplinesArray[i]
                if (bestValuesArray[i].score !== lastValue) {
                    lastValue = disciplinesArray[i].score
                    bestValueCounter++

                }
            }

        }
        return bestValuesArray

    }

    setShouldAvoidArray() {
        let disciplinesArray = this.state.arrayOfdisciplines
        disciplinesArray.sort((a, b) => {
            return a.score - b.score
        })
        let bestValuesArray = []
        let lastValue = null
        let bestValueCounter = 0
        for (let i = 0; i < Object.keys(disciplinesArray).length && bestValueCounter < 3; i++) {
            if (this.checkNative(disciplinesArray[i].name) === false) {
                bestValuesArray[i] = disciplinesArray[i]
                if (bestValuesArray[i].score !== lastValue) {
                    lastValue = disciplinesArray[i].score
                    bestValueCounter++

                }
            }

        }
        return bestValuesArray

    }
    checkNative(discipline) {
        //console.log(discipline.name,this.props.athlete.nativeDisciplines)
        let isNative = null
        this.props.athlete.nativeDisciplines.forEach((nativeDiscipline) => {
            // console.log(nativeDiscipline)
            // console.log(discipline)

            if (nativeDiscipline === discipline) {
                isNative = true // is navite
            } else {
                isNative = false
            }


            // native
        })
        return isNative
    }
}


Hints.propTypes = {
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