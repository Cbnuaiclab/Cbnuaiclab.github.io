// Team Building Activities Page JavaScript

// Gallery data
const galleries = {
    goesan: [
        'assets/img/activity/goesan_trial_hike/01.jpg',
        'assets/img/activity/goesan_trial_hike/02.JPG',
        'assets/img/activity/goesan_trial_hike/03.jpg',
        'assets/img/activity/goesan_trial_hike/04.JPG',
        'assets/img/activity/goesan_trial_hike/05.JPG',
        'assets/img/activity/goesan_trial_hike/06.JPG',
        'assets/img/activity/goesan_trial_hike/07.JPG',
        'assets/img/activity/goesan_trial_hike/08.JPG'
    ],
    mungyeong: [
        'assets/img/activity/mungyeong_trip/1.jpg',
        'assets/img/activity/mungyeong_trip/2.jpg',
        'assets/img/activity/mungyeong_trip/3.jpg',
        'assets/img/activity/mungyeong_trip/4.jpg',
        'assets/img/activity/mungyeong_trip/5.jpg',
        'assets/img/activity/mungyeong_trip/6.jpg',
        'assets/img/activity/mungyeong_trip/7.JPG'
    ]
};

let currentGallery = '';
let currentIndex = 0;

// Open Gallery Modal
function openGalleryModal(gallery) {
    document.getElementById(gallery + '-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Gallery Modal
function closeGalleryModal(gallery) {
    document.getElementById(gallery + '-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Open Lightbox
function openLightbox(gallery, index) {
    currentGallery = gallery;
    currentIndex = index;
    document.getElementById('lightbox').classList.add('active');
    document.getElementById('lightbox-img').src = galleries[gallery][index];
}

// Close Lightbox
function closeLightbox(event) {
    if (event.target.id === 'lightbox' || event.target.classList.contains('lightbox-close')) {
        document.getElementById('lightbox').classList.remove('active');
    }
}

// Change Image in Lightbox
function changeImage(direction, event) {
    event.stopPropagation();
    currentIndex += direction;
    const galleryLength = galleries[currentGallery].length;

    if (currentIndex < 0) {
        currentIndex = galleryLength - 1;
    } else if (currentIndex >= galleryLength) {
        currentIndex = 0;
    }

    document.getElementById('lightbox-img').src = galleries[currentGallery][currentIndex];
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (event.key === 'Escape') {
            lightbox.classList.remove('active');
        } else if (event.key === 'ArrowLeft') {
            changeImage(-1, event);
        } else if (event.key === 'ArrowRight') {
            changeImage(1, event);
        }
    }
});

// Add fade-in animation on page load
document.addEventListener('DOMContentLoaded', function() {
    const activityCards = document.querySelectorAll('.activity-card');
    activityCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 150);
    });

    // Animate page header
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        pageHeader.style.opacity = '0';
        pageHeader.style.transform = 'translateY(-20px)';
        pageHeader.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            pageHeader.style.opacity = '1';
            pageHeader.style.transform = 'translateY(0)';
        }, 100);
    }
});
