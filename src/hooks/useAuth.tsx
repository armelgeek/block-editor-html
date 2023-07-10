import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  const { state } = useContext(AuthContext);
  console.log(state.user);
  return {currentUser:state.user};
};

export default useAuth;
