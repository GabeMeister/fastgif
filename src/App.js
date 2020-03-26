import React from 'react';
import TextField from '@material-ui/core/TextField';
import getImgurGifs from './lib/imgur';
import getGiphyGifs from './lib/giphy';

function App() {
  const searchForGifs = text => {
    getGiphyGifs(text)
      .then(data => {
        console.log(data);
      });

    getImgurGifs(text)
      .then(data => {
        console.log(data);
      });
  };

  return (
    <div>
      <TextField
        id="searchbox"
        label="Search for a gif"
        variant="outlined"
        onChange={evt => {
          searchForGifs(evt.target.value);
        }}
      />
    </div>
  );
}

export default App;
