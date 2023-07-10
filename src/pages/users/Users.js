import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import UserItem from './UserItem';
const initialState = {
  loading: true,
  error: '',
  users: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
      return {
        ...state,
        loading: true,
        error: ''
      };
    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: ''
      };
    case 'FETCH_USERS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

const Users = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'FETCH_USERS_REQUEST' });
    axios
      .get('http://localhost:8100/users')
      .then(response => {
        dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_USERS_FAILURE', payload: error.message });
      });
  }, []);

  return (
    <div>
      {state.loading ? (
        <p>Chargement...</p>
      ) : state.error ? (
        <p>Erreur : {state.error}</p>
      ) : (
        <ul>
          {state.users.map(user => (
            <li key={user.id}>
            <UserItem user={user}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
