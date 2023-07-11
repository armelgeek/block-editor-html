import React, { useReducer } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const initialState = {
  isLoading: false,
  error: null,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_START':
      return { ...state, isLoading: true, error: null, user: null };
    case 'REGISTER_SUCCESS':
      return { ...state, isLoading: false, error: null, user: action.payload };
    case 'REGISTER_FAILURE':
      return { ...state, isLoading: false, error: action.payload, user: null };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const handleRegister = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    dispatch({ type: 'REGISTER_START' });

    try {
      const response = await axios.post('http://localhost:8100/register', { username, email, password,confirmPassword });
      dispatch({ type: 'REGISTER_SUCCESS', payload: response.data.user });
      history.push('/login');
    } catch (error) {
      console.log(error);
      dispatch({ type: 'REGISTER_FAILURE', payload: error.response.data.error });
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input type="text" name="username" placeholder="Username" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
        <button type="submit">Register</button>
      </form>
      {state.isLoading && <p>Registration in progress...</p>}
      {state.user && <p>User created with id {state.user.id} and username {state.user.username}</p>}
      {state.error && <p>Error: {state.error}</p>}
    </div>
  );
};

export default Register;
