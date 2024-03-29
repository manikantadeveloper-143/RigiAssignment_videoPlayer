/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const VideoItem = ({ video, index, currentVideoIndex, onClick, provided }) => {
  return (
    <li
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`border-2 mb-2 h-24 ${
        video.id == currentVideoIndex ? "bg-zinc-200" : ""
      }`}
    >
      <div
        onClick={onClick}
        style={{ cursor: "pointer" }}
        className="flex flex-row text-center justify-start p-2"
      >
        <div className="flex items-center p-2 mr-1">
          <img src="/drag.svg" className="h-5 w-5 hidden" alt="drag" />

          {video.id == currentVideoIndex ? (
            <img src="/play.svg" className="h-3 w-5 list-index" alt="play" />
          ) : (
            <span className="list-index w-5">{index + 1}</span>
          )}
        </div>
        <div className="flex">
          <div className="flex items-center">
            <img src={video.thumb} className="w-26 h-20" alt={video.title} />
          </div>
          <div className="flex flex-col ml-4">
            <p className="mb-2 text-left text-md font-medium">{video.title}</p>
            <p className="mb-2 text-left text-sm">{video.subtitle}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

const Playlist = ({ playlistVideos, onVideoChange }) => {
  const [videos, setVideos] = useState(playlistVideos);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const playVideo = (video, index) => {
    setCurrentVideoIndex(video.id);
    onVideoChange?.(video.id);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    if (
      result.destination.droppableId === result.source.droppableId &&
      result.source.index === result.destination.inde
    )
      return;
    const sourceIndex = parseInt(result.source.index);
    const destinationIndex = parseInt(result.destination.index);

    const updatedVideoList = Array.from(filteredVideos);
    const [reorderedItem] = updatedVideoList.splice(sourceIndex, 1);
    updatedVideoList.splice(destinationIndex, 0, reorderedItem);

    setVideos(updatedVideoList);
  };

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-2 border-2 rounded-md">
      <div className="h-16 flex items-center">
        <h1 className="font-medium text-left text-xl">Playlist</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search videos"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-md mb-4 outline-none"
        />
      </div>
      <div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="playlist">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="overflow-y-auto h-[37rem]"
              >
                {filteredVideos.map((video, index) => (
                  <Draggable
                    key={video.id}
                    draggableId={video.id}
                    index={index}
                  >
                    {(provided) => (
                      <VideoItem
                        key={video.id}
                        video={video}
                        index={index}
                        currentVideoIndex={currentVideoIndex}
                        onClick={() => playVideo(video, index)}
                        provided={provided}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Playlist;
