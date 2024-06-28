import React, { useState } from "react";
import { fetchMusicInfo } from "../utils/api";

const MusicDownload = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const fetchedResults = await fetchMusicInfo(query);
    setResults(fetchedResults);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div>
        <h1 className="text-3xl text-center">Music Download</h1>
        <div className="mt-4 flex justify-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for artist or song"
            className="border p-2"
          />
          <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white">
            Search
          </button>
        </div>
        <div className="mt-4">
          {results.map((result) => (
            <div key={result.id} className="mb-4">
              <h2 className="text-xl">{result.title} by {result.artist}</h2>
              <div className="flex space-x-2">
                {result.formats.map((format) => (
                  <a key={format.url} href={format.url} download className="p-2 bg-green-500 text-white">
                    Download {format.quality}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicDownload;