import React, { useState } from "react";

const VideoDownload = () => {
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);

  const handleFetchInfo = async () => {
    // Fetch video information based on the URL
    // This is a placeholder for the actual API call
    const fetchedInfo = {
      title: "Sample Video",
      duration: "5:00",
      thumbnail: "https://via.placeholder.com/150",
    };
    setVideoInfo(fetchedInfo);
  };

  const handleDownload = () => {
    // Handle video download
    // This is a placeholder for the actual download logic
    alert("Downloading video...");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div>
        <h1 className="text-3xl text-center">Video Download</h1>
        <div className="mt-4 flex justify-center">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube video URL"
            className="border p-2"
          />
          <button onClick={handleFetchInfo} className="ml-2 p-2 bg-blue-500 text-white">
            Fetch Info
          </button>
        </div>
        {videoInfo && (
          <div className="mt-4 text-center">
            <h2 className="text-xl">{videoInfo.title}</h2>
            <p>Duration: {videoInfo.duration}</p>
            <img src={videoInfo.thumbnail} alt="Thumbnail" className="mx-auto" />
            <button onClick={handleDownload} className="mt-2 p-2 bg-green-500 text-white">
              Download Video
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoDownload;