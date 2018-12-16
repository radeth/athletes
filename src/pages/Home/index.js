/**
 * Component responsible for Home page layout.
 */
import PropTypes from 'prop-types';
import React from 'react';
import Hints from '../../components/Hints';
import Overview from '../../components/Overview';
import Predictions from '../../components/Predictions';
import Profile from '../../components/Profile';
import './index.scss';
import {Tabs, Tab} from '../../../node_modules/react-bootstrap' 

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            counter:0
        };
        // console.log(this.props.athlete)
      }
    
    render() {
        const athlete = this.props.athletes ? this.props.athletes[this.state.counter] : null
        const disciplines = this.props.disciplines ? this.props.disciplines : []
        if (athlete)
            return (
                <div className="p-home">
                 <button className="btn" onClick={this.decrement.bind(this)}>prev</button>
                 <button className="btn" onClick={this.increment.bind(this)}>next</button>
                    <Profile {...athlete} />
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab">
                    <Tab eventKey={1} title="Overview">
                        <Overview {...athlete} />
                    </Tab>
                    <Tab eventKey={2} title="Predictions">
                        <Predictions athlete={athlete} disciplines={disciplines} />
                    </Tab>
                    <Tab eventKey={3} title="Hints">
                        <Hints athlete={athlete} disciplines={disciplines} />
                    </Tab>
                    </Tabs>
                </div>

            )
        else 
            return <div>
                 <span>No athlete data</span>
                </div>
            
    } 
      decrement() {
        let counterTemp
        if(this.state.counter===0){
            counterTemp = 0
        }
        else{
            counterTemp = this.state.counter - 1 
        }
       
        this.setState({
            counter: counterTemp
        })
        

      }
      increment() {
      
        let counterTemp
        if(this.state.counter===Object.keys(this.props.athletes).length-1){
            counterTemp = Object.keys(this.props.athletes).length-1
        }
        else{
            counterTemp = this.state.counter + 1 
        }
        this.setState({
            counter: counterTemp
        })
    }
      
    }







Home.propTypes = {
    athletes: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        skillset: PropTypes.objectOf(PropTypes.number).isRequired,
        nativeDisciplines: PropTypes.arrayOf(PropTypes.string).isRequired,
    })).isRequired,
    disciplines: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        isIndividual: PropTypes.bool.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        requirements: PropTypes.objectOf(PropTypes.number).isRequired,
    })).isRequired
}



                    // <Overview {...athlete} />
                    // <Predictions athlete={athlete} disciplines={disciplines} />
                    // <Hints athlete={athlete} disciplines={disciplines} />