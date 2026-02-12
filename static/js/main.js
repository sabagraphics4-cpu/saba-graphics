document.addEventListener('DOMContentLoaded', () => {
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
            const networkUrl = "http://192.168.1.15:5000";
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
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);

            // Here you would normally send data to server
            // For now, we simulate a success message

            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Sending...";

            setTimeout(() => {
                btn.innerText = "Sent Successfully!";
                btn.style.background = "#4CAF50";
                form.reset();
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = "";
                    if (modal.style.display === "block") modal.style.display = "none";
                }, 2000);
            }, 1000);
        });
    });

    // C++ Integration Test (Keyboard shortcut 'Ctrl+Shift+Z' to trigger or console usage)
    console.log("Saba Graphics System Ready. C++ Integration standing by.");

    // Example: Trigger C++ processing via fetch
    // fetch('/process_data', { method: 'POST' })
    //     .then(res => res.json())
    //     .then(data => console.log(data));
});
