document.addEventListener("DOMContentLoaded", () => {
    // Chức năng 2: Slider hero tự động, có nút điều khiển thủ công.
    const slides = [
        {
            label: "Mẻ Rang Giới Hạn Tuần Này • Micro-Lot #42",
            title: "Hương Vị Cà Phê Mộc Tinh Tuyển Từ Cao Nguyên",
            description: "Hạt Arabica Cầu Đất & Robusta Buôn Ma Thuột rang mộc nguyên bản theo từng mẻ nhỏ, tôn vinh nốt hương tự nhiên của hoa quả dại, mật ong và sô-cô-la đen nồng nàn.",
            image: "assets/img/slider/slide-hero-1.png", mobileImage: "assets/img/slider/slider-hero-mobile-1.png"
        },
        {
            label: "Cold brew · ủ lạnh 12 giờ",
            title: "Một ngụm cà phê cho buổi chiều tỉnh táo.",
            description: "Vị ngọt tự nhiên từ hạt cà phê, cân bằng cùng chút cam vàng tươi sáng.",
            image: "assets/img/slider/slide-hero-2.png", mobileImage: "assets/img/slider/slider-hero-mobile-2.png"
        },
        {
            label: "Espresso · một chút đậm đà",
            title: "Kết ngày êm hơn, với một ly vừa vặn.",
            description: "Đậm hương chocolate, thoảng vị hạt dẻ và đủ ấm để bạn thư giãn.",
            image: "assets/img/slider/slide-hero-3.png", mobileImage: "assets/img/slider/slider-hero-mobile-3.png"
        },
        {
            label: "Cà phê rang mộc · từ Đà Lạt",
            title: "Một khoảng chậm, bắt đầu từ hạt cà phê tử tế.",
            description: "K-Coffe chọn những mẻ hạt vừa độ, giữ trọn hương thơm và pha cho những ngày bạn muốn sống chậm hơn một chút.",
            image: "assets/img/slider/slide-hero-4.png", mobileImage: "assets/img/slider/slider-hero-mobile-4.png"
        }
    ];

    const heroBg = document.querySelector(".hero-bg");
    const badge = document.querySelector(".badge-outline");
    const title = document.querySelector(".hero-title");
    const description = document.querySelector(".hero-desc");
    const heroMain = document.querySelector(".hero-main");
    const dots = [...document.querySelectorAll(".slider-dots .dot")];
    let currentSlide = 0;
    let sliderTimer;

    if (heroBg) heroBg.style.transition = "opacity 0.4s ease-in-out";
    if (heroMain) heroMain.style.transition = "opacity 0.4s ease-in-out, transform 0.4s ease-in-out";

    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;
        const slide = slides[currentSlide];

        // Start fade out
        if (heroBg) heroBg.style.opacity = "0";
        if (heroMain) {
            heroMain.style.opacity = "0";
            heroMain.style.transform = "translateY(10px)";
        }

        setTimeout(() => {
            // Update content
            if (badge) {
                badge.innerHTML = `<span class="dot" style="width: 8px; height: 8px; background-color: var(--secondary); margin-right: 4px;"></span>${slide.label}`;
            }
            if (title) title.textContent = slide.title;
            if (description) description.textContent = slide.description;
            const isMobile = window.innerWidth <= 768;
            if (heroBg) heroBg.style.backgroundImage = `url('${isMobile && slide.mobileImage ? slide.mobileImage : slide.image}')`;

            // Fade in
            if (heroBg) heroBg.style.opacity = "1";
            if (heroMain) {
                heroMain.style.opacity = "1";
                heroMain.style.transform = "translateY(0)";
            }
        }, 400);

        dots.forEach((dot, dotIndex) => {
            const active = dotIndex === currentSlide;
            dot.classList.toggle("active", active);
        });
    }

    function startSlider() {
        clearInterval(sliderTimer);
        sliderTimer = setInterval(() => showSlide(currentSlide + 1), 6000);
    }

    document.querySelectorAll("[data-slider]").forEach((button) => {
        button.addEventListener("click", () => {
            showSlide(currentSlide + (button.dataset.slider === "next" ? 1 : -1));
            startSlider();
        });
    });

    dots.forEach((dot, idx) => {
        dot.addEventListener("click", () => {
            showSlide(idx);
            startSlider();
        });
    });

    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
        heroSection.addEventListener("mouseenter", () => clearInterval(sliderTimer));
        heroSection.addEventListener("mouseleave", startSlider);
    }

    startSlider();
    showSlide(0);

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const slide = slides[currentSlide];
            const isMobile = window.innerWidth <= 768;
            if (heroBg) heroBg.style.backgroundImage = `url('')`;
        }, 200);
    });

    // Chức năng 3: Các khối nội dung xuất hiện dần khi người dùng cuộn tới.
    const revealItems = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.14 });
    revealItems.forEach((item) => revealObserver.observe(item));

    // Chức năng 4: Kiểm tra email nhận ưu đãi và thông báo bằng toast.
    const newsletterForm = document.querySelector("#newsletter-form");
    const emailInput = document.querySelector("#newsletter-email");
    const message = document.querySelector("#newsletter-message");
    const toast = document.querySelector("#toast");
    let toastTimer;

    function showToast(text) {
        toast.textContent = text;
        toast.classList.add("is-visible");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3500);
    }

    if (newsletterForm) newsletterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = emailInput.value.trim();
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!validEmail) {
            message.textContent = "Nhập một địa chỉ email hợp lệ nhé.";
            message.classList.add("is-error");
            emailInput.focus();
            return;
        }
        message.textContent = "Cảm ơn bạn, K-Coffe sẽ gửi điều hay ho sớm thôi.";
        message.classList.remove("is-error");
        showToast("Đăng ký thành công — hẹn gặp bạn trong hộp thư!");
        newsletterForm.reset();
    });

    // Render best sellers
    const grid = document.getElementById('best-sellers-grid');
    if (grid && typeof products !== 'undefined') {
        const bestSellers = [...products].sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0)).slice(0, 4);
        let html = '';
        const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN').format(amount) + 'đ';

        bestSellers.forEach(p => {
            let badgesHtml = '';
            if (p.roast) {
                let badgeClass = 'badge-light';
                if (p.roastLevel === 'medium') badgeClass = 'badge-amber';
                if (p.roastLevel === 'dark' || p.roastLevel === 'medium-dark') badgeClass = 'badge-dark';
                badgesHtml += `<span class="badge ${badgeClass}">${p.roast}</span>`;
            }
            if (p.cuppingScore) {
                badgesHtml += `<span class="badge badge-green"><span class="material-symbols-outlined" style="font-size: 14px;">military_tech</span> SCAA ${p.cuppingScore}</span>`;
            }

            let tagsHtml = '';
            if (p.tastingNotes) {
                p.tastingNotes.slice(0, 3).forEach(note => {
                    tagsHtml += `<span class="badge badge-light">${note}</span>`;
                });
            }

            html += `
                <a class="glass-card product-card" href="product-detail.html?id=${p.id}">
                    <div class="prod-img-wrap">
                        <img class="prod-img" src="${p.image}" alt="${p.name}" />
                        <div class="prod-badges">
                            ${badgesHtml}
                        </div>
                        <button class="prod-fav" onclick="event.preventDefault()"><span class="material-symbols-outlined">favorite</span></button>
                    </div>
                    <div class="prod-location font-label-sm text-on-surface-variant">
                        <span class="material-symbols-outlined prod-location-icon">location_on</span>
                        ${p.origin}
                    </div>
                    <h3 class="font-title-lg prod-title" style="margin-bottom: 8px;">${p.name}</h3>
                    <div class="prod-tags">
                        ${tagsHtml}
                    </div>
                    <div class="prod-bottom">
                        <div class="prod-price-box">
                            <span class="font-label-sm prod-price-old">${formatCurrency(p.originalPrice)}</span>
                            <span class="font-title-lg prod-price-new">${formatCurrency(p.price)} <span class="font-body-sm text-on-surface-variant" style="font-weight: normal;"></span></span>
                        </div>
                        <button class="prod-add-cart" onclick="event.preventDefault(); triggerCartToast('${p.name}')"><span class="material-symbols-outlined">shopping_cart</span></button>
                    </div>
                </a>
            `;
        });
        grid.innerHTML = html;
    }
});
