import React from 'react';
import TextField from '@material-ui/core/TextField';

function App() {
  const searchForGifs = text => {
    fetch(`http://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${text}`, {
      "method": "GET",
      "headers": {}
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('giphy: ', data);
      })
      .catch(err => {
        console.log(err);
      });

    fetch(`https://api.imgur.com/3/gallery/search/top/all?q=${text}&q_type=gif`, {
      "method": "GET",
      "headers": {
        "authorization": `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('imgur: ', data);
      })
      .catch(err => {
        console.log(err);
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
