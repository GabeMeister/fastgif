import React from 'react';
import TextField from '@material-ui/core/TextField';

function App() {
  const searchForGifs = text => {
    console.log('searching for ' + text);
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
