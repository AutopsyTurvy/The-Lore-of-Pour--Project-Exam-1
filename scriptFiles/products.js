
import { baseURL } from './urlCall.js';

const productsURL = `${baseURL}/wp-json/wp/v2/media`;

fetch(productsURL)
  .then(response => response.json())
  .then(data => {
    console.log(data); 
   
  })
  .catch(error => console.error('Error fetching the images:', error));