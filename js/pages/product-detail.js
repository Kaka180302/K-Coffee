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
            let badgeHtml = '';
            if (p.badge) {
                let badgeClass = 'rgba(255, 255, 255, 0.8)';
                let badgeTextClass = 'var(--primary)';
                if (p.badge === 'Bán Chạy Nhất' || p.badge === 'Mới Rang Tuần Này') {
                    badgeClass = 'var(--secondary-fixed)';
                    badgeTextClass = 'var(--on-secondary-fixed-variant)';
                }
                badgeHtml = `<span class="prod-badge-top-left font-label-sm" style="background-color: ${badgeClass}; color: ${badgeTextClass};">${p.badge}</span>`;
            }
            
            let roastColor = '#E5C39E';
            let roastTextColor = '#52331E';
            if (p.roastLevel === 'medium') { roastColor = '#8C5928'; roastTextColor = '#fff'; }
            if (p.roastLevel === 'medium-dark') { roastColor = '#52331E'; roastTextColor = '#fff'; }
            if (p.roastLevel === 'dark') { roastColor = '#2C1810'; roastTextColor = '#fff'; }

            relatedHtml += `
                <a href="product-detail.html?id=${p.id}" class="product-item group">
                    <div>
                        <div class="prod-image-container">
                            ${badgeHtml}
                            <button class="prod-fav-btn" onclick="event.preventDefault()"><span class="material-symbols-outlined text-[18px]">favorite</span></button>
                            <img class="prod-image" src="${p.image}" alt="${p.name}"/>
                        </div>
                        <div class="prod-meta font-label-sm" style="margin-top: 12px; display: flex; justify-content: space-between; align-items: center;">
                            <span class="prod-origin" style="display: flex; align-items: center; gap: 4px; color: var(--on-surface-variant);">
                                <span class="material-symbols-outlined" style="font-size: 14px;">place</span> ${p.origin}
                            </span>
                            <span class="prod-roast" style="background-color: ${roastColor}; color: ${roastTextColor}; padding: 2px 8px; border-radius: 4px;">${p.roast}</span>
                        </div>
                        <h3 class="font-title-md prod-name" style="font-weight: bold; margin-bottom: 4px; margin-top: 8px;">${p.name}</h3>
                        <p class="font-body-sm text-on-surface-variant" style="margin-bottom: 8px;">${p.subtitle}</p>
                    </div>
                    <div class="prod-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
                        <span class="font-title-md prod-price">${formatCurrency(p.price)}</span>
                        <button class="prod-add-btn font-label-md" style="padding: 8px; border-radius: 50%; background-color: var(--primary-container); color: var(--on-primary); border: none; display: flex; align-items: center; justify-content: center; transition: background-color 0.3s;" onclick="event.preventDefault(); triggerCartToast('${p.name}')">
                            <span class="material-symbols-outlined text-[18px]">shopping_cart</span>
                        </button>
                    </div>
                </a>
            `;
        });
        relatedGrid.innerHTML = relatedHtml;
    }
});
