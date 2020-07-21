import React from 'react'
import {auth} from '../firebase'
import { withRouter } from "react-router-dom";

const LoginPage = (props) => {
    
    const [email,setEmail] = React.useState('')
    const [emailError, setEmailError] = React.useState('')
    const [password,setPassword] = React.useState('')
    const [passwordError, setPasswordError] = React.useState('')
    
    const loginHandler = (e) => {
        e.preventDefault()

        !email.trim() ? setEmailError('Email not valid') : setEmailError('')
        !password.trim() || password.length <= 6 ? setPasswordError('Password not valid') : setPasswordError('')
        
        if(emailError || passwordError) return

        login()

    }

    const login = React.useCallback( async() => {
        try {
            await auth.signInWithEmailAndPassword(email, password)  
            setEmail('')
            setPassword('')
            props.history.push('/tasks')
        } catch (error) {
            setEmailError(error.message)
        }
    }, [email, password, props.history])

    const handleRecoverPassword = () => {
        !email.trim() ? setEmailError('Fill email to receive recover link') : setEmailError('')
        if(emailError) return
        recoverPassword()
    }

    const recoverPassword = React.useCallback(
        async () => {
            try {
                await auth.sendPasswordResetEmail(email)
                props.history.push('/login')
            } catch (error) {
                console.log(error)
                setEmailError(error.message)
            }
        },
    [email, props.history])

    const googleLogin = () => {
        
    }

    return (
        <div className='mt-5'>
            <h3>Login</h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={loginHandler} >
                        { emailError ? <div className="alert alert-danger">{emailError}</div> : '' }
                        <input type="email" className="form-control mb-2" onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
                        { passwordError ? <div className="alert alert-danger">{passwordError}</div> : '' }
                        <input type="password" className="form-control mb-2" onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
                        <button type='submit' className="btn btn-dark btn-block">Login</button>
                        <button type='button' onClick={googleLogin} className="btn btn-block"><img className='mr-2' src="%PUBLIC_URL%/google.png" />Login with Google</button>
                        <button type='button' onClick={handleRecoverPassword} className="btn btn-info btn-block">Recover password</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(LoginPage)
