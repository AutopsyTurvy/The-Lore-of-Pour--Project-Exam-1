
import { baseURL, allPostsURL } from './urlCall.js';

async function insertPostCards() {
    const cardLoader = document.getElementById('loader');
    try {
        const response = await fetch(allPostsURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const posts = await response.json();

        const cardsContainer = document.querySelector('#cards-container'); 

        posts.forEach(post => {
            const cardElement = document.createElement('div');
            cardElement.className = 'post-card'; 

            const imgRegex = /<img.*?src=["'](.*?)["']/;
            const imgMatch = post.content.rendered.match(imgRegex);
            const imgSrc = imgMatch ? imgMatch[1] : '';

            const imageHTML = imgSrc ? `<a href="/sitePages/post-detail.html?postId=${post.id}"><div class="post-card-image"><img src="${imgSrc}" alt=""></div></a>` : ''; // Adjusted HTML structure for cards

            cardElement.innerHTML = imageHTML + `<h2>${post.title.rendered}</h2>`;

            cardsContainer.appendChild(cardElement);
        });
        cardLoader.style.display = 'none';
    } catch (error) {
        console.error("Could not fetch the posts for cards: ", error);
        cardLoader.style.display = 'none'; 
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const cardsContainer = document.querySelector('#cards-container');
    if (cardsContainer) {
        insertPostCards();
    } else {
       
    }
});