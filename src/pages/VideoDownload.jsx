import React, { useState } from "react";
import { fetchVideoInfo } from "../utils/api";

const VideoDownload = () => {
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchInfo = async () => {
    try {
      console.log("Fetching video info for URL:", url);
      const fetchedInfo = await fetchVideoInfo(url);
      console.log("Fetched video info:", fetchedInfo);
      setVideoInfo(fetchedInfo);
      setError(null);
    } catch (err) {
      console.error("Error fetching video info:", err);
      setError("Failed to fetch video information. Please try again.");
    }
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
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {videoInfo && (
          <div className="mt-4 text-center">
            <h2 className="text-xl">{videoInfo.title}</h2>
            <p>Duration: {videoInfo.duration}</p>
            <img src={videoInfo.thumbnail} alt="Thumbnail" className="mx-auto" />
            <div className="flex justify-center space-x-2 mt-2">
              {videoInfo.formats.map((format) => (
                <a key={format.url} href={format.url} download className="p-2 bg-green-500 text-white">
                  Download {format.quality}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoDownload;