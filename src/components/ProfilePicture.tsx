import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  isLoading: false,
  error: null,
  message: null,
};

const reducer = (state:any, action:any) => {
  switch (action.type) {
    case 'UPLOAD_START':
      return { ...state, isLoading: true, error: null, message: null };
    case 'UPLOAD_SUCCESS':
      return { ...state, isLoading: false, error: null, message: action.payload };
    case 'UPLOAD_FAILURE':
      return { ...state, isLoading: false, error: action.payload, message: null };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
const tokenExpired=(token:any)=> {
    if (token !== '') {
      console.log(JSON.parse(atob(token.split('.')[1])));
      const expiry = JSON.parse(atob(token.split('.')[1])).exp;
      return Math.floor(new Date().getTime() / 1000) >= expiry;
    } else {
      return false;
    }
  }
const ProfilePicture = ({user,dispatch,refreshAccessToken}:any) => {
  const [state, dispatchEvent] = useReducer(reducer, initialState);

  const handleFileChange = async (event:any) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    dispatchEvent({ type: 'UPLOAD_START' });

    const formData = new FormData();
    formData.append('photo', file);

    try {
      // Vérifier si le token est expiré
      const token = localStorage.getItem('token');
      if (token && tokenExpired(token)) {
        // Récupérer un nouveau token avec le refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('http://localhost:8100/refreshToken', { refreshToken });
        localStorage.setItem('token', response.data.accessToken);
      }
      const response = await axios.put('http://localhost:8100/profilePicture', formData, {
        headers: { 'Content-Type': 'multipart/form-data','Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      dispatchEvent({ type: 'UPLOAD_SUCCESS', payload: response.data.message });
       dispatch({
          type: 'SET_USER',
          payload: { ...user,photo: response.data.photoUrl}
        });
     
    } catch (error:any) {
      console.log(error);
      dispatchEvent({ type: 'UPLOAD_FAILURE', payload: error.response.data.message });
    }
  };

  return (
    <div>
    <img src={user.photo} width={70} height={70}/>
      <input type="file" onChange={handleFileChange} />
      {state.isLoading && <p>Envoi en cours...</p>}
      {state.message && <p>{state.message}</p>}
      {state.error && <p>Erreur: {state.error}</p>}
    </div>
  );
};

export default ProfilePicture;