import React, { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import Playlist from "./components/Playlist";
import { videosData } from "./videosData/videosData";
import VideoDetails from "./components/VideoDetails";
import "./App.css";

function App() {
  const [videos] = useState(videosData);
  const [currentVideo, setCurrentVideo] = useState(videosData[0]);

  const handleVideoChange = (id) => {
    const video = videos.find((video) => video.id === id);
    setCurrentVideo(video);
  };

  return (
    <div className="flex flex-col items-center rigi">
      <div className="w-full bg-gray-400 p-2">
        <h1 className="text-2xl font-semibold p-2 text-white ">
          Video Player App
          <img className='headingpng' src='/pngegg.png' />
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-7">
        <div className="md:col-span-2 rounded-lg">
          {videos.length > 0 ? (
            <>
              <VideoPlayer src={currentVideo?.sources[0]} />
              <VideoDetails video={currentVideo} />
            </>
          ) : (
            <p>No videos available</p>
          )}
        </div>
        <div className="rounded-lg">
          {videos.length > 0 && (
            <Playlist
              playlistVideos={videos}
              onVideoChange={handleVideoChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
