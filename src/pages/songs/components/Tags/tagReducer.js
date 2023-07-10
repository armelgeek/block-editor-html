import { v4 as uuidv4 } from 'uuid';

const tagReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TAG':
      return [
        ...state,
        {
          id: uuidv4(),
          name: action.name
        }
      ];
    case 'REMOVE_TAG':
      return state.filter(tag => tag.id !== action.id);
    default:
      return state;
  }
};

export default tagReducer;
