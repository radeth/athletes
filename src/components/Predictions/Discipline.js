import React from 'react'
import './index.scss'

class Discipline extends React.Component {
    render() {
        return (
            <div key={this.props.discipline.name} className="c-discipline">
            <span className="name">{this.props.discipline.name}</span> - <span className="score">{this.props.discipline.score}</span>
        </div>
        )
    }
}
export default Discipline
