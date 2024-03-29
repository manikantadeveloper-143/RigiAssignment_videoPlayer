import React from "react";

const VideoDetails = ({ video = {} }) => {
  const { title, subtitle, description } = video;
  return (
    <div className="flex flex-col mt-4">
      <p className="mb-2 text-left text-xl font-medium">{title}</p>
      <p className="mb-2 text-left text-sm">{subtitle}</p>
      <p>
        <p className="mb-2 text-left text-sm bg-slate-100 p-3 rounded-lg">
          {description}
        </p>
      </p>
    </div>
  );
};

export default VideoDetails;
