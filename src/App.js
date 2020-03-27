import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import ClipboardJS from 'clipboard';

import SearchboxWrapper from './components/wrappers/SearchboxWrapper';
import SearchResultWrapper from './components/wrappers/SearchResultWrapper';
import ImagePreview from './components/ImagePreview';
import getGiphyGifs from './lib/giphy';

function App() {
  const [searchText, setSearchText] = useState('');
  const [gifResults, setGifResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    new ClipboardJS('.js-img-preview');
  }, []);

  useEffect(() => {
    if (searchText.length) {
      setLoading(true);
      getGiphyGifs(searchText)
        .then(resp => {
          const gifResults = resp.data;

          if (gifResults.length) {
            setGifResults(gifResults.map(gifData => {
              return {
                id: gifData.id,
                thumbnail: `https://media3.giphy.com/media/${gifData.id}/200_s.gif`,
                url: `https://media.giphy.com/media/${gifData.id}/giphy.gif`
              };
            }));
          }
          else {
            setGifResults([]);
          }

          setLoading(false);
        });
    }
    else {
      setGifResults([]);
    }
  }, [searchText]);

  return (
    <div>
      <SearchboxWrapper>
        <TextField
          id="searchbox"
          label="Search for gifs"
          variant="outlined"
          onChange={evt => {
            setSearchText(evt.target.value);
          }}
          fullWidth
        />
      </SearchboxWrapper>
      <SearchResultWrapper>
        {loading && (
          <CircularProgress />
        )}
        {gifResults.slice(0, 20).map(gif => {
          return (
            <a href={gif.url} key={gif.url} target="_blank" rel="noopener noreferrer">
              <ImagePreview
                className="js-img-preview"
                src={gif.thumbnail}
                data-clipboard-text={gif.url}
              />
            </a>
          );
        })}
      </SearchResultWrapper>
    </div>
  );
}

export default App;
