document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.querySelector("#productGrid");
    const categoryList = document.querySelector("#categoryList");

    // Filter elements
    const searchInput = document.querySelector("#productSearchInput");
    const sortSelector = document.querySelector("#sortSelector");
    const priceSlider = document.querySelector("#priceRangeSlider");
    const priceDisplay = document.querySelector("#priceDisplay");
    const roastButtons = document.querySelectorAll(".roast-pill");
    const methodContainer = document.querySelector("#methodFilterContainer");
    const regionContainer = document.querySelector("#regionFilterContainer");
    const resetBtn = document.querySelector("#resetFiltersBtn");

    // Pagination elements
    const paginationInfo = document.querySelector("#paginationInfo");
    const paginationControls = document.querySelector("#paginationControls");

    const filterMethods = [
        { id: "phin", name: "Pha Phin Truyền Thống" },
        { id: "pourover", name: "Pour-Over / V60" },
        { id: "espresso", name: "Espresso Máy" },
        { id: "coldbrew", name: "Cold Brew" },
        { id: "frenchpress", name: "French Press" }
    ];

    const filterRegions = [
        { id: "caudat", name: "Cầu Đất - Đà Lạt", sub: "(1,600m)" },
        { id: "bmt", name: "Buôn Ma Thuột", sub: "(Fine Robusta)" },
        { id: "sonla", name: "Sơn La Tây Bắc", sub: "(Đặc sản)" },
        { id: "khesanh", name: "Khe Sanh - Quảng Trị", sub: "(Natural)" },
        { id: "daknong", name: "Đắk Nông", sub: "(Robusta)" },
        { id: "blend", name: "Phối Trộn Blend", sub: "(Nhiều vùng)" }
    ];

    let currentFilters = {
        category: "all",
        roast: [], // array of roastLevels
        methods: [], // array of method ids
        regions: [], // array of region ids
        maxPrice: parseInt(priceSlider ? priceSlider.value : 600000),
        search: "",
        sort: "featured" // default
    };

    let currentPage = 1;
    const itemsPerPage = 6;
    let filteredProducts = [];

    // Formatting currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
    };

    // Init Categories
    function renderCategories() {
        if (!categoryList) return;
        let html = `
            <label class="filter-radio-item">
                <span class="label font-body-sm" style="font-weight: 500; display: flex; align-items: center;">
                    <input type="radio" name="cat" value="all" checked/> Tất Cả Sản Phẩm
                </span>
                <span class="count">${products.length}</span>
            </label>
        `;
        categories.forEach(cat => {
            const count = products.filter(p => p.categoryId === cat.id).length;
            html += `
                <label class="filter-radio-item">
                    <span class="label font-body-sm" style="display: flex; align-items: center;">
                        <input type="radio" name="cat" value="${cat.id}"/> ${cat.name}
                    </span>
                    <span class="count">${count}</span>
                </label>
            `;
        });
        categoryList.innerHTML = html;

        const radios = categoryList.querySelectorAll('input[name="cat"]');
        radios.forEach(radio => {
            radio.addEventListener("change", (e) => {
                currentFilters.category = e.target.value;
                applyFilters();
            });
        });
    }

    // Init Methods
    function renderMethods() {
        if (!methodContainer) return;
        let html = '';
        filterMethods.forEach(method => {
            html += `<span class="method-tag" data-id="${method.id}">${method.name}</span>`;
        });
        methodContainer.innerHTML = html;

        const methodTags = methodContainer.querySelectorAll('.method-tag');
        methodTags.forEach(tag => {
            tag.addEventListener("click", () => {
                tag.classList.toggle("active");
                currentFilters.methods = Array.from(methodContainer.querySelectorAll('.method-tag.active')).map(t => t.dataset.id);
                applyFilters();
            });
        });
    }

    // Init Regions
    function renderRegions() {
        if (!regionContainer) return;
        let html = '';
        filterRegions.forEach(region => {
            html += `
                <label class="checkbox-item">
                    <input type="checkbox" value="${region.id}" /> 
                    ${region.name} <span class="text-outline text-xs">${region.sub}</span>
                </label>
            `;
        });
        regionContainer.innerHTML = html;

        const regionBoxes = regionContainer.querySelectorAll('input[type="checkbox"]');
        regionBoxes.forEach(box => {
            box.addEventListener("change", () => {
                currentFilters.regions = Array.from(regionContainer.querySelectorAll('input[type="checkbox"]:checked')).map(b => b.value);
                applyFilters();
            });
        });
    }

    // Roast Level Filtering
    roastButtons.forEach(btn => {
        // Clear initial active states to show all by default
        btn.classList.remove("active");

        btn.addEventListener("click", (e) => {
            e.preventDefault();
            btn.classList.toggle("active");

            // Rebuild roast filter array
            currentFilters.roast = [];
            roastButtons.forEach((b, index) => {
                if (b.classList.contains("active")) {
                    const levels = ["light", "medium", "medium-dark", "dark"];
                    currentFilters.roast.push(levels[index]);
                }
            });
            applyFilters();
        });
    });

    // Price Slider
    if (priceSlider) {
        priceSlider.addEventListener("input", (e) => {
            const val = parseInt(e.target.value);
            priceDisplay.textContent = `80.000đ - ${formatCurrency(val)}`;
            currentFilters.maxPrice = val;
            applyFilters();
        });
    }

    // Search
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            currentFilters.search = e.target.value.toLowerCase().trim();
            applyFilters();
        });
    }

    const searchBtn = document.querySelector("#productSearchBtn");
    if (searchBtn && searchInput) {
        searchBtn.addEventListener("click", () => {
            currentFilters.search = searchInput.value.toLowerCase().trim();
            applyFilters();
        });
    }

    // Mobile Filter Drawer
    const mobileFilterBtn = document.querySelector("#mobileFilterBtn");
    const mobileFilterCloseBtn = document.querySelector("#mobileFilterCloseBtn");
    const filterSidebar = document.querySelector("#filterSidebar");

    if (mobileFilterBtn && filterSidebar) {
        mobileFilterBtn.addEventListener("click", () => {
            filterSidebar.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent background scrolling
        });
    }

    if (mobileFilterCloseBtn && filterSidebar) {
        mobileFilterCloseBtn.addEventListener("click", () => {
            filterSidebar.classList.remove("active");
            document.body.style.overflow = "";
        });
    }

    // Sort
    if (sortSelector) {
        sortSelector.addEventListener("change", (e) => {
            currentFilters.sort = e.target.value;
            applyFilters();
        });
    }

    // Reset Button
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            currentFilters = {
                category: "all",
                roast: [],
                methods: [],
                regions: [],
                maxPrice: 600000,
                search: "",
                sort: "featured"
            };

            // Reset UI
            categoryList.querySelector('input[value="all"]').checked = true;
            roastButtons.forEach(b => b.classList.remove("active"));

            if (methodContainer) {
                methodContainer.querySelectorAll('.method-tag').forEach(t => t.classList.remove('active'));
            }
            if (regionContainer) {
                regionContainer.querySelectorAll('input[type="checkbox"]').forEach(b => b.checked = false);
            }

            if (priceSlider) {
                priceSlider.value = 600000;
                priceDisplay.textContent = `80.000đ - 600.000đ`;
            }
            if (searchInput) searchInput.value = "";
            if (sortSelector) sortSelector.value = "featured";

            applyFilters();
        });
    }

    function applyFilters() {
        currentPage = 1; // reset to first page when filter changes

        filteredProducts = products.filter(p => {
            // Category
            if (currentFilters.category !== "all" && p.categoryId !== currentFilters.category) return false;

            // Roast
            if (currentFilters.roast.length > 0 && !currentFilters.roast.includes(p.roastLevel)) return false;

            // Methods - Product must have AT LEAST ONE of the selected methods
            if (currentFilters.methods.length > 0) {
                if (!p.methods || !p.methods.some(m => currentFilters.methods.includes(m))) return false;
            }

            // Regions
            if (currentFilters.regions.length > 0 && !currentFilters.regions.includes(p.region)) return false;

            // Price
            if (p.price > currentFilters.maxPrice) return false;

            // Search
            if (currentFilters.search) {
                const searchStr = currentFilters.search;
                const matchName = p.name.toLowerCase().includes(searchStr);
                const matchOrigin = p.origin.toLowerCase().includes(searchStr);
                const matchNotes = p.tastingNotes.some(note => note.toLowerCase().includes(searchStr));
                if (!matchName && !matchOrigin && !matchNotes) return false;
            }

            return true;
        });

        // Sorting
        filteredProducts.sort((a, b) => {
            switch (currentFilters.sort) {
                case "featured":
                    return b.salesCount - a.salesCount;
                case "newest":
                    return new Date(b.dateAdded) - new Date(a.dateAdded);
                case "cupping":
                    return b.cuppingScore - a.cuppingScore;
                case "price-asc":
                    return a.price - b.price;
                case "price-desc":
                    return b.price - a.price;
                default:
                    return 0;
            }
        });

        renderPage();
    }

    function renderPage() {
        if (!productGrid) return;

        if (filteredProducts.length === 0) {
            productGrid.innerHTML = `<div class="font-body-md" style="grid-column: 1/-1; text-align: center; padding: 2rem;">Không tìm thấy sản phẩm nào phù hợp.</div>`;
            updateCount(0);
            renderPagination(0, 0);
            return;
        }

        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        if (currentPage > totalPages) currentPage = totalPages;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageProducts = filteredProducts.slice(startIndex, endIndex);

        let html = '';
        pageProducts.forEach(prod => {
            const tastingNotesHtml = prod.tastingNotes.map(note => `<span class="prod-tasting-note">${note}</span>`).join('');

            let badgeHtml = '';
            if (prod.badge) {
                let badgeClass = "bg-secondary-fixed text-on-secondary-fixed-variant";
                if (prod.badge.toLowerCase().includes("bestseller") || prod.badge.toLowerCase().includes("bán chạy")) {
                    badgeClass = "bg-primary-container text-on-primary-container";
                }
                badgeHtml = `<span class="prod-badge-top-left ${badgeClass} font-label-sm">${prod.badge}</span>`;
            }

            let roastColor = "var(--secondary-fixed)";
            let roastTextColor = "var(--on-secondary-fixed-variant)";
            if (prod.roastLevel === "light") {
                roastColor = "var(--primary)";
                roastTextColor = "var(--on-primary)";
            } else if (prod.roastLevel === "dark") {
                roastColor = "var(--surface-container-highest)";
                roastTextColor = "var(--on-surface)";
            }

            html += `
            <a href="product-detail.html?id=${prod.id}" class="product-item group">
              <div>
                <div class="prod-image-container">
                  ${badgeHtml}
                  <button class="prod-fav-btn" onclick="event.preventDefault(); event.stopPropagation(); toggleFavorite('${prod.id}')">
                  <span class="material-symbols-outlined text-[18px]">favorite</span></button>
                  <img class="prod-image" src="${prod.image}" alt="${prod.name}" onerror="this.src='https://placehold.co/800x1000/eae3d9/2c1810?text=Product+Image'"/>
                </div>
                <div class="prod-meta font-label-sm">
                  <span class="prod-origin"><span class="material-symbols-outlined" style="font-size: 14px;">location_on</span> ${prod.origin}</span>
                  <span class="prod-roast" style="background-color: ${roastColor}; color: ${roastTextColor}; padding: 2px 8px; border-radius: 4px;">${prod.roast}</span>
                </div>
                <h3 class="font-title-lg prod-name">${prod.name}</h3>
                <div class="prod-tasting-notes font-label-sm">
                  ${tastingNotesHtml}
                </div>
              </div>
              <div class="prod-footer">
                <div>
                  <span class="font-label-sm prod-variant">${prod.variant}</span>
                  <span class="font-title-lg prod-price">${formatCurrency(prod.price)}</span>
                </div>
                <button class="prod-add-btn font-label-md" onclick="event.preventDefault(); event.stopPropagation(); addToCart('${prod.id}')">
                  <span class="material-symbols-outlined text-[18px]">shopping_cart</span>
                  <span>Chọn Mua</span>
                </button>
              </div>
            </a>
            `;
        });

        productGrid.innerHTML = html;
        updateCount(filteredProducts.length);
        renderPagination(totalPages, currentPage);

        // Scroll to top of grid smoothly when page changes
        if (window.scrollY > productGrid.offsetTop - 100) {
            window.scrollTo({ top: productGrid.offsetTop - 100, behavior: 'smooth' });
        }
    }

    function renderPagination(totalPages, current) {
        if (!paginationInfo || !paginationControls) return;

        if (totalPages <= 1) {
            paginationInfo.innerHTML = `Trang <span class="font-bold text-primary">1</span> trong tổng số 1 trang`;
            paginationControls.innerHTML = '';
            return;
        }

        paginationInfo.innerHTML = `Trang <span class="font-bold text-primary">${current}</span> trong tổng số ${totalPages} trang`;

        let html = '';

        // Prev button
        html += `<button class="page-btn ${current === 1 ? 'disabled' : 'normal'}" data-page="${current - 1}"><span class="material-symbols-outlined">chevron_left</span></button>`;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            html += `<button class="page-btn ${i === current ? 'active' : 'normal'} font-label-md" data-page="${i}">${i}</button>`;
        }

        // Next button
        html += `<button class="page-btn ${current === totalPages ? 'disabled' : 'normal'} next" data-page="${current + 1}"><span class="material-symbols-outlined">chevron_right</span></button>`;

        paginationControls.innerHTML = html;

        // Add events
        paginationControls.querySelectorAll('.page-btn:not(.disabled)').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = parseInt(btn.dataset.page);
                if (page > 0 && page <= totalPages) {
                    currentPage = page;
                    renderPage();
                }
            });
        });
    }

    function updateCount(totalFiltered) {
        const countDisplay = document.querySelector('.toolbar-controls .font-body-sm');
        if (countDisplay) {
            countDisplay.innerHTML = `Hiển thị&nbsp;<span class="text-primary" style="font-weight: bold;">${Math.min((currentPage - 1) * itemsPerPage + 1, totalFiltered)}</span>&nbsp;–&nbsp;<span class="text-primary" style="font-weight: bold;">${Math.min(currentPage * itemsPerPage, totalFiltered)}</span>&nbsp;trên&nbsp;<span class="text-primary" style="font-weight: bold;">${totalFiltered}</span>&nbsp;sản phẩm`;
        }

        const mobileFilterSubmitBtn = document.querySelector("#mobileFilterSubmitBtn");
        if (mobileFilterSubmitBtn) {
            mobileFilterSubmitBtn.textContent = `Xem ${totalFiltered} Sản Phẩm`;
        }
    }

    const mobileFilterSubmitBtn = document.querySelector("#mobileFilterSubmitBtn");
    if (mobileFilterSubmitBtn) {
        mobileFilterSubmitBtn.addEventListener("click", () => {
            if (filterSidebar) filterSidebar.classList.remove("active");
            document.body.style.overflow = "";
        });
    }

    // Initialize
    if (typeof products !== 'undefined' && typeof categories !== 'undefined') {
        renderCategories();
        renderMethods();
        renderRegions();
        applyFilters(); // This will trigger initial render and pagination
    }
});






