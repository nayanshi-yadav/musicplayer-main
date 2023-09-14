import React, { useEffect, useState } from "react";
import { TfiMoreAlt } from "react-icons/tfi";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { MdVolumeUp } from "react-icons/md";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
  TbPlayerPlayFilled,
  TbPlayerPauseFilled,
} from "react-icons/tb";
import useSound from "use-sound";
import { Slider } from "@mui/material";
import { styled } from "@mui/material/styles";

const MySlider = styled(Slider)({
  color: "#393734",
  height: 8,
  opacity: 1,
  "& .MuiSlider-track": {
    opacity: 1,
    border: "none",
    backgroundColor: "#fff",
  },
  "& .MuiSlider-thumb": {
    height: 12,
    width: 12,
    backgroundColor: "#fff",
    // border: "2px solid currentColor",
    opacity: 1,
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
      opacity: 1,
    },
    "&:before": {
      display: "none",
      opacity: 1,
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    opacity: 1,
    backgroundColor: "#fff",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
      opacity: 1,
    },
  },
});

const SongProfile = ({
  currentSong,
  handleNext,
  handlePrev,
  currentSongIndex,
  totalSongCount,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isShowvolume, setIsShowVolume] = useState(false);
  const [songUrl, setSongUrl] = useState(currentSong?.url);
  const [play, { pause, duration, sound, stop }] = useSound(songUrl, {
    volume,
  });
  const [time, setTime] = useState({
    min: "",
    sec: "",
  });
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: "",
  });

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (currentSong) {
      setSongUrl(currentSong.url);
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    if (currentSong) {
      stop();
      setIsPlaying(false);
      setSeconds(0)
      setCurrTime({
        min: 0,
        sec: 0,
      });
    }
  }, [currentSong, stop]);

  const playingButton = () => {
    if (isPlaying) {
      pause(); // this will pause the audio
      setIsPlaying(false);
    } else {
      play(); // this will play the audio
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min,
        sec: secRemain,
      });
    }
  }, [isPlaying, duration, currentSong]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        // coahsdfos
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound, currentSong]);

  return (
    <>
      {currentSong ? (
        <div className="song_profile_root">
          <p className="font32 color_white">{currentSong.title}</p>
          <p className="font16 color_white_op6">{currentSong.artist}</p>
          <div className="song_profile_main">
            <div className="song_image mt-32">
              <img src={currentSong.photo} alt="song" />
            </div>
            <div className="song_range mt-24">
              <div className="song_time">
                <p className="font14 color_white_op6">
                  {currTime.min}:{currTime.sec}
                </p>
                <p className="font14 color_white_op6">
                  {time.min}:{time.sec}
                </p>
              </div>
              <MySlider
                aria-label="time"
                min={0}
                max={duration / 1000}
                defaultValue={0}
                value={seconds}
                onChange={(e) => {
                  sound.seek([e.target.value]);
                }}
              />
            </div>
            <div className="song_options mt-32">
              <button className="song_more_option_button">
                <TfiMoreAlt size={"1.5em"} color="#fff" />
              </button>
              <div className="song_play_options">
                <button className="song_play_options_prev" onClick={handlePrev}>
                  <TbPlayerTrackPrevFilled
                    size={"1.5em"}
                    color={currentSongIndex === 0 ? "#9c9b99" : "#ffffff"}
                  />
                </button>
                {!isPlaying ? (
                  <button
                    className="song_play_options_play"
                    onClick={playingButton}
                  >
                    <TbPlayerPlayFilled size={"1.5em"} color="#000000" />
                  </button>
                ) : (
                  <button
                    className="song_play_options_play"
                    onClick={playingButton}
                  >
                    <TbPlayerPauseFilled size={"1.5em"} color="#000000" />
                  </button>
                )}
                <button className="song_play_options_prev" onClick={handleNext}>
                  <TbPlayerTrackNextFilled
                    size={"1.5em"}
                    color={
                      totalSongCount === currentSongIndex + 1
                        ? "#9c9b99"
                        : "#ffffff"
                    }
                  />
                </button>
              </div>
              <div className="song_volumn">
                <button className="song_play_options_prev">
                  {Number(volume) === 0 ? (
                    <HiVolumeOff
                      size={"1.5em"}
                      color="#ffffff"
                      onClick={() => setIsShowVolume(!isShowvolume)}
                    />
                  ) : Number(volume) === 1 ? (
                    <HiVolumeUp
                      size={"1.5em"}
                      color="#ffffff"
                      onClick={() => setIsShowVolume(!isShowvolume)}
                    />
                  ) : (
                    <MdVolumeUp
                      size={"1.5em"}
                      color="#ffffff"
                      onClick={() => setIsShowVolume(!isShowvolume)}
                    />
                  )}
                </button>
                {isShowvolume && (
                  <input
                    type="range"
                    value={volume}
                    defaultValue={volume}
                    min="0"
                    step="0.01"
                    max={1}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setVolume(e.target.value);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>loading</div>
      )}
    </>
  );
};

export default SongProfile;
