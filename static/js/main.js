document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Logo Refresh Functionality
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            window.location.reload();
        });
    }

    // Hamburger Menu Functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle Icon between Bars and Times
            const icon = hamburger.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when a link is clicked
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');

                // Reset Icon
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/static/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered successfully:', registration);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    }

    // Reveal Animations on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in-section'); // Add base class via JS or CSS
        observer.observe(section);
    });

    // Modal Logic
    const modal = document.getElementById("quoteModal");
    const qrModal = document.getElementById("qrModal");
    const closeBtn = document.querySelector(".close-modal");

    window.openQuoteModal = function () {
        modal.style.display = "block";
    }

    window.toggleQRModal = function () {
        if (qrModal.style.display === "block") {
            qrModal.style.display = "none";
        } else {
            qrModal.style.display = "block";
            generateQRCode();
        }
    }

    function generateQRCode() {
        const qrContainer = document.getElementById("qrcode");
        if (qrContainer.innerHTML === "") {
            // Use network IP so scanning from phone works
            const networkUrl = "https://saba-graphics.onrender.com";
            new QRCode(qrContainer, {
                text: networkUrl,
                width: 200,
                height: 200,
                colorDark: "#3E2723",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    }

    closeBtn.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        if (event.target == qrModal) {
            qrModal.style.display = "none";
        }
    }

    // Form Submissions
    // Form Submissions
    const handleFormSubmit = async (formId, endpoint) => {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = "Sending...";
            btn.disabled = true;

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();

                if (result.status === 'success') {
                    btn.innerText = "Sent Successfully!";
                    btn.style.background = "#4CAF50";
                    form.reset();
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.background = "";
                        btn.disabled = false;
                        if (formId === 'quoteForm' && modal.style.display === "block") {
                            modal.style.display = "none";
                        }
                    }, 2000);
                } else {
                    alert('Error: ' + result.message);
                    btn.innerText = originalText;
                    btn.disabled = false;
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    };

    handleFormSubmit('leadForm', '/contact');
    handleFormSubmit('quoteForm', '/quote');

    // ===== Portfolio Interaction Functions =====

    // Like Toggle
    window.toggleLike = function (btn) {
        const card = btn.closest('.portfolio-card');
        const dislikeBtn = card.querySelector('.dislike-btn');

        // Remove dislike if active
        if (dislikeBtn.classList.contains('active-dislike')) {
            dislikeBtn.classList.remove('active-dislike');
            dislikeBtn.querySelector('i').classList.replace('fas', 'far');
        }

        btn.classList.toggle('active-like');
        const icon = btn.querySelector('i');
        if (btn.classList.contains('active-like')) {
            icon.classList.replace('far', 'fas');
        } else {
            icon.classList.replace('fas', 'far');
        }
    };

    // Dislike Toggle
    window.toggleDislike = function (btn) {
        const card = btn.closest('.portfolio-card');
        const likeBtn = card.querySelector('.like-btn');

        // Remove like if active
        if (likeBtn.classList.contains('active-like')) {
            likeBtn.classList.remove('active-like');
            likeBtn.querySelector('i').classList.replace('fas', 'far');
        }

        btn.classList.toggle('active-dislike');
        const icon = btn.querySelector('i');
        if (btn.classList.contains('active-dislike')) {
            icon.classList.replace('far', 'fas');
        } else {
            icon.classList.replace('fas', 'far');
        }
    };

    // Toggle Comments Section
    window.toggleComments = function (btn) {
        const card = btn.closest('.portfolio-card');
        const section = card.querySelector('.comments-section');
        if (section.style.display === 'none' || !section.style.display) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    };

    // Post a Comment
    window.postComment = function (btn) {
        const wrapper = btn.closest('.comment-input-wrapper');
        const input = wrapper.querySelector('.comment-input');
        const text = input.value.trim();
        if (!text) return;

        const commentsList = btn.closest('.comments-section').querySelector('.comments-list');
        const noComments = commentsList.querySelector('.no-comments');
        if (noComments) noComments.remove();

        const commentEl = document.createElement('div');
        commentEl.className = 'comment-item';
        commentEl.innerHTML = `
            <div class="comment-avatar"><i class="fas fa-user" style="font-size: 0.6rem;"></i></div>
            <span class="comment-text">${text}</span>
        `;
        commentsList.appendChild(commentEl);
        commentsList.scrollTop = commentsList.scrollHeight;
        input.value = '';
    };

    // Allow Enter key to submit comments
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && e.target.classList.contains('comment-input')) {
            const sendBtn = e.target.closest('.comment-input-wrapper').querySelector('.btn-send-comment');
            if (sendBtn) sendBtn.click();
        }
    });

    // Share an Image
    window.shareImage = function (imageUrl) {
        const shareData = {
            title: 'Saba Graphics - Portfolio',
            text: 'Check out this design from Saba Graphics!',
            url: imageUrl
        };

        if (navigator.share) {
            navigator.share(shareData).catch(() => { });
        } else {
            // Fallback: copy link to clipboard
            navigator.clipboard.writeText(imageUrl).then(() => {
                // Show a quick toast
                const toast = document.createElement('div');
                toast.textContent = '🔗 Link copied!';
                toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#D4AF37;color:#3E2723;padding:10px 24px;border-radius:25px;font-weight:600;z-index:9999;animation:fadeInUp 0.3s ease;';
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2000);
            }).catch(() => {
                alert('Copy this link: ' + imageUrl);
            });
        }
    };
});
