import {
  PauseIcon,
  PlayIcon,
  TriangleLeftIcon,
  TriangleRightIcon,
} from "@radix-ui/react-icons";
import React, { useState, useRef, useEffect } from "react";
import * as YouTubeImport from "react-youtube";
const YouTube = YouTubeImport.default;

interface Song {
  id: string;
  youtubeId: string;
  track: string;
  artist: string;
}

const songs: Song[] = [
  {
    id: "1",
    youtubeId: "v=VoEsEC2CLgE",
    track: "Just The Two Of Us",
    artist: "Bill Withers",
  },
  {
    id: "2",
    youtubeId: "v=XXx6RDzR6eM",
    track: "Lets Stay Together",
    artist: "Al Green",
  },
  {
    id: "3",
    youtubeId: "v=lIU5YMp-l2A",
    track: "Free Treasure",
    artist: "Adrianne Lenker",
  },
];

const App: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onReady = (event: any): void => {
    playerRef.current = event.target;
  };

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 0,
      controls: 0,
    },
  };

  const playTrack = (): void => {
    if (playerRef.current) {
      playerRef.current.playVideo();
      setPlaying(true);
    }
  };

  const pauseTrack = (): void => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
      setPlaying(false);
    }
  };

  const changeTrack = (offset: number): void => {
    let newTrack = currentTrack + offset;
    if (newTrack >= songs.length) {
      newTrack = 0;
    } else if (newTrack < 0) {
      newTrack = songs.length - 1;
    }
    setCurrentTrack(newTrack);
    if (playerRef.current) {
      playerRef.current.loadVideoById(songs[newTrack].youtubeId);
      if (playing) {
        playerRef.current.playVideo();
      }
    }
  };

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.loadVideoById(songs[currentTrack].youtubeId);
      if (playing) {
        playerRef.current.playVideo();
      }
    }
  }, [currentTrack]);

  const onStateChange = (event: any): void => {
    if (event.data === 0) {
      changeTrack(1);
    }
  };

  return (
    <div>
      <div className="cassette-player">
        <div className="cassette">
          <div className="label-container">
            <div className="trapazoid"></div>
            <div className="white">
              <div className="white-space"></div>
              <div id="label" className="label">
                {songs[currentTrack].track} - {songs[currentTrack].artist} -
                Track {currentTrack + 1} of {songs.length}
              </div>
              <div className="white-space"></div>
            </div>
            <div className="tape-container">
              <div className="white-space"></div>
              <div className="wheel-container">
                <div className={`wheel ${playing ? "spin1" : ""}`}>
                  <div className="wheel-overlap">
                    <div className="inner-circle"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                  </div>
                </div>
                <div className={`wheel wheel-2 ${playing ? "spin2" : ""}`}>
                  <div className="wheel-overlap">
                    <div className="inner-circle"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                  </div>
                </div>
              </div>
              <div className="white-space"></div>
            </div>
            <div className="red"></div>
          </div>
        </div>

        <div id="audioPlayer">
          <div className="audio-controls">
            <button
              title="Previous Track"
              className="btn"
              onClick={() => changeTrack(-1)}
            >
              <TriangleLeftIcon width={30} height={30} />
            </button>
            <button title="Play Track" className="btn" onClick={playTrack}>
              <PlayIcon width={30} height={30} />
            </button>
            <button title="Pause Track" className="btn" onClick={pauseTrack}>
              <PauseIcon width={30} height={30} />
            </button>
            <button
              title="Next Track"
              className="btn"
              onClick={() => changeTrack(1)}
            >
              <TriangleRightIcon width={30} height={30} />
            </button>
          </div>
        </div>
      </div>

      {mounted && (
        <YouTube
          videoId={songs[currentTrack].youtubeId}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      )}
    </div>
  );
};

export default App;
