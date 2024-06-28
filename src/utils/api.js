import axios from 'axios';
import cheerio from 'cheerio';

export const fetchMusicInfo = async (query) => {
  try {
    const apiUrl = `https://api.example.com/music/search?q=${query}`;
    const { data: apiData } = await axios.get(apiUrl);

    if (apiData && apiData.results) {
      return apiData.results.map((result, index) => ({
        id: index,
        title: result.title,
        artist: result.artist,
        formats: result.formats.map(format => ({
          quality: format.quality,
          url: format.url
        }))
      }));
    }

    // Fallback to web scraping if API fails
    const scrapeUrl = `https://example-music-site.com/search?q=${query}`;
    const { data: scrapeData } = await axios.get(scrapeUrl);
    const $ = cheerio.load(scrapeData);

    const results = [];
    $('.song-item').each((index, element) => {
      const title = $(element).find('.song-title').text();
      const artist = $(element).find('.song-artist').text();
      const formats = ['mp3', 'wav'].map(format => ({
        quality: format,
        url: $(element).find(`.download-${format}`).attr('href')
      }));
      results.push({ id: index, title, artist, formats });
    });

    return results;
  } catch (error) {
    console.error("Error fetching music info:", error);
    throw error;
  }
};

export const fetchVideoInfo = async (url) => {
  try {
    const apiUrl = `https://api.example.com/video/info?url=${url}`;
    const { data: apiData } = await axios.get(apiUrl);

    if (apiData && apiData.video) {
      return {
        title: apiData.video.title,
        duration: apiData.video.duration,
        thumbnail: apiData.video.thumbnail,
        formats: apiData.video.formats.map(format => ({
          quality: format.quality,
          url: format.url
        }))
      };
    }

    // Fallback to web scraping if API fails
    const { data: scrapeData } = await axios.get(url);
    const $ = cheerio.load(scrapeData);

    const title = $('meta[name="title"]').attr('content');
    const duration = $('meta[name="duration"]').attr('content');
    const thumbnail = $('meta[name="thumbnail"]').attr('content');
    const formats = ['mp4', 'webm'].map(format => ({
      quality: format,
      url: $(`meta[name="download-${format}"]`).attr('content')
    }));

    return { title, duration, thumbnail, formats };
  } catch (error) {
    console.error("Error fetching video info:", error);
    throw error;
  }
};