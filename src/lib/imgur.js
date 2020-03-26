const getImgurGifs = text => {
  return fetch(`https://api.imgur.com/3/gallery/search/top/all?q=${text}&q_type=gif`, {
    "method": "GET",
    "headers": {
      "authorization": `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export default getImgurGifs;