import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import ClipboardJS from 'clipboard';

import SearchboxWrapper from './components/wrappers/SearchboxWrapper';
import SearchResultWrapper from './components/wrappers/SearchResultWrapper';
import ErrorMessage from './components/ErrorMessage';
import ImagePreview from './components/ImagePreview';
import getGiphyGifs from './lib/giphy';
import getImgurGifs from './lib/imgur';

function App() {
  const [api, setApi] = useState('giphy');
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
      setGifResults([]);

      const queryApi = api === 'giphy'
        ? getGiphyGifs
        : getImgurGifs;

      queryApi(searchText)
        .then(gifData => {
          setGifResults(gifData);
          setLoading(false);
          setErrorOccurred(false);
        })
        .catch(err => {
          setLoading(false);
          setErrorOccurred(true);
        });
    }
    else {
      setGifResults([]);
      setErrorOccurred(false);
    }
  }, [searchText, api]);

  return (
    <div>
      <SearchboxWrapper>
        <RadioGroup row>
          <FormControlLabel
            checked={api === 'giphy'}
            value="giphy"
            control={<Radio />}
            label="Giphy"
            onChange={() => {
              setApi('giphy');
            }}
          />
          <FormControlLabel
            checked={api === 'imgur'}
            value="imgur"
            control={<Radio />}
            label="Imgur"
            onChange={() => {
              setApi('imgur');
            }}
          />
        </RadioGroup>
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
