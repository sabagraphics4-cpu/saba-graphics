document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

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

    // C++ Integration Test (Keyboard shortcut 'Ctrl+Shift+Z' to trigger or console usage)
    console.log("Saba Graphics System Ready. C++ Integration standing by.");

    // Example: Trigger C++ processing via fetch
    // fetch('/process_data', { method: 'POST' })
    //     .then(res => res.json())
    //     .then(data => console.log(data));
});
