import React, { useEffect, useState } from "react";
import SongProfile from "./SongProfile";
import SongMapComponent from "./SongMapComponent";
import SearchIcon from "../Icons/SearchIcon";
import { useQuery, gql } from "@apollo/client";
import { Skeleton, Stack } from "@mui/material";

const SONGS_QUERY = gql`
  query Query($playlistId: Int!) {
    getSongs(playlistId: $playlistId) {
      _id
      title
      photo
      url
      duration
      artist
    }
  }
`;
const SongMain = ({ currentPlaylist }) => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songSearch, setSongsSearch] = useState("");
  const { data, loading } = useQuery(SONGS_QUERY, {
    variables: { playlistId: currentPlaylist.id },
  });
  useEffect(() => {
    if (data) {
      setSongs(data.getSongs);
      setCurrentSong(data.getSongs[0]);
      setCurrentSongIndex(0);
    }
  }, [data]);

  const handleNext = () => {
    if (currentSongIndex + 1 !== data.getSongs.length) {
      setCurrentSongIndex(currentSongIndex + 1);
      setCurrentSong(data.getSongs[currentSongIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentSongIndex !== 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      setCurrentSong(data.getSongs[currentSongIndex - 1]);
    }
  };

  return (
    <>
      <div className="songList_root">
        {loading ? (
          <Skeleton
            animation="wave"
            variant="text"
            sx={{ fontSize: "1rem", bgcolor: "grey.800" }}
          />
        ) : (
          <p className="font32 color_white">{currentPlaylist?.title}</p>
        )}
        <div className="songList_main mt-32">
          <div className="songSearch_main">
            <input
              type="text"
              className="font18"
              placeholder="Searcg Song, Artist"
              value={songSearch}
              onChange={(e) => setSongsSearch(e.target.value)}
            />
            <span>
              <SearchIcon />
            </span>
          </div>
          <div className="songList_map mt-32">
            {loading && (
              <Stack spacing={1}>
                {[...Array(5).keys()].map((num, i) => (
                  <div className="songMapComponent_" key={i}>
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      sx={{ width: 48, height: 48, bgcolor: "grey.800" }}
                    />
                    <div className="songMapComponent_detail ml-16">
                      <Skeleton
                        animation="wave"
                        variant="text"
                        sx={{
                          maxWidth: 150,
                          fontSize: "1rem",
                          bgcolor: "grey.800",
                        }}
                      />
                      <Skeleton
                        animation="wave"
                        variant="text"
                        sx={{
                          maxWidth: 150,
                          fontSize: "1rem",
                          bgcolor: "grey.800",
                        }}
                      />
                    </div>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      sx={{ width: 75, fontSize: "1rem", bgcolor: "grey.800" }}
                    />
                  </div>
                ))}
              </Stack>
            )}
            {songs &&
              songs.length > 0 &&
              songs
                .filter((song) => {
                  if (songSearch === "") {
                    return song;
                  }
                  return (
                    song.title
                      .toLowerCase()
                      .includes(songSearch.toLowerCase()) ||
                    song.artist.toLowerCase().includes(songSearch.toLowerCase())
                  );
                })
                .map((song, i) => (
                  <SongMapComponent
                    key={song._id}
                    song={song}
                    setCurrentSong={setCurrentSong}
                    setCurrentSongIndex={setCurrentSongIndex}
                    index={i}
                    currentSong={currentSong}
                  />
                ))}
          </div>
        </div>
      </div>
      {currentSong && (
        <SongProfile
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          handleNext={handleNext}
          handlePrev={handlePrev}
          currentSongIndex={currentSongIndex}
          totalSongCount={songs.length}
        />
      )}
    </>
  );
};

export default SongMain;
