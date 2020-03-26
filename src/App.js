import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import ClipboardJS from 'clipboard';

import getGiphyGifs from './lib/giphy';

const SearchboxWrapper = styled.div`
  width: 25%;
  min-width: 200px;
  margin: auto;
  margin-top: 200px;
`;

const SearchResultWrapper = styled.div`
  margin: auto;
  margin-top: 50px;
  width: 75%;
  text-align: center;
`;

const ImagePreview = styled.img`
  margin-right: 20px;
  margin-bottom: 20px;
  display: inline-block;
  border-radius: 5px;
  background-color: red;
`;

function App() {
  const [searchText, setSearchText] = useState('');
  const [gifResults, setGifResults] = useState([]);

  useEffect(() => {
    new ClipboardJS('.js-img-preview');
  }, []);

  useEffect(() => {
    getGiphyGifs(searchText)
      .then(resp => {
        const gifResults = resp.data;

        if (gifResults.length) {
          console.log(gifResults);
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
      });
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
        {gifResults.slice(0, 20).map(gif => {
          return (
            <a href={gif.url} key={gif.url} target="_blank" rel="noopener noreferrer">
              <ImagePreview
                className="js-img-preview"
                src={gif.thumbnail}
                style={{ maxHeight: '100px' }}
                onClick={() => {
                  console.log('you clicked ' + gif.url);
                }}
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
