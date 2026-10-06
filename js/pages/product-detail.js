document.addEventListener("DOMContentLoaded", () => {
    if (typeof products === 'undefined') return;

    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || "prod-01"; // default to prod-01 if none

    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Populate data
    document.title = `${product.name} - K-Coffee`;
    
    // Images
    const mainImg = document.querySelector('#main-product-img');
    const thumb1Img = document.querySelector('.pd-gallery-thumbs button:nth-child(1) img');
    if (mainImg) mainImg.src = product.image;
    if (thumb1Img) thumb1Img.src = product.image;

    // Badges / Tags
    const badgeCupping = document.querySelector('.pd-badge-cupping');
    if (badgeCupping && product.cuppingScore) {
        badgeCupping.innerHTML = `
            <span class="material-symbols-outlined text-secondary text-[18px]">verified</span>
            <span class="font-label-md text-primary font-bold">SCAA Cupping ${product.cuppingScore}</span>
        `;
    }

    const badgeRoast = document.querySelector('.pd-badge-roast');
    if (badgeRoast) {
        badgeRoast.textContent = product.roast;
    }

    // Top tags
    const tag1 = document.querySelector('.pd-tag-1');
    const tag2 = document.querySelector('.pd-tag-2');
    if (tag1) tag1.textContent = product.origin;
    if (tag2 && product.roastLevel) tag2.innerHTML = `<span class="pd-tag-dot"></span> Mức Rang ${product.roast}`;

    // Rating
    const ratingScore = document.getElementById('pd-rating-score');
    if (ratingScore) ratingScore.textContent = product.rating;
    const ratingCount = document.getElementById('pd-rating-count');
    if (ratingCount) ratingCount.textContent = `(${product.reviewsCount} đánh giá)`;

    // Title & Desc
    const title = document.querySelector('.pd-title');
    if (title) {
        title.innerHTML = `${product.name} <span class="font-headline-md pd-subtitle">${product.subtitle}</span>`;
    }
    const desc = document.querySelector('.pd-desc');
    if (desc) desc.textContent = product.description;

    // Price
    const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
    const priceMain = document.querySelector('#product-price');
    const priceOld = document.querySelector('#product-original-price');
    const discount = document.querySelector('.pd-price-discount');
    if (priceMain) priceMain.textContent = formatCurrency(product.price);
    if (priceOld) priceOld.textContent = formatCurrency(product.originalPrice);
    if (discount) discount.textContent = product.discount;

    // Weights
    const weightSelector = document.querySelector('.weight-selector');
    if (weightSelector && product.weights) {
        let weightHtml = '';
        product.weights.forEach((w, idx) => {
            const activeClass = idx === 0 ? 'active' : '';
            weightHtml += `
                <div class="weight-opt ${activeClass}" data-price="${w.price}" data-old="${w.oldPrice}">
                    <span class="font-label-lg weight-size">${w.weight}</span>
                    <span class="font-body-sm text-outline">${formatCurrency(w.price)}</span>
                    <span class="weight-tag font-label-sm">${w.label}</span>
                </div>
            `;
        });
        weightSelector.innerHTML = weightHtml;

        // Add event listeners for new weights
        const newOpts = weightSelector.querySelectorAll('.weight-opt');
        newOpts.forEach(opt => {
            opt.addEventListener('click', () => {
                newOpts.forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                
                // Update price
                if (priceMain) priceMain.textContent = formatCurrency(parseInt(opt.dataset.price));
                if (priceOld) priceOld.textContent = formatCurrency(parseInt(opt.dataset.old));
            });
        });
    }

    // Tasting Notes
    const notesContainer = document.querySelector('.pd-notes-list');
    if (notesContainer && product.tastingNotes) {
        let notesHtml = '';
        product.tastingNotes.forEach(note => {
            notesHtml += `<span class="pd-note font-label-md">${note}</span>`;
        });
        notesContainer.innerHTML = notesHtml;
    }

    // Attributes
    const attrsContainer = document.querySelector('.pd-spec-grid');
    if (attrsContainer && product.attributes) {
        let attrsHtml = '';
        product.attributes.forEach(attr => {
            attrsHtml += `
                <div class="pd-spec-item">
                    <span class="material-symbols-outlined text-secondary text-[24px]">${attr.icon}</span>
                    <div>
                        <span class="font-label-sm text-outline uppercase tracking-wider">${attr.label}</span>
                        <span class="font-body-md text-on-surface" style="display: block; margin-top: 2px;">${attr.value}</span>
                    </div>
                </div>
            `;
        });
        attrsContainer.innerHTML = attrsHtml;
    }

    // Related Products
    const relatedGrid = document.getElementById('related-products-grid');
    if (relatedGrid) {
        const related = products.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 3);
        let relatedHtml = '';
        related.forEach(p => {
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

            relatedHtml += `
            <a href="product-detail.html?id=${p.id}" class="product-item group">
              <div>
                <div class="prod-image-container">
                  ${badgeHtml}
                  <button class="prod-fav-btn" onclick="event.preventDefault();"><span class="material-symbols-outlined text-[18px]">favorite</span></button>
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
                <button class="prod-add-btn font-label-md" onclick="event.preventDefault();">
                  <span class="material-symbols-outlined text-[18px]">shopping_cart</span>
                  <span>Chọn Mua</span>
                </button>
              </div>
            </a>
            `;
        });
        relatedGrid.innerHTML = relatedHtml;
    }
});
