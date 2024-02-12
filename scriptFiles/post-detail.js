
// Post details.js

async function fetchPostDetails() {
    const loader = document.getElementById('loader');
    const errorContainer = document.getElementById('error-container');
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

   
    if (!postId) {
        errorContainer.innerHTML = 'Error: Post ID is missing in the URL.';
        loader.style.display = 'none';
        return;
    }

    try {
        const response = await fetch(`https://www.the-lore-of-pour.com/wp-json/wp/v2/posts/${postId}?_embed`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const post = await response.json();

        const decodedTitle = decodeHtmlEntities(post.title.rendered);
        const cleanTitle = removeSpecialCharacters(decodedTitle);

        document.getElementById('postTitle').textContent = cleanTitle;
        document.getElementById('postContent').innerHTML = post.content.rendered;

        applyStyling();
    } catch (error) {
        errorContainer.innerHTML = `Apologies- we could not fetch the post details: ${error.message}. Please try again later.`;
    } finally {
        loader.style.display = 'none'; 
    }
}

document.addEventListener('DOMContentLoaded', fetchPostDetails);

function decodeHtmlEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.textContent;
}

function removeSpecialCharacters(text) {
    return text.replace(/[^a-zA-Z\s,:;]/g, '');
}

function applyStyling() {
    const postContent = document.getElementById('postContent');
    postContent.style.textAlign = 'center';

    const images = postContent.getElementsByTagName('img');
    for (let img of images) {
        img.style.display = 'block';
        img.style.marginLeft = 'auto';
        img.style.marginRight = 'auto';
    }
}