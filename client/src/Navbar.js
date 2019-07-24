import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'


export default class Navbar extends Component {

    state = {
        show: false
    }

    toggle = () => {
        this.setState((prevState, props) => {
            return {show: !this.state.show}
        })
    }


    render() {
        return (

            <ul className="navbar">
                <li className="nav-item">
                    <NavLink to="/" activeClassName="nav-link" >Home</NavLink>
                </li>
                <li className="nav-item dropdown">
                    <span style={{cursor: 'pointer'}} onClick={this.toggle} className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</span>
                    <div style={{display: this.state.show ? 'block' : 'none'}} className="dropdown-menu">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Separated link</a>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Disabled</a>
                </li>
            </ul>
        )
    }
}