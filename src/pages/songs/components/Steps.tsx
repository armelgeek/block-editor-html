import React,{useReducer,useState} from 'react';
import axios from 'axios';
export function Steps({ current, children }) {
  return (
    <div className="steps">
      {React.Children.map(children, (child, index) => (
        <div
          className={`step${index === current ? " current" : ""}${
            index < current ? " done" : ""
          }`}
        >
          <div className="step-title">{child.props.title}</div>
          <div className="step-description">{child.props.description}</div>
        </div>
      ))}
    </div>
  );
}

export function Step({ title, description }) {
  return (
    <div className="step">
      <div className="step-title">{title}</div>
      <div className="step-description">{description}</div>
    </div>
  );
}
