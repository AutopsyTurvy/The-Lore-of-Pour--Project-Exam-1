

// This drove me mental- there were lots of tears, lots of unhealthy snacks, lots of swearing. I have aged ten years in five weeks. 



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

    let autoScroll;

    function scrollRight() {
        if (postsContainer.scrollLeft < totalScrollWidth - postWidth) {
            postsContainer.scrollBy({ left: postWidth, behavior: 'smooth' });
        } else {
            smoothReset(0);
        }
        if (autoScroll) resetAutoScroll(); 
    }

    function scrollLeft() {
        if (postsContainer.scrollLeft > 0) {
            postsContainer.scrollBy({ left: -postWidth, behavior: 'smooth' });
        } else {
            smoothReset(totalScrollWidth - postWidth);
        }
        if (autoScroll) resetAutoScroll(); 
    }

    function smoothReset(position) {
        postsContainer.style.transition = 'opacity 0.2s ease';
        postsContainer.style.opacity = '0';
        setTimeout(() => {
            postsContainer.scrollTo({ left: position, behavior: 'instant' });
            postsContainer.style.opacity = '1';
            setTimeout(() => postsContainer.style.transition = '', 100);
        }, 200);
    }

    function resetAutoScroll() {
        clearInterval(autoScroll);
        autoScroll = setInterval(scrollRight, 4000);
    }

  
    function adjustAutoScroll() {
        const shouldAutoScroll = window.innerWidth > 768; 
        if (shouldAutoScroll) {
            if (!autoScroll) { 
                resetAutoScroll();
            }
        } else {
            if (autoScroll) {
                clearInterval(autoScroll); 
                autoScroll = null;
            }
        }
    }

  
    if (carouselLeft && carouselRight) {
        carouselLeft.addEventListener('click', scrollLeft);
        carouselRight.addEventListener('click', scrollRight);
    }


    window.addEventListener('resize', adjustAutoScroll);

    adjustAutoScroll();
}