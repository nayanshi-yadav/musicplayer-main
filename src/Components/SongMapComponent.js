import React, { useEffect, useState } from "react";

const SongMapComponent = ({ song, setCurrentSong, setCurrentSongIndex, index, currentSong }) => {
  const [duration, setDuration] = useState("0: 00");
  function convertToMinutesAndSeconds(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    setDuration((minutes + ":" + remainingSeconds));
  }
  useEffect(() => {
    convertToMinutesAndSeconds(song.duration);
  }, [song]);
  return (
    <div className={"songMapComponent_ pointer " + (song._id === currentSong?._id && "songMapCompActive")} onClick={()=>{
      setCurrentSong(song)
      setCurrentSongIndex(index)
    }}>
      <img src={song.photo} alt="song" />
      <div className="songMapComponent_detail">
        <p className="font18 color_white">{song.title}</p>
        <p className="font14 color_white_op6">{song.artist}</p>
      </div>
      <p className="color_white_op6 font18">{duration}</p>
      {/* <div className="song_overlay_main">

      </div> */}
    </div>
  );
};

export default SongMapComponent;
