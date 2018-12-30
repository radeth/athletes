/**
 * Component for aggregating user data. Displays disciplines with lowest & highest scores for the given athlete.
 */

import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import { Tabs, Tab } from '../../../node_modules/react-bootstrap'
import { disciplineScore } from '../../libs/calculate'


export default class Hints extends React.Component {
    constructor(props){
        super(props)
        this.state={
            arrayOfdisciplines: this.setInitialArray(),
            ShouldTryArray: []
    }
    
    }
    componentDidUpdate(){
        console.log(this.state)
     
    }
    render() {
        this.setShouldTryArray()
        return (
            <section className="l-section c-hints">
                <h2 className="header" >Hints</h2>
                <div className="content">
                <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="Should try">
                    
                    </Tab>
                    <Tab eventKey={2} title="Should avoid">
                        
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
    setShouldTryArray(){
        let disciplinesArray = this.state.arrayOfdisciplines
        disciplinesArray.sort((a, b) => {
            return b.score - a.score})
        console.log(disciplinesArray)
        let tryArray = []
        let valuesCounter = 3
        let i=0
        while(Object.keys(tryArray).length< valuesCounter){
            if(this.checkNative(disciplinesArray[i])){
                valuesCounter++
            }else{
                if(disciplinesArray[i].score===disciplinesArray[i+1].score){
                    tryArray.push(disciplinesArray[i])
                    valuesCounter++
                }
                tryArray.push(disciplinesArray[i])
            }
            
            i++
         }
        console.log(tryArray) 
        return tryArray
          
        }
    checkNative(discipline){
        //console.log(discipline.name,this.props.athlete.nativeDisciplines)
        this.props.athlete.nativeDisciplines.forEach((nativeDiscipline) => {
            if(nativeDiscipline===discipline.name){
                return true
            }
            return false
        })
           
        
     
       

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