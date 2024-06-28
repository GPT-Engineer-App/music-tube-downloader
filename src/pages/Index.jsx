import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div>
        <h1 className="text-3xl text-center">Welcome to the Music and Video Downloader</h1>
        <p className="text-center">
          Use the navigation bar to explore the features.
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <Link to="/music-download" className="text-blue-500">Music Download</Link>
          <Link to="/video-download" className="text-blue-500">Video Download</Link>
        </div>
      </div>
    </div>
  );
};

export default Index;