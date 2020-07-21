import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from "react-router-dom";
import {auth} from '../firebase'

const Navbar = (props) => {
    
    const {session} = props

    const logout = () => {
        auth.signOut()
            .then( () => {
                props.history.push('/login')
            })
    }
    
    return (
        <div className='navbar navbar-dark bg-dark' >
            <Link className='navbar-brand' to='/'>Scrum Tools</Link>
                { !session ?
                    <div className="d-flex">
                        <NavLink className='btn btn-dark' to='/login' >Login</NavLink>
                        <NavLink className='btn btn-dark' to='/register' >Register</NavLink>
                    </div>
                    :
                    <div className="d-flex">
                        <NavLink className='btn btn-dark' to='/tasks' >Tasks</NavLink>
                        <button className='btn btn-dark' onClick={logout} >Logout</button>
                    </div>
                }
        </div>
    )
}

export default withRouter(Navbar)
