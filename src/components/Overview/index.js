/**
 * Component for displaying basic info about the provided athlete.
 */

import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import aesthetics from './../../public/images/aesthetics.png'
import agility from './../../public/images/agility.png'
import enduranceImage from './../../public/images/endurance.png'
import lowerBody from './../../public/images/lowerBody.png'
import upperBody from './../../public/images/upperBody.png'

const images = new Map([
    ['aesthetics', aesthetics],
    ['agility', agility],
    ['endurance', enduranceImage],
    ['lowerBody', lowerBody],
    ['upperBody', upperBody]
])

export default class Overview extends React.Component {
   
    render() {
        return (
            <section className="l-section c-overview" >
                <h2 className="header" >Overview</h2>
                <div className="content"> 
                    <span className="label">Bio</span>
                    <p className="bio">{this.props.bio}</p>
                    <span className="label">Skillset</span>
                    <div className="skillset">
                        {Object.keys(this.props.skillset).map((skill) => {
                            switch(this.props.skillset[skill]){
                                case Object.values(this.props.skillset).sort()[0]: //lowest value
                                return (
                                    <div className='skillsetValue lowest' key={skill}>
                                        
                                        <img className="skillsetImg" src={images.get(skill)} alt="Icon" />
    
                                        {this.props.skillset[skill]}
                                    </div>)
                                
                                case Object.values(this.props.skillset).sort()[Object.values(this.props.skillset).length-1]: // hihgest value
                                return (
                                    <div className='skillsetValue highest' key={skill}>
                                        
                                        <img className="skillsetImg" src={images.get(skill)} alt="Icon" />
    
                                        {this.props.skillset[skill]}
                                    </div>)
                               
                                default:
                                return (
                                    <div className='skillsetValue' key={skill}>
                                        
                                        <img className="skillsetImg" src={images.get(skill)} alt="Icon" />
    
                                        {this.props.skillset[skill]}
                                    </div>)
                            }
                        })}
                    </div>
                </div>
            </section>
        )
    }
    
    
}

Overview.propTypes = {
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    skillset: PropTypes.objectOf(PropTypes.number).isRequired,
    nativeDisciplines: PropTypes.arrayOf(PropTypes.string).isRequired,
}