import React, { useEffect, useState } from "react";
import "./App.css";
import Playlist from "./Components/Playlist";
import { useQuery, gql } from "@apollo/client";
import SongMain from "./Components/SongMain";

const PLAYLIST_QUERY = gql`
  {
    getPlaylists {
      id
      title
    }
  }
`;

const App = () => {
  const [currentPlaylist, setCurrentPlaylist] = useState("");
  const [playlistArr, setPlayListArr] = useState([]);
  const { data, loading } = useQuery(PLAYLIST_QUERY);

  useEffect(() => {
    if (data) {
      setPlayListArr(data.getPlaylists);
      setCurrentPlaylist(data.getPlaylists[0]);
    }
  }, [data]);

  return (
    <div className="App">
      <div className="main">
        <Playlist
          playlistArr={playlistArr}
          currentPlaylist={currentPlaylist}
          setCurrentPlaylist={setCurrentPlaylist}
          loading={loading}
        />
        <SongMain
          currentPlaylist={currentPlaylist}
        />
      </div>
    </div>
  );
};

export default App;
