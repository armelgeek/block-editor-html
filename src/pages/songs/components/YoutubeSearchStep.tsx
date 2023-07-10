import React,{useReducer,useState} from 'react';
import axios from 'axios';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_VIDEOS_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'FETCH_VIDEOS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        videos: action.payload,
      };
    case 'FETCH_VIDEOS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
function YoutubeSearchStep({ state, dispatch, onNextStep, onPrevStep, isComplete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [internaState, internalDispatch] = useReducer(reducer, {
    isLoading: false,
    videos: [],
    error: null,
  });

  const handleSearch = async () => {
    if(searchTerm == '') return;
    internalDispatch({ type: 'FETCH_VIDEOS_REQUEST' });
    try {
      const response = await axios.get('http://localhost:8100/youtube/search', {
        params: {
          q: searchTerm,
        },
      });
       const videos = response.data.videos.map(video => ({ ...video, isSelected: false }));
      internalDispatch({ type: 'FETCH_VIDEOS_SUCCESS', payload: videos });
    } catch (error) {
      internalDispatch({ type: 'FETCH_VIDEOS_FAILURE', payload: error.message });
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  return (
    <div>
     <form onSubmit={(event) => event.preventDefault()}>
      <input type="text" placeholder="Search" onChange={handleChange} />
      <button onClick={handleSearch}>Rechercher</button>
      {internaState.isLoading && <p>Loading...</p>}
      {internaState.error && <p>{internaState.error}</p>}
      <ul>
      <li>Choisis: </li>
      {state.youtube.id && (
        <li
              onClick={() => dispatch({ type: "update", payload: { songmid:"",img: "",duration: "",youtube: {} } }) }
            >
              <img src={state.youtube.img} width={120} alt={state.youtube.original_title} />
              <h3>{state.youtube.original_title}</h3>
              <p>{state.youtube.duration}</p>
            </li>
        )}
      <li>Resultat de recherche: </li>
          {internaState.videos.map((video) => (
            <li
              key={video.id}
              onClick={() => dispatch({ type: "update", payload: { songmid: video.id,img: video.img,duration: video.duration,youtube: video } }) }
            >
              <img src={video.img} width={120} alt={video.original_title} />
              <h3>{video.original_title}</h3>
              <p>{video.duration}</p>
            </li>
          ))}
        </ul>
        <div>
          <button type="button" onClick={onPrevStep}>
            Previous
          </button>
          <button type="button" onClick={onNextStep} disabled={!isComplete}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default YoutubeSearchStep;
