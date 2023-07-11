import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext.js';
import jwt from 'jsonwebtoken';
//import './LoginForm.css';
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {state, dispatch} = useContext(AuthContext);
    const history = useHistory();
    if (state.isAuthenticated) {
        history.push('/');
    }
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8100/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            });

            if (!response.ok) {
                const {message} = await response.json();
                throw new Error(message);
            }

            const {accessToken, refreshToken, isAccountLocked} = await response.json();
            const decodedToken = jwt.decode(accessToken);
            const user = {
                id: decodedToken.id,
                email: decodedToken.email,
                username: decodedToken.name,
                photo: decodedToken.photo
            };
            if (isAccountLocked) {
                dispatch({type: 'LOCK_ACCOUNT'});
            } else {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: {accessToken, refreshToken, user}
                });
                dispatch({
                    type: "REFESH_TOKEN"
                });
                history.replace('/');
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'LOGIN_FAIL',
                payload: error.message
            });
        }
    };
    console.log(state);
    return (
        <div className="login-form-container">
            <div>
                {state.isAccountLocked && <p>Votre compte est bloqué.</p>}
                {state.error && <p>Error: {state.error}</p>}
            </div>
            <form className="login-form" onSubmit={handleLogin}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
