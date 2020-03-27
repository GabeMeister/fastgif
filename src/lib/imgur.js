const getImgurGifs = text => {
  return fetch(`https://api.imgur.com/3/gallery/search/top/all?q=${text}&q_type=gif`, {
    "method": "GET",
    "headers": {
      "authorization": `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`
    }
  })
    .then(resp => {
      return resp.json();
    })
    .then(resp => {
      const gifResults = resp.data || [];

      return gifResults.map(gifData => {
        return {
          id: gifData.id,
          thumbnail: `https://i.imgur.com/${gifData.id}t.jpg`,
          url: `http://i.imgur.com/${gifData.id}.gif`
        };
      });
    });
};

export default getImgurGifs;