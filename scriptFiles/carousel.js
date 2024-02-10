


//--------------------Carousel function-------------------------



export function carouselControls() {
    const carouselLeft = document.getElementById('carousel-left');
    const carouselRight = document.getElementById('carousel-right');
    const postsContainer = document.getElementById('posts-container');
    if (!postsContainer.firstElementChild) {
        console.error('Carousel cannot initialize without posts.');
        return;
    }
    const postWidth = postsContainer.firstElementChild.clientWidth;
    const totalPosts = postsContainer.children.length;
    const totalScrollWidth = postWidth * totalPosts;

    let autoScroll = setInterval(() => scrollRight(), 4000);

    function resetAutoScroll() {
        clearInterval(autoScroll);
        autoScroll = setInterval(() => scrollRight(), 4000);
    }

    function smoothReset(position) {
        postsContainer.style.transition = 'opacity 0.2s ease';
        postsContainer.style.opacity = '0';
        setTimeout(() => {
            postsContainer.scrollTo({ left: position, behavior: 'instant' });
            postsContainer.style.opacity = '1';
            setTimeout(() => postsContainer.style.transition = '', 100);
        }, 100); 
    }

    function scrollRight() {
        if (postsContainer.scrollLeft < totalScrollWidth - postWidth) {
            postsContainer.scrollBy({ left: postWidth, behavior: 'smooth' });
        } else {
            smoothReset(0); 
        }
        resetAutoScroll();
    }
    
    function scrollLeft() {
        if (postsContainer.scrollLeft > 0) {
            postsContainer.scrollBy({ left: -postWidth, behavior: 'smooth' });
        } else {
            smoothReset(totalScrollWidth - postWidth); 
        }
        resetAutoScroll();
    }

    if (carouselLeft && carouselRight) {
        carouselLeft.addEventListener('click', scrollLeft);
        carouselRight.addEventListener('click', scrollRight);
    }
}
