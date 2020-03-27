import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import ClipboardJS from 'clipboard';

import getGiphyGifs from './lib/giphy';

const SearchboxWrapper = styled.div`
  width: 30%;
  min-width: 300px;
  margin: auto;
  margin-top: 200px;
`;

const SearchResultWrapper = styled.div`
  margin: auto;
  margin-top: 50px;
  width: 60%;
  text-align: center;
`;

const ImagePreview = styled.img`
  margin-right: 20px;
  margin-bottom: 20px;
  display: inline-block;
  border-radius: 5px;
  background-color: red;
  max-height: 100px;
  animation: fadein .7s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

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
