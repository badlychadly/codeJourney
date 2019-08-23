import React, {Component} from 'react'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import {logoutUser} from './actions/session'


class Navbar extends Component {

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
            <div className="navbar">
                <div className="navbrand">
                    <a href="#" className="">CodeJourney</a>

                </div>
                <ul className="navlist">
                    <li className="nav-item">
                        <NavLink to="/" activeClassName="nav-link" >Home</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                        <span style={{cursor: 'pointer'}} onClick={this.toggle} className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</span>
                        <div style={{display: this.state.show ? 'block' : 'none'}} onClick={this.toggle} className="dropdown-menu">
                            <Link className="dropdown-item" to="/posts/drafts">drafts</Link>
                            <Link to="/posts/new" className="dropdown-item" >New Post</Link>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                            <div className="dropdown-divider"></div>
                            <div onClick={() => this.props.logoutUser()} className="dropdown-item" href="#">Logout</div>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Disabled</a>
                    </li>
                </ul>




            </div>
        )
    }
}

// const mapStateToProps = state => {
//     return {loggedIn: state.loggedIn}
// }

export default connect(null, {logoutUser})(Navbar)