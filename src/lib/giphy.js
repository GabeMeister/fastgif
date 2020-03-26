const getGiphyGifs = text => {
  return fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${text}`, {
    "method": "GET",
    "headers": {}
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export default getGiphyGifs;