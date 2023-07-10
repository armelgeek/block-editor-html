import React, { useReducer, useState } from 'react';
import axios from 'axios';

const initialState = {
  isLoading: false,
  error: null,
  message: null,
};

const reducer = (state:any, action:any) => {
  switch (action.type) {
    case 'UPDATE_START':
      return { ...state, isLoading: true, error: null, message: null };
    case 'UPDATE_SUCCESS':
      return { ...state, isLoading: false, error: null, message: action.payload };
    case 'UPDATE_FAILURE':
      return { ...state, isLoading: false, error: action.payload, message: null };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const AccountSettings = ({name,email}:any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formData, setFormData] = useState({
    name: name || '',
    email: email || ''
  });

  const handleChange = (event:any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    dispatch({ type: 'UPDATE_START' });
    try {
      const response = await axios.put(
        'http://localhost:8100/me',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch({ type: 'UPDATE_SUCCESS', payload: response.data.message });
    } catch (error:any) {
      console.log(error);
      dispatch({
        type: 'UPDATE_FAILURE',
        payload: error.response.data.message,
      });
    }
  };

  return (
    <div>
      {state.isLoading && <p>Enregistrement en cours...</p>}
      {state.message && <p>{state.message}</p>}
      {state.error && <p>Erreur: {state.error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom complet :</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Adresse email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  );
};

export default AccountSettings;
