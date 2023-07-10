import React, { useEffect, useRef, useReducer, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import Title from "../../../../components/ui/Title";
const initialState = {
  songs: [],
  total: 0,
  page: 1,
  pageSize: 10,
  totalPages: 0,
  tags: [],
  selectedTags: [],
  isLoading: false,
  error: null,
  songToDelete: null, // nouvel état ajouté
  searchByLyrics: false,
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_SONGS_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "FETCH_SONGS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        songs: action.payload.songs,
        total: action.payload.total,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        totalPages: action.payload.totalPages,
      };
    case "FETCH_SONGS_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case "DELETE_SONG_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "DELETE_SONG_SUCCESS":
      return {
        ...state,
        isLoading: false,
        songs: state.songs.filter((song: any) => song.id !== action.payload.id),
        total: state.total - 1,
      };
    case "DELETE_SONG_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case "SET_SONG_TO_DELETE":
      return {
        ...state,
        songToDelete: action.payload.song,
      };
    case "FETCH_TAGS_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "FETCH_TAGS_SUCCESS":
      return {
        ...state,
        tags: action.payload,
        isLoading: false,
        error: null,
      };
    case "FETCH_TAGS_FAILURE":
      return {
        ...state,
        tags: [],
        isLoading: false,
        error: action.payload,
      };
    case "ADD_TAG":
      return {
        ...state,
        selectedTags: [...state.selectedTags, action.payload],
      };
    case "REMOVE_TAG":
      return {
        ...state,
        selectedTags: state.selectedTags.filter(
          (tag: any) => tag !== action.payload
        ),
      };
    case "RESET_TAGS":
      return {
        ...state,
        selectedTags: [],
      };
    case "ENABLE_LYRICS_SEARCH":
      return { ...state, searchByLyrics: true };
    case "DISABLE_LYRICS_SEARCH":
      return { ...state, searchByLyrics: false };
    default:
      return state;
  }
}

function SongList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchTerm, setSearchTerm] = useState("");
  const [artist, setArtist] = useState("");
  const [sort, setSort] = useState("created_at");
  const searchInputRef = useRef(null) as any;
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);
  useEffect(() => {
    dispatch({ type: "FETCH_TAGS_REQUEST" });
    axios
      .get("http://localhost:8100/tags")
      .then((response) => {
        dispatch({ type: "FETCH_TAGS_SUCCESS", payload: response.data.tags });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_TAGS_FAILURE", payload: error.message });
      });
  }, []);
  useEffect(() => {
    dispatch({ type: "FETCH_SONGS_REQUEST" });
    axios
      .get("http://localhost:8100/songs", {
        params: {
          page: state.page,
          pageSize: state.pageSize,
          search: searchTerm,
          sort,
          lyrics: state.searchByLyrics == true ? 1 : 0,
          tags: state.selectedTags ? state.selectedTags.join(",") : null,
        },
      })
      .then((response) => {
        dispatch({
          type: "FETCH_SONGS_SUCCESS",
          payload: {
            songs: response.data.songs,
            total: response.data.total,
            page: response.data.page,
            pageSize: response.data.pageSize,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_SONGS_FAILURE",
          payload: {
            error: error.message,
          },
        });
      });
  }, [
    state.page,
    state.pageSize,
    state.selectedTags,
    state.searchByLyrics,
    searchTerm,
    sort,
  ]);
  const handleLyricsSearch = () => {
    if (state.searchByLyrics) {
      dispatch({ type: "DISABLE_LYRICS_SEARCH" });
    } else {
      dispatch({ type: "ENABLE_LYRICS_SEARCH" });
    }
  };
  const handlePageChange = (newPage: any) => {
    dispatch({ type: "FETCH_SONGS_REQUEST" });
    dispatch({
      type: "FETCH_SONGS_SUCCESS",
      payload: {
        ...state,
        page: newPage,
      },
    });
  };
  const handleTagClick = (tag: any) => {
    if (state.selectedTags.includes(tag)) {
      dispatch({ type: "REMOVE_TAG", payload: tag });
    } else {
      dispatch({ type: "ADD_TAG", payload: tag });
    }
  };

  const handleResetClick = () => {
    dispatch({ type: "RESET_TAGS" });
  };
  const handleDeleteClick = (song: any) => {
    dispatch({
      type: "SET_SONG_TO_DELETE",
      payload: {
        song,
      },
    });
  };

  const handleDeleteSong = (id: any) => {
    dispatch({ type: "DELETE_SONG_REQUEST" });
    axios
      .delete(`http://localhost:8100/songs/${id}`)
      .then(() => {
        dispatch({
          type: "DELETE_SONG_SUCCESS",
          payload: {
            id,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_SONG_FAILURE",
          payload: {
            error: error.message,
          },
        });
      });
  };
  const handleSortChange = (event: any) => {
    const newSort = event.target.value;
    dispatch({ type: "FETCH_SONGS_REQUEST" });
    setSort(newSort);
  };

  const handleSearchChange = (event: any) => {
    const newSearchTerm = event.target.value;
    dispatch({ type: "FETCH_SONGS_REQUEST" });
    setSearchTerm(newSearchTerm);
  };
  const debouncedHandleSearchChange = debounce(handleSearchChange, 500);
  const handleCancelDelete = () => {
    dispatch({
      type: "SET_SONG_TO_DELETE",
      payload: {
        song: null,
      },
    });
  };

  const handleConfirmDelete = () => {
    const songId = state.songToDelete.id;
    console.log(songId);

    dispatch({ type: "DELETE_SONG_REQUEST" });

    axios
      .delete(`http://localhost:8100/songs/${songId}`)
      .then(() => {
        dispatch({
          type: "DELETE_SONG_SUCCESS",
          payload: {
            id: songId,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_SONG_FAILURE",
          payload: {
            error: error.message,
          },
        });
      });

    dispatch({
      type: "SET_SONG_TO_DELETE",
      payload: {
        song: null,
      },
    });
  };

  return (
    <div
      style={{
        marginLeft: "10ox",
        marginRight: "10px",
      }}
    >
      <Title text="Mes musiques" />
      <Link  to={`/songs/create`}>
        Create song
      </Link>
      <div className="ms_free_download">
        {/**<div className="search-sort-container">
          <div className="search-container">
            <label htmlFor="searchTerm" className="search-label">
              Search:
            </label>
            <input
              type="text"
              id="searchTerm"
              name="searchTerm"
              value={searchTerm}
              onChange={handleSearchChange}
              ref={searchInputRef}
              className="search-input"
            />
          </div>
          <div className="App">
            <label>
              <input
                type="checkbox"
                checked={state.searchByLyrics}
                onChange={handleLyricsSearch}
              />
              Rechercher par paroles (la recherche peut prendre du temps)
            </label>
            <h1>Sélection de tags</h1>
            <div className="tag-list">
              {state.tags.map((tag: any) => (
                <div
                  key={tag.id}
                  className={`tag ${
                    state.selectedTags.includes(tag.name) ? "selected" : ""
                  }`}
                  onClick={() => handleTagClick(tag.name)}
                >
                  {tag.name}
                </div>
              ))}
            </div>
          </div>
          <div className="sort-container">
            <label htmlFor="sort" className="sort-label">
              Sort by:
            </label>
            <select
              id="sort"
              name="sort"
              value={sort}
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="created_at">Date Added</option>
              <option value="artist">Artist name</option>
              <option value="title">Song title</option>
            </select>
          </div>
                </div>**/}
        <div className="album_inner_list">
          <div className="album_list_wrapper">
          <ul className="album_list_name">
              <li>#</li>
              <li>Image</li>
              <li>Titre</li>
              <li className="text-center">Durée</li>
              <li className="text-center">Artistes</li>
              <li className="text-center">More</li>
              <li className="text-center">Supprimer</li>
            </ul>
              {state.error && (
                <div className="error-message">Error: {state.error} </div>
              )}
              {state.songToDelete && (
                <div className="dialog">
                  <p>
                    Are you sure you want to delete "{state.songToDelete.title}
                    "?
                  </p>
                  <button
                    onClick={handleCancelDelete}
                    className="cancel-delete-button"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="confirm-delete-button"
                  >
                    Delete
                  </button>
                </div>
              )}
              {state.songs.map((song: any, index: any) => (
              <ul>
                <li><Link to={`/songs/edit/${song.id}`}><span className="play_no">{index + 1}</span><span className="play_hover"></span></Link></li>
                <li><a href="#"><img src={song.img} width={70} alt={song.title} /></a></li>
                <li><a href="#">{song.title}</a></li>
                <li className="text-center"><a href="#">{song.duration}</a></li>
                <li className="text-center"><a href="#">{song.artists}</a></li>
                <li className="text-center ms_more_icon"><a href="javascript:;" ><span className="ms_icon1 ms_active_icon"></span></a>
                  <ul className="more_option">
                    <li><a href="#"><span className="opt_icon"><span className="icon icon_fav"></span></span>Add To Favourites</a></li>
                    <li><a href="#"><span className="opt_icon"><span className="icon icon_queue"></span></span>Add To Queue</a></li>
                    <li><a href="#"><span className="opt_icon"><span className="icon icon_dwn"></span></span>Download Now</a></li>
                    <li><a href="#"><span className="opt_icon"><span className="icon icon_playlst"></span></span>Add To Playlist</a></li>
                    <li><a href="#"><span className="opt_icon"><span className="icon icon_share"></span></span>Share</a></li>
                  </ul>
                </li>
                <li className="text-center"><a onClick={() => handleDeleteClick(song)}><span className="ms_close">
                    <img src="./assets/images/svg/close.svg" alt=""/></span></a></li>
              </ul> ))}
          </div>
        </div>
        <div className="pagination-container mt-3">
          <button
            disabled={state.page == 1}
            onClick={() => handlePageChange(state.page - 1)}
            className="page-button"
          >
            Previous
          </button>
          <span className="page-info">
            Page {state.page} of {Math.ceil(state.total / state.pageSize)}
          </span>
          <button
            disabled={state.page == Math.ceil(state.total / state.pageSize)}
            onClick={() => handlePageChange(state.page + 1)}
            className="page-button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default SongList;
