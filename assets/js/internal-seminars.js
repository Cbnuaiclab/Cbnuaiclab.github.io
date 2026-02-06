// Internal Seminars Page JavaScript

// PDF Viewer Modal
function openPdfModal(url, title) {
    var modal = document.getElementById('pdf-modal');
    var viewer = document.getElementById('pdf-viewer');
    var modalTitle = document.getElementById('pdf-modal-title');
    modalTitle.textContent = title;
    viewer.src = url;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePdfModal() {
    var modal = document.getElementById('pdf-modal');
    var viewer = document.getElementById('pdf-viewer');
    modal.classList.remove('active');
    viewer.src = '';
    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        var modal = document.getElementById('pdf-modal');
        if (modal && modal.classList.contains('active')) {
            closePdfModal();
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to table rows
    const tableRows = document.querySelectorAll('.seminar-table tbody tr');
    tableRows.forEach((row, index) => {
        setTimeout(() => {
            row.style.opacity = '0';
            row.style.transform = 'translateX(-20px)';
            row.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

            setTimeout(() => {
                row.style.opacity = '1';
                row.style.transform = 'translateX(0)';
            }, 50);
        }, index * 50);
    });

    // Add animation to page header
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
