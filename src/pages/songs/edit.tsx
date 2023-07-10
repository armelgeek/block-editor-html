import React from 'react';
import { useParams } from "react-router-dom";
import SongForm from './SongForm';
const EditSong = () => {
	let { id } = useParams(); 
    return (
        <SongForm songId={id}/>
    );
};
export default EditSong;
