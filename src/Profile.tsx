import React, { useReducer,useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './context/AuthContext';
import ProfilePicture from './components/ProfilePicture';
import AccountSettings from './components/AccountSettings';
const initialState = {
  isLoading: false,
  user: null,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, user: action.payload, error: null };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, user: null, error: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
const tokenExpired=(token)=> {
    if (token !== '') {
      console.log(JSON.parse(atob(token.split('.')[1])));
      const expiry = JSON.parse(atob(token.split('.')[1])).exp;
      return Math.floor(new Date().getTime() / 1000) >= expiry;
    } else {
      return false;
    }
  }
const Profile = () => {
  const [stateEvt, dispatchEvt] = useReducer(reducer, initialState);
 const { state,dispatch } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      dispatchEvt({ type: 'FETCH_START' });

      try {
        const token = localStorage.getItem('token');
        if (token && tokenExpired(token)) {
          // Récupérer un nouveau token avec le refresh token
          const refreshToken = localStorage.getItem('refreshToken');
          const response = await axios.post('http://localhost:8100/refreshToken', { refreshToken });
          localStorage.setItem('token', response.data.accessToken);
        }
        const response = await axios.get('http://localhost:8100/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        dispatchEvt({ type: 'FETCH_SUCCESS', payload: response.data });
      } catch (error) {
        console.log(error);
        dispatchEvt({ type: 'FETCH_FAILURE', payload: error.response.data.error });
      }
    };

    fetchData();
  }, [state]);

  return (
    <div>

      <h2>Modifier les informations du compte</h2>
      
      {stateEvt.isLoading && <p>Chargement en cours...</p>}
      {stateEvt.user && (

        <div>
         <p>Photo de profil:</p>
      <ProfilePicture user={stateEvt.user} dispatch={dispatch}/>
        <AccountSettings name={stateEvt.user.name} email={stateEvt.user.email}/>
         
         </div>
      )}
      {stateEvt.error && <p>Erreur: {stateEvt.error}</p>}
    </div>
  );
};

export default Profile;

