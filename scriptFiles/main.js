// main.js



import { baseURL, allPostsURL } from './urlCall.js';


async function insertPostTitlesAndImages() {
    try {
        const response = await fetch(allPostsURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const posts = await response.json();

       
        const postsContainer = document.querySelector('#posts-container');
  
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';

            const imgRegex = /<img.*?src=["'](.*?)["']/;
            const imgMatch = post.content.rendered.match(imgRegex);
            const imgSrc = imgMatch ? imgMatch[1] : '';

            const imageHTML = imgSrc ? `<a href="sitePages/post-detail.html?postId=${post.id}"><div class="post-image"><img src="${imgSrc}" alt=""></div></a>` : '';
  
            postElement.innerHTML = imageHTML + `<h2>${post.title.rendered}</h2>`;
  
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error("Could not fetch the posts: ", error);
    }
}


async function fetchPostDetails() {

}


document.addEventListener('DOMContentLoaded', (event) => {
    const postsContainer = document.querySelector('#posts-container');
    if (postsContainer) {
        insertPostTitlesAndImages();
    } else {
        fetchPostDetails();
    }
});
