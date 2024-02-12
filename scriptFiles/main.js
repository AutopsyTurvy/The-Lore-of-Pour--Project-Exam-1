

// main.js

import { baseURL, allPostsURL } from './urlCall.js';
import { carouselControls } from './carousel.js';

async function insertPostTitlesAndImages() {
    const loader = document.getElementById('loader');
    const errorContainer = document.getElementById('error-container') || document.querySelector('#posts-container');


    function getImageSizeParams() {
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (screenWidth <= 480) { 
            return '?w=200&h=150&format=webp&quality=70'; 
        } else if (screenWidth <= 768) { 
            return '?w=300&h=225&format=webp&quality=75';
        } else {
            return '?w=400&h=300&format=webp&quality=80';
        }
    }

    try {
        const response = await fetch(allPostsURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const posts = await response.json();
        const postsContainer = document.querySelector('#posts-container');
        errorContainer.innerHTML = '';

        let mostRecentPostDate = new Date(Math.max(...posts.map(post => new Date(post.date_gmt))));
        let mostRecentPostId = posts.find(post => new Date(post.date_gmt).getTime() === mostRecentPostDate.getTime()).id;

        const imageSizeParams = getImageSizeParams(); 

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';

            const imgRegex = /<img.*?src=["'](.*?)["']/;
            const imgMatch = post.content.rendered.match(imgRegex);
            let imgSrc = imgMatch ? imgMatch[1] : '';

            if (imgSrc) {
                imgSrc += imageSizeParams; 
            }

            const imageHTML = imgSrc ? `<a href="sitePages/post-detail.html?postId=${post.id}"><div class="post-image"><img src="${imgSrc}" alt=""></div></a>` : '';

            let mostRecentNote = post.id === mostRecentPostId ? " (Our most recent Article)" : "";
            postElement.innerHTML = imageHTML + `<h2>${post.title.rendered}${mostRecentNote}</h2>`;
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        errorContainer.innerHTML = `<div class="error-message">${error.message}</div>`;
    } finally {
        loader.style.display = 'none';
    }
}



document.addEventListener('DOMContentLoaded', async () => {
    const postsContainer = document.querySelector('#posts-container');
    const loader = document.getElementById('loader'); 

    if (postsContainer) {
        await insertPostTitlesAndImages();
        carouselControls();
    }

    if (loader) {
        loader.style.display = 'none';
    }
});