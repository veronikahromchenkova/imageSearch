import axios from "axios";
require("dotenv").config();

export async function getImages(page, per_page, keyword) {
  const url = "https://api.unsplash.com/search/photos";
  return await axios
    .get(url, {
      params: {
        query: keyword,
        page: page,
        per_page: per_page
      },
      headers: {
        Authorization: "Client-ID " + process.env.REACT_APP_CLIENT_ID
      }
    })
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
}

export function downloadImage(image) {
  const url = image.links.download_location;
  axios
    .get(url, {
      headers: {
        Authorization: "Client-ID " + process.env.REACT_APP_CLIENT_ID
      }
    })
    .then(res => {
      let a = document.createElement("a");
      a.href = res.data.url + "&dl=" + image.alt_description + ".jpg";
      a.click();
    });
}
