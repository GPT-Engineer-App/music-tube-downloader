import axios from 'axios';
import cheerio from 'cheerio';

export const scrapeMusicInfo = async (query) => {
  const url = `https://example-music-site.com/search?q=${query}`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const results = [];
  $('.song-item').each((index, element) => {
    const title = $(element).find('.song-title').text();
    const artist = $(element).find('.song-artist').text();
    const formats = ['mp3', 'wav']; // Example formats
    results.push({ id: index, title, artist, formats });
  });

  return results;
};

export const scrapeVideoInfo = async (url) => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const title = $('meta[name="title"]').attr('content');
  const duration = $('meta[name="duration"]').attr('content');
  const thumbnail = $('meta[name="thumbnail"]').attr('content');

  return { title, duration, thumbnail };
};