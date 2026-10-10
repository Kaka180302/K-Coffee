document.addEventListener("DOMContentLoaded", () => {
    // Chức năng 2: Slider hero tự động, có nút điều khiển thủ công.
    const slides = [
        {
            label: "Mẻ Rang Giới Hạn Tuần Này • Micro-Lot #42",
            title: "Hương Vị Cà Phê Mộc Tinh Tuyển Từ Cao Nguyên",
            description: "Hạt Arabica Cầu Đất & Robusta Buôn Ma Thuột rang mộc nguyên bản theo từng mẻ nhỏ, tôn vinh nốt hương tự nhiên của hoa quả dại, mật ong và sô-cô-la đen nồng nàn.",
            image: "https://res.cloudinary.com/lj16ppwn/image/upload/v1791594951/slide-hero-1.png", mobileImage: "https://res.cloudinary.com/lj16ppwn/image/upload/v1791594978/slider-hero-mobile-1.png"
        },
        {
            label: "Cold brew · ủ lạnh 12 giờ",
            title: "Một ngụm cà phê cho buổi chiều tỉnh táo.",
            description: "Vị ngọt tự nhiên từ hạt cà phê, cân bằng cùng chút cam vàng tươi sáng.",
            image: "https://res.cloudinary.com/lj16ppwn/image/upload/v1791594960/slide-hero-2.png", mobileImage: "https://res.cloudinary.com/lj16ppwn/image/upload/v1791595003/slider-hero-mobile-2.png"
        },
        {
            label: "Espresso · một chút đậm đà",
            title: "Kết ngày êm hơn, với một ly vừa vặn.",
            description: "Đậm hương chocolate, thoảng vị hạt dẻ và đủ ấm để bạn thư giãn.",
            image: "https://res.cloudinary.com/lj16ppwn/image/upload/v1791594955/slide-hero-3.png", mobileImage: "https://res.cloudinary.com/lj16ppwn/image/upload/v1791594980/slider-hero-mobile-3.png"
        },
        {
            label: "Cà phê rang mộc · từ Đà Lạt",
            title: "Một khoảng chậm, bắt đầu từ hạt cà phê tử tế.",
            description: "K-Coffe chọn những mẻ hạt vừa độ, giữ trọn hương thơm và pha cho những ngày bạn muốn sống chậm hơn một chút.",
            image: "https://res.cloudinary.com/lj16ppwn/image/upload/v1791594956/slide-hero-4.png", mobileImage: "https://res.cloudinary.com/lj16ppwn/image/upload/v1791594982/slider-hero-mobile-4.png"
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
            const tastingNotesHtml = p.tastingNotes ? p.tastingNotes.slice(0, 3).map(note => `<span class="prod-tasting-note">${note}</span>`).join('') : '';
            
            let badgeHtml = '';
            if (p.badge) {
                let badgeClass = "bg-secondary-fixed text-on-secondary-fixed-variant";
                if (p.badge.toLowerCase().includes("bestseller") || p.badge.toLowerCase().includes("bán chạy")) {
                    badgeClass = "bg-primary-container text-on-primary-container"; 
                }
                badgeHtml = `<span class="prod-badge-top-left ${badgeClass} font-label-sm">${p.badge}</span>`;
            }
            
            let roastColor = "var(--secondary-fixed)";
            let roastTextColor = "var(--on-secondary-fixed-variant)";
            if (p.roastLevel === "light") {
                roastColor = "var(--primary)";
                roastTextColor = "var(--on-primary)";
            } else if (p.roastLevel === "dark") {
                roastColor = "var(--surface-container-highest)";
                roastTextColor = "var(--on-surface)";
            }

            html += `
            <a href="product-detail.html?id=${p.id}" class="product-item group">
              <div>
                <div class="prod-image-container">
                  ${badgeHtml}
                  <button class="prod-fav-btn" onclick="event.preventDefault(); event.stopPropagation(); toggleFavorite('${p.id}')">
                  <span class="material-symbols-outlined text-[18px]">favorite</span></button>
                  <img class="prod-image" src="${p.image}" alt="${p.name}" onerror="this.src='https://placehold.co/800x1000/eae3d9/2c1810?text=Product+Image'"/>
                </div>
                <div class="prod-meta font-label-sm">
                  <span class="prod-origin"><span class="material-symbols-outlined" style="font-size: 14px;">location_on</span> ${p.origin}</span>
                  <span class="prod-roast" style="background-color: ${roastColor}; color: ${roastTextColor}; padding: 2px 8px; border-radius: 4px;">${p.roast}</span>
                </div>
                <h3 class="font-title-lg prod-name">${p.name}</h3>
                <div class="prod-tasting-notes font-label-sm">
                  ${tastingNotesHtml}
                </div>
              </div>
              <div class="prod-footer">
                <div>
                  <span class="font-label-sm prod-variant">${p.variant}</span>
                  <span class="font-title-lg prod-price">${formatCurrency(p.price)}</span>
                </div>
                <button class="prod-add-btn font-label-md" onclick="event.preventDefault(); event.stopPropagation(); addToCart('${p.id}')">
                  <span class="material-symbols-outlined text-[18px]">shopping_cart</span>
                  <span>Chọn Mua</span>
                </button>
              </div>
            </a>
            `;
        });
        grid.innerHTML = html;
    }
});





