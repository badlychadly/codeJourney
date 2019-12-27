import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/session'



class LoginForm extends Component {

    state = {
        credentials: {email: '', password: ''}
    }


    handleOnChange = event => {
        const field = event.target.name;
        const credentials = this.state.credentials;
        credentials[field] = event.target.value;
        this.setState({credentials: credentials});
    }

    login = () => {
        this.props.loginUser(this.state.credentials)
    }



    render() {
        return (
            <div className="modal fade" style={{display: 'flex', backgroundColor: 'rgba(0,0,0,0.4)'}}id="exampleModal" tabindex="-1" role="dialog">
                    <div className="modal-dialog" style={{width: '70%'}} role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 style={{margin: '.2rem', width: '100%', textAlign: 'center', padding: '.2rem'}} className="modal-title" id="exampleModalLabel">Login</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <i className="material-icons">clear</i>
                                </button>
                            </div>
                            <div className="">
                                <div className="">
                                    
                                    {/* <div className="form-row"> */}
                                        {/* <div className="col"> */}
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">@</span>
                                                </div>
                                                <input type="text" name="email" onChange={this.handleOnChange} class="form-control" placeholder="@email" value={this.state.email} aria-label="Username" aria-describedby="basic-addon1"/>
                                                </div>
                                            {/* </div> */}
                                        {/* <div className="col"> */}
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon1">@</span>
                                                    </div>
                                                    <input type="text" name="password" onChange={this.handleOnChange} value={this.state.password} class="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"/>
                                                </div>
                                        {/* </div> */}
                                    {/* </div>                                    */}


                                </div>

                            </div>
                            <div className="modal-footer">
                                <button onClick={this.login} style={{padding: '.3rem', backgroundColor: 'red', color: 'white', border: '1px solid transparent', borderRadius: '.25rem', margin: '.2rem', cursor: 'pointer'}} >Login</button>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default connect(null, {loginUser})(LoginForm)