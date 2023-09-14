import React from "react";
import logo from "../Images/Logo.png";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const Playlist = ({
  playlistArr,
  currentPlaylist,
  setCurrentPlaylist,
  loading,
}) => {
  return (
    <div className="playlist_root">
      <div className="playList-logo mb-32">
        <img src={logo} alt="spotify" />
      </div>
      <div className="playList-options">
        {loading && (
          <Stack spacing={1}>
            <Skeleton animation="wave" variant="text" sx={{ fontSize: "1rem", bgcolor: 'grey.800' }} />
            <Skeleton animation="wave" variant="text" sx={{ fontSize: "1rem", bgcolor: 'grey.800' }} />
            <Skeleton animation="wave" variant="text" sx={{ fontSize: "1rem", bgcolor: 'grey.800' }} />
            <Skeleton animation="wave" variant="text" sx={{ fontSize: "1rem", bgcolor: 'grey.800' }} />
          </Stack>
        )}
        {playlistArr &&
          playlistArr.length > 0 &&
          playlistArr.map((data) => (
            <p
              key={data.title}
              className={
                "font20 " +
                (currentPlaylist.title === data.title
                  ? "color_white"
                  : "color_white_op4")
              }
              onClick={() => setCurrentPlaylist(data)}
            >
              {data.title}
            </p>
          ))}
      </div>
    </div>
  );
};

export default Playlist;
