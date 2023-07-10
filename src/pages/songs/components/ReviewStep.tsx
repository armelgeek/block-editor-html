import React,{useReducer,useState} from 'react';
import axios from 'axios';
function ReviewStep({ state, onPrevStep, onSubmit }) {
  return (
    <div>
      <h2>Review your information</h2>
      <p>Please review the following information before submitting your song.</p>

      <div className="review-section">
        <h3>Basic Information</h3>
        {state.youtube.id && (
          <img src={state.youtube.img} width={120} alt={state.youtube.original_title} />
        )}
        <p>
          <strong>Title:</strong> {state.title}
        </p>
         <h3>Tags</h3>
        {state.tag_names.length > 0 && (
        <ul>
          {state.tag_names.map((tag,index) => (
            <li key={index}>
                {tag}
            </li>
          ))}
        </ul>
      )}
        <p>
          <strong>Duration:</strong> {state.duration}
        </p>
      </div>
      <div className="review-section">
        <h3>Artists</h3>
        <ul>
          {state.artist_names.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>

      <div className="review-section">
        <h3>Lyrics</h3>
        <p>{state.lyrics}</p>
      </div>

      <div className="actions">
        <button className="prev-button" onClick={onPrevStep}>
          Previous
        </button>
        <button className="submit-button" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
export default ReviewStep;