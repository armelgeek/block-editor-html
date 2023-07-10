import React,{useReducer,useEffect,useState} from 'react';
import axios from 'axios';
import { Action, ActionType as LrcActionType, IState } from "../SongForm";

function searchReducer(state:any, action:any) {
  switch (action.type) {
    case "loading":
      return { loading: true, data: null, error: null };
    case "success":
      return { loading: false, data: action.payload, error: null };
    case "reset":
      return { loading: false, data: null, error: null };
    case "error":
      return { loading: false, data: null, error: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function selectReducer(state:any, action:any) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "reset":
      return [];
    case "remove":
      return state.filter((_:any, index:number) => index !== action.payload);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
function getArtists(artists:any) {
  if (artists.length > 0) {
    artists[0].role = "main"; // set the role of first artist to main
    artists[0].found = true; // set the role of first artist to main
    for (let i = 1; i < artists.length; i++) {
      artists[i].role = "featuring"; // set the role of all other artists to featuring
      artists[i].found = true; // set the role of first artist to main
    }
  }
  return artists;
}
function ArtistsStep({ state, dispatch, onNextStep, onPrevStep, isComplete }:any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, dispatchSearchResults] = useReducer(searchReducer, {
    loading: false,
    data: null,
    error: null,
  });
  const [selectedArtists, dispatchSelectedArtists] = useReducer(selectReducer,getArtists(state.selectedArtists));

  function handleRemoveArtist(index:number) {
    if (index === 0) {
      dispatchSelectedArtists({ type: "reset" });
    } else {
      dispatchSelectedArtists({ type: "remove", payload: index });
    }
  }
  
 function handleReset() {
    dispatchSearchResults({ type: "reset" });
  }
  async function handleSearchSubmit(event:any) {
    event.preventDefault();
    if (searchTerm.trim()) {
      handleReset();
      dispatchSearchResults({ type: "loading" });
      await axios
        .get(`http://localhost:8100/artists?q=${searchTerm.trim()}`)
        .then((response) => {
          const otherFoundArtists = response.data.data;
          const foundArtists = response.data.data.filter((artist:any) => artist.name.toLowerCase() === searchTerm.trim().toLowerCase());
          const notFoundArtists = searchTerm.trim() && foundArtists.length === 0 ? [{ name: searchTerm.trim(), found: false }] : [];
          dispatchSearchResults({ type: "success", payload: { found: otherFoundArtists, notFound: notFoundArtists } });
        })
        .catch((error) => {
          dispatchSearchResults({ type: "error", payload: error });
        });
    }
  }

 function handleAddArtist(artistName:any, found:any) {
  const role = selectedArtists.length === 0 ? 'main' : 'featuring'; // determine the role of the artist
  const isArtistSelected = selectedArtists.find((artist:any) => artist.name === artistName);
  if (!isArtistSelected) {
    dispatchSelectedArtists({ type: "add", payload: { name: artistName, found, role } });
  }
}
  useEffect(() => {
      dispatch({ type: "update", payload: {
        artist_names: selectedArtists.length == 0 ? []: selectedArtists.map(
          (rs:any) => rs.name
        )} 
      });
      dispatch({ type: "update", payload: {
        selectedArtists: selectedArtists.length == 0 ? []: selectedArtists
      } });
      /**dispatch({
        type: LrcActionType.info,
        payload: { name: 'ar', value: selectedArtists.length == 0 ? "": selectedArtists.map(
          (rs:any) => rs.name
        ).join(',')}
    });**/
     
  }, [selectedArtists])
  return (
    <div>
      <h2>Step 3: Artists</h2>
      <form onSubmit={handleSearchSubmit}>
        <label>
          Search Artists:
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </label>
        <button type="submit">Search</button>
      </form>
      {searchResults.loading && <p>Loading...</p>}
      {searchResults.error && <p>{searchResults.error.message}</p>}
      {searchResults.data && searchResults.data.notFound.length > 0 && (
        <ul>
          {searchResults.data.notFound.map((artist:any) => (
            <li key={artist.name}>
              {artist.name} <span style={{ color: "red" }}>(not found)</span>{" "}
              <button onClick={() => handleAddArtist(artist.name, false)}>Select</button>
            </li>
          ))}
        </ul>
      )}
      {searchResults.data && searchResults.data.found.length > 0 && (
        <ul>
          {searchResults.data.found.map((artist:any) => (
            <li key={artist.id}>
              {artist.name} <button onClick={() => handleAddArtist(artist.name, true)}>Select</button>
            </li>
          ))}
        </ul>
      )}
      {selectedArtists.length > 0 && (
          <ul>
            <li>
              <ul>
                {selectedArtists.map((artist:any, index:number) => (
                  <li key={index}>
                    {artist.name} {!artist.found && <span style={{ color: "red" }}>(not found)</span>}
                    ({artist.role})
                    <button onClick={() => handleRemoveArtist(index)}>Remove</button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        )}

      <button onClick={onPrevStep}>Back</button>
      <button disabled={selectedArtists.length === 0}
      onClick={() => {
      onNextStep();
    }}
  >
    Next
  </button>
</div>
);
}
export default ArtistsStep;