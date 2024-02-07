// main.js

import { baseURL, allPostsURL } from './urlCall.js';

async function insertPostTitlesAndImages() {
    const loader = document.getElementById('loader');
    const errorContainer = document.getElementById('error-container') || document.querySelector('#posts-container');
    try {
        const response = await fetch(allPostsURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const posts = await response.json();
        const postsContainer = document.querySelector('#posts-container');

        errorContainer.innerHTML = ''; 

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
        let errorMessage = "An unexpected error occurred. Please try again later."; 

        if (error.message.includes('HTTP error! status:')) {
            const statusCode = error.message.split(': ')[1];
            switch (statusCode) {
                case '404':
                    errorMessage = "Error: The requested resource was not found.";
                    break;
                case '403':
                    errorMessage = "Error: Access to the requested resource is forbidden.";
                    break;
                case '401':
                    errorMessage = "Error: Unauthorized access. Please log in.";
                    break;
                case '500':
                    errorMessage = "Error: The server encountered an internal error. Please try again later.";
                    break;
                case '503':
                    errorMessage = "Error: The service is unavailable. Please try again later.";
                    break;
                default:
                    errorMessage = `Error: An error occurred (status code: ${statusCode}). Please try again later.`;
            }
        } else if (error instanceof TypeError) {
            errorMessage = "Network error: Please check your internet connection.";
        }

        errorContainer.innerHTML = `<div class="error-message">${errorMessage}</div>`;
    } finally {
        loader.style.display = 'none';
    }
}

async function fetchPostDetails() {
    
}






//--------------------Carousel function-------------------------



function setupCarouselControls() {
    const carouselLeft = document.getElementById('carousel-left');
    const carouselRight = document.getElementById('carousel-right');

    if (carouselLeft && carouselRight) {
        carouselLeft.addEventListener('click', () => {
            document.getElementById('posts-container').scrollBy({ left: -300, behavior: 'smooth' });
        });
        carouselRight.addEventListener('click', () => {
            document.getElementById('posts-container').scrollBy({ left: 300, behavior: 'smooth' });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.querySelector('#posts-container');
    if (postsContainer) {
        insertPostTitlesAndImages().then(setupCarouselControls);
    } else {
        fetchPostDetails();
    }
});