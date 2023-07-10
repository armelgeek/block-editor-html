import React, { useReducer } from 'react';
import axios from 'axios';
function userReducer(state, action) {
  switch (action.type) {
    case 'FETCH_USER':
      return { ...state, loading: true };
    case 'FETCH_USER_SUCCESS':
      return { ...state, loading: false, user: action.payload };
    case 'FETCH_USER_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SUSPEND_USER':
      return { ...state, loading: true };
    case 'SUSPEND_USER_SUCCESS':
      return { ...state, loading: false, user: action.payload };
    case 'SUSPEND_USER_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'BLOCK_USER':
      return { ...state, is_blocked: true };
    case 'UNBLOCK_USER':
      return { ...state, is_blocked: false };
    default:
      return state;
  }
}
async function suspendUser(userId, suspendedUntil) {
  try {
    const response = await fetch(`http://localhost:8100/user/${userId}/suspend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ suspendedUntil })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const userData = await response.json();
    return userData.user;
  } catch (error) {
    throw error;
  }
}


function UserItem({user}) {
  console.log('user',user);
  const [state, dispatch] = useReducer(userReducer, {
    user: user,
    loading: false,
    error: null,
    is_blocked: false
  });

  async function handleSuspendUser() {
    dispatch({ type: 'SUSPEND_USER' });

    try {
      const suspendedUntil = new Date();
      suspendedUntil.setHours(suspendedUntil.getHours() + 24); // suspendu pour 24 heures
      const user = await suspendUser(state.user.id, suspendedUntil);
      dispatch({ type: 'SUSPEND_USER_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'SUSPEND_USER_ERROR', payload: error.message });
    }
  }
  const handleBlockUser = async () => {
    await axios.post(`http://localhost:8100/user/${state.user.id}/block`)
      .then(() => {
        dispatch({ type: 'BLOCK_USER' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUnblockUser = async () => {
    await axios.post(`http://localhost:8100/user/${state.user.id}/unblock`)
      .then(() => {
        dispatch({ type: 'UNBLOCK_USER' });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center' 
    }}>
      {/* Bouton pour suspendre l'utilisateur */}
      <div>
        <p>{state.user.name}</p>
      </div>
      <div>
        <button onClick={handleSuspendUser}>Suspendre utilisateur</button>
         {state.user.is_blocked
          ? <button onClick={handleUnblockUser}>Débloquer</button>
          : <button onClick={handleBlockUser}>Bloquer</button>
        }
      </div>
    </div>
  );
}
export default UserItem;