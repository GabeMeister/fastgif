import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import ClipboardJS from 'clipboard';

import SearchboxWrapper from './components/wrappers/SearchboxWrapper';
import SearchResultWrapper from './components/wrappers/SearchResultWrapper';
import ErrorMessage from './components/ErrorMessage';
import ImagePreview from './components/ImagePreview';
import getGiphyGifs from './lib/giphy';

function App() {
  const [searchText, setSearchText] = useState('');
  const [gifResults, setGifResults] = useState([]);
  const [errorOccurred, setErrorOccurred] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    new ClipboardJS('.js-img-preview');
  }, []);

  useEffect(() => {
    if (searchText.length) {
      setLoading(true);

      getGiphyGifs(searchText)
        .then(gifData => {
          setGifResults(gifData);
          setLoading(false);
          setErrorOccurred(false);
        })
        .catch(err => {
          setGifResults([]);
          setLoading(false);
          setErrorOccurred(true);
        });
    }
    else {
      setGifResults([]);
      setErrorOccurred(false);
    }
  }, [searchText, setLoading, setGifResults, setErrorOccurred]);

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
        {errorOccurred && (
          <ErrorMessage />
        )}
        {!!gifResults.length && gifResults.slice(0, 20).map(gif => {
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
