import React from 'react'
import {db, auth} from '../firebase'
import { withRouter } from "react-router-dom"

const RegisterPage = (props) => {
    
    const [email,setEmail] = React.useState('')
    const [emailError, setEmailError] = React.useState('')
    const [password,setPassword] = React.useState('')
    const [passwordError, setPasswordError] = React.useState('')
    
    const registerHandler = (e) => {
        e.preventDefault()

        !email.trim() ? setEmailError('Email not valid') : setEmailError('')
        !password.trim() || password.length <= 6 ? setPasswordError('Password not valid') : setPasswordError('')
        
        if( emailError || passwordError ) return

        register()        

    }

    const register = React.useCallback( async() => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, password)
            
            await db.collection('users').doc(res.user.uid).set({
                fechaCreacion: Date.now(),
                displayName: res.user.displayName,
                photoURL: res.user.photoURL,
                email: res.user.email,
                uid: res.user.uid
            })
            setEmail('')
            setPassword('')
            props.history.push('/tasks')
        } catch (error) {
            setEmailError(error.message)
        }
    }, [email, password, props.history])

    return (
        <div className='mt-5'>
            <h3>Register</h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={registerHandler} >
                        { emailError ? <div className="alert alert-danger">{emailError}</div> : '' }
                        <input type="email" className="form-control mb-2" onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
                        { passwordError ? <div className="alert alert-danger">{passwordError}</div> : '' }
                        <input type="password" className="form-control mb-2" onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
                        <button className="btn btn-dark btn-block">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(RegisterPage)
