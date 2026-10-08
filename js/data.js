const categories = [
  { id: "arabica", name: "Arabica Nguyên Bản" },
  { id: "robusta", name: "Robusta Đậm Đà" },
  { id: "blend", name: "Phối Trộn (Blend)" },
  { id: "coldbrew", name: "Cà Phê Ủ Lạnh (Cold Brew)" },
  { id: "specialty", name: "Cà Phê Đặc Sản" }
];

const _weights = (basePrice) => [
  { weight: "250g", price: basePrice, oldPrice: Math.round(basePrice * 1.15), label: "Thử nếm chuẩn" },
  { weight: "500g", price: basePrice * 1.9, oldPrice: Math.round(basePrice * 1.9 * 1.15), label: "Tiết kiệm 20.000đ" },
  { weight: "1000g (1kg)", price: basePrice * 3.7, oldPrice: Math.round(basePrice * 3.7 * 1.15), label: "Tiết kiệm lớn" }
];

const products = [
  {
    id: "prod-01", categoryId: "arabica", name: "Arabica Cầu Đất Chế Biến Ướt", slug: "arabica-cau-dat-che-bien-uot",
    subtitle: "Washed Process (Catimor & Typica)",
    image: "assets/img/products/arabica-cau-dat-che-bien-uot.png", badge: "Bán Chạy Nhất", origin: "Cầu Đất", roast: "Rang Nhạt",
    roastLevel: "light", salesCount: 1540, dateAdded: "2023-10-01", cuppingScore: 84.5,
    methods: ["pourover", "frenchpress"], region: "caudat",
    tastingNotes: ["Hoa Cà Phê", "Mật Ong", "Chanh Vàng"], variant: "Túi Zip van 1 chiều (250g)", price: 220000, originalPrice: 253000, discount: "-13%",
    rating: 4.9, reviewsCount: 128,
    description: "Được tuyển hái thủ công từ đồi chè Cầu Đất ở cao độ 1.650m. Quy trình chế biến ướt làm bừng sáng nốt hương quả mọng hoang dã và hậu vị mật ong tinh tế.",
    attributes: [{ icon: "terrain", label: "Độ cao", value: "1.650m" }, { icon: "eco", label: "Giống hạt", value: "Catimor, Typica" }, { icon: "water_drop", label: "Độ ẩm", value: "11.5%" }],
    weights: _weights(220000)
  },
  {
    id: "prod-02", categoryId: "robusta", name: "Fine Robusta Honey Lên Men Tự Nhiên", slug: "fine-robusta-honey",
    subtitle: "Honey Process (TR4 & Sinh Dữ)",
    image: "assets/img/products/fine-robusta-honey.png", badge: "Mới Rang Tuần Này", origin: "Buôn Ma Thuột", roast: "Rang Đậm Vừa",
    roastLevel: "medium-dark", salesCount: 890, dateAdded: "2023-10-25", cuppingScore: 82.0,
    methods: ["phin", "espresso"], region: "bmt",
    tastingNotes: ["Chocolate Đen", "Hạt Phỉ", "Khói Ngọt"], variant: "Đóng gói hạt mộc (250g)", price: 185000, originalPrice: 210000, discount: "-12%",
    rating: 4.8, reviewsCount: 204,
    description: "Quy trình phơi giàn giữ lại lớp thịt quả ngọt thanh, mang lại nốt hương bừng sáng của quả mọng hoang dã hòa quyện mật ong hoa rừng và hậu vị ngọt đậm như socola đen nguyên bản.",
    attributes: [{ icon: "terrain", label: "Độ cao", value: "800m" }, { icon: "eco", label: "Giống hạt", value: "TR4" }, { icon: "water_drop", label: "Độ ẩm", value: "12.0%" }],
    weights: _weights(185000)
  },
  {
    id: "prod-03", categoryId: "arabica", name: "Arabica Khe Sanh Natural", slug: "arabica-khe-sanh-natural",
    subtitle: "Natural Process",
    image: "assets/img/products/arabica-khe-sanh-natural.png", badge: null, origin: "Khe Sanh", roast: "Rang Nhạt",
    roastLevel: "light", salesCount: 420, dateAdded: "2023-09-15", cuppingScore: 83.5,
    methods: ["pourover", "coldbrew"], region: "khesanh",
    tastingNotes: ["Mít Sấy", "Rượu Vang", "Cacao"], variant: "Túi Zip van 1 chiều (250g)", price: 250000, originalPrice: 285000, discount: "-12%",
    rating: 4.7, reviewsCount: 95,
    description: "Khí hậu khắc nghiệt vùng Quảng Trị tạo ra hạt Arabica có sức sống mãnh liệt. Chế biến khô mang lại body đầy đặn, hương mít sấy đặc trưng và chút chua nhẹ của rượu vang.",
    attributes: [{ icon: "terrain", label: "Độ cao", value: "1.200m" }, { icon: "eco", label: "Giống hạt", value: "Catimor" }, { icon: "water_drop", label: "Độ ẩm", value: "11.8%" }],
    weights: _weights(250000)
  },
  {
    id: "prod-04", categoryId: "blend", name: "Espresso Blend 7/3", slug: "espresso-blend-7-3",
    subtitle: "70% Arabica Cầu Đất - 30% Robusta Đắk Lắk",
    image: "assets/img/products/espresso-blend-7-3.png", badge: "Lựa Chọn Barista", origin: "Cầu Đất & Đắk Lắk", roast: "Rang Đậm",
    roastLevel: "dark", salesCount: 2150, dateAdded: "2023-05-20", cuppingScore: 80.0,
    methods: ["espresso", "phin"], region: "blend",
    tastingNotes: ["Caramel", "Cacao Đậm", "Đậm Thể"], variant: "Túi Zip van 1 chiều (250g)", price: 195000, originalPrice: 220000, discount: "-11%",
    rating: 5.0, reviewsCount: 412,
    description: "Tỷ lệ vàng cho những tín đồ Espresso. Sự kết hợp hoàn hảo giữa độ chua thanh nhẹ của Arabica và thể chất dày dặn, lớp crema sánh mịn của Robusta.",
    attributes: [{ icon: "terrain", label: "Độ cao", value: "800 - 1.600m" }, { icon: "eco", label: "Giống hạt", value: "Blend" }, { icon: "water_drop", label: "Độ ẩm", value: "11.0%" }],
    weights: _weights(195000)
  },
  {
    id: "prod-05", categoryId: "coldbrew", name: "Cold Brew Blend Mùa Hè", slug: "cold-brew-blend-mua-he",
    subtitle: "100% Arabica Light Roast",
    image: "assets/img/products/cold-brew-blend-mua-he.png", badge: "Phiên Bản Mùa Hè", origin: "Lâm Đồng", roast: "Rang Nhạt",
    roastLevel: "light", salesCount: 950, dateAdded: "2023-10-10", cuppingScore: 83.0,
    methods: ["coldbrew", "pourover"], region: "caudat",
    tastingNotes: ["Cam Chanh", "Trà Đen", "Đường Nâu"], variant: "Túi Zip van 1 chiều (250g)", price: 210000, originalPrice: 240000, discount: "-12%",
    rating: 4.9, reviewsCount: 156,
    description: "Được rang riêng biệt với profile Light Roast, hạt cà phê nở rộ hương hoa trái tươi mát khi ngâm lạnh trên 12 giờ, giải nhiệt hoàn hảo cho ngày hè.",
    attributes: [{ icon: "terrain", label: "Độ cao", value: "1.500m" }, { icon: "eco", label: "Giống hạt", value: "Bourbon, Typica" }, { icon: "water_drop", label: "Độ ẩm", value: "11.2%" }],
    weights: _weights(210000)
  },
  {
    id: "prod-06", categoryId: "robusta", name: "Robusta Đắk Nông Chế Biến Khô", slug: "robusta-dak-nong-che-bien-kho",
    subtitle: "Natural Process",
    image: "assets/img/products/robusta-dak-nong-che-bien-kho.png", badge: null, origin: "Đắk Nông", roast: "Rang Đậm",
    roastLevel: "dark", salesCount: 530, dateAdded: "2023-08-11", cuppingScore: 78.5,
    methods: ["phin"], region: "daknong",
    tastingNotes: ["Gỗ Sồi", "Bơ Đậu Phộng", "Đậm Đà"], variant: "Túi Zip van 1 chiều (250g)", price: 160000, originalPrice: 185000, discount: "-13%",
    rating: 4.6, reviewsCount: 88,
    description: "Cà phê mộc truyền thống với hương vị gỗ sồi và bơ đậu phộng. Rất hợp pha phin truyền thống cho buổi sáng cần sự tỉnh táo mạnh mẽ.",
    attributes: [{ icon: "terrain", label: "Độ cao", value: "700m" }, { icon: "eco", label: "Giống hạt", value: "Robusta" }, { icon: "water_drop", label: "Độ ẩm", value: "12.5%" }],
    weights: _weights(160000)
  },
  {
    id: "prod-07", categoryId: "arabica", name: "Arabica Lạc Dương Washed", slug: "arabica-lac-duong-washed",
    subtitle: "Washed Process",
    image: "assets/img/products/arabica-lac-duong-washed.png", badge: null, origin: "Lạc Dương", roast: "Rang Nhạt",
    roastLevel: "light", salesCount: 610, dateAdded: "2023-09-22", cuppingScore: 84.0,
    methods: ["pourover", "frenchpress"], region: "caudat",
    tastingNotes: ["Trà Oolong", "Vỏ Cam", "Mật Hoa"], variant: "Túi Zip van 1 chiều (250g)", price: 230000, originalPrice: 265000, discount: "-13%",
    rating: 4.8, reviewsCount: 112,
    description: "Được trồng dưới tán rừng thông nguyên sinh Lạc Dương, cà phê mang đậm hương vị thảo mộc thiên nhiên, thanh khiết như một tách trà Oolong sớm mai.",
    attributes: [{ icon: "terrain", label: "Độ cao", value: "1.700m" }, { icon: "eco", label: "Giống hạt", value: "Catimor" }, { icon: "water_drop", label: "Độ ẩm", value: "11.1%" }],
    weights: _weights(230000)
  },
  {
    id: "prod-08", categoryId: "blend", name: "Phối Trộn Truyền Thống Phin", slug: "phoi-tron-truyen-thong-phin",
    subtitle: "80% Robusta - 20% Arabica",
    image: "assets/img/products/phoi-tron-truyen-thong-phin.png", badge: "Bán Chạy Nhất", origin: "Đắk Lắk & Lâm Đồng", roast: "Rang Đậm Vừa",
    roastLevel: "medium-dark", salesCount: 3200, dateAdded: "2022-12-01", cuppingScore: 79.5,
    methods: ["phin"], region: "blend",
    tastingNotes: ["Đậm Đà", "Hậu Ngọt", "Cacao"], variant: "Túi Zip van 1 chiều (250g)", price: 175000, originalPrice: 200000, discount: "-12%",
    rating: 4.9, reviewsCount: 520,
    description: "Công thức tối ưu cho ly cà phê phin đúng điệu của người Việt. Đắng êm, thể chất sánh đặc và hậu vị ngọt sâu ở cuống họng.",
    attributes: [{ icon: "terrain", label: "Độ cao", value: "Vary" }, { icon: "eco", label: "Giống hạt", value: "Blend" }, { icon: "water_drop", label: "Độ ẩm", value: "11.8%" }],
    weights: _weights(175000)
  },
  {
    id: "prod-09", categoryId: "specialty", name: "Special Reserve Peaberry", slug: "special-reserve-peaberry",
    subtitle: "Cà Phê Culi (Peaberry) Nguyên Bản",
    image: "assets/img/products/special-reserve-peaberry.png", badge: "Giới Hạn", origin: "Cầu Đất", roast: "Rang Nhạt",
    roastLevel: "light", salesCount: 150, dateAdded: "2023-11-01", cuppingScore: 86.5,
    methods: ["pourover"], region: "caudat",
    tastingNotes: ["Quả Mọng", "Dâu Tây", "Rượu Vang"], variant: "Túi Zip van 1 chiều (250g)", price: 350000, originalPrice: 395000, discount: "-11%",
    rating: 5.0, reviewsCount: 45,
    description: "Những hạt cà phê đột biến chỉ có 1 nhân duy nhất (Peaberry), tích tụ toàn bộ dưỡng chất của trái. Cực hiếm (chỉ 5% sản lượng) với hương vị bùng nổ.",
    attributes: [{ icon: "terrain", label: "Độ cao", value: "1.650m" }, { icon: "eco", label: "Giống hạt", value: "Peaberry (Culi)" }, { icon: "water_drop", label: "Độ ẩm", value: "10.5%" }],
    weights: _weights(350000)
  },
  {
    id: "prod-10", categoryId: "robusta", name: "Robusta Di Linh Chế Biến Mật Ong", slug: "robusta-di-linh-che-bien-mat-ong",
    subtitle: "Honey Process",
    image: "assets/img/products/robusta-di-linh-che-bien-mat-ong.png", badge: null, origin: "Di Linh", roast: "Rang Vừa",
    roastLevel: "medium", salesCount: 670, dateAdded: "2023-04-14", cuppingScore: 81.0,
    methods: ["phin", "espresso"], region: "daknong",
    tastingNotes: ["Đường Nâu", "Mật Ong", "Táo Nướng"], variant: "Túi Zip van 1 chiều (250g)", price: 180000, originalPrice: 205000, discount: "-12%",
    rating: 4.7, reviewsCount: 167,
    description: "Phương pháp mật ong làm dịu đi vị đắng gắt của Robusta, thay vào đó là sự cân bằng tuyệt vời cùng hương táo nướng thoang thoảng.",
    attributes: [{ icon: "terrain", label: "Độ cao", value: "1.000m" }, { icon: "eco", label: "Giống hạt", value: "Robusta TR4" }, { icon: "water_drop", label: "Độ ẩm", value: "11.6%" }],
    weights: _weights(180000)
  },
  {
    id: "prod-11", categoryId: "specialty", name: "Arabica Sơn La Đặc Sản", slug: "arabica-son-la-dac-san",
    subtitle: "Washed Process - Tây Bắc",
    image: "assets/img/products/arabica-son-la-dac-san.png", badge: "Mới Nhất", origin: "Sơn La", roast: "Rang Nhạt",
    roastLevel: "light", salesCount: 210, dateAdded: "2023-11-05", cuppingScore: 85.0,
    methods: ["pourover", "coldbrew"], region: "sonla",
    tastingNotes: ["Táo Xanh", "Trà Đen", "Mật Ong"], variant: "Túi Zip van 1 chiều (250g)", price: 260000, originalPrice: 295000, discount: "-12%",
    rating: 4.8, reviewsCount: 78,
    description: "Trồng tại vùng núi cao Tây Bắc với biên độ nhiệt lớn, hạt cà phê Sơn La có độ chua sáng tuyệt đẹp của táo xanh, phảng phất hương trà đen quý phái.",
    attributes: [{ icon: "terrain", label: "Độ cao", value: "1.100m" }, { icon: "eco", label: "Giống hạt", value: "Catimor" }, { icon: "water_drop", label: "Độ ẩm", value: "11.3%" }],
    weights: _weights(260000)
  },
  {
    id: "prod-12", categoryId: "blend", name: "Espresso Cổ Điển", slug: "espresso-co-dien",
    subtitle: "50% Arabica - 50% Robusta",
    image: "assets/img/products/espresso-co-dien.png", badge: null, origin: "Buôn Ma Thuột & Cầu Đất", roast: "Rang Vừa",
    roastLevel: "medium", salesCount: 1450, dateAdded: "2023-01-10", cuppingScore: 80.5,
    methods: ["espresso", "frenchpress"], region: "blend",
    tastingNotes: ["Sô Cô La", "Kẹo Toffee", "Dày Dặn"], variant: "Túi Zip van 1 chiều (250g)", price: 190000, originalPrice: 215000, discount: "-11%",
    rating: 4.8, reviewsCount: 231,
    description: "Sự kết hợp cân bằng hoàn hảo 5-5 giữa hai loại hạt, tạo nên ly Espresso ổn định, ngậy béo hương sô cô la và vô cùng phù hợp khi pha chế cùng sữa tươi.",
    attributes: [{ icon: "terrain", label: "Độ cao", value: "Vary" }, { icon: "eco", label: "Giống hạt", value: "Blend" }, { icon: "water_drop", label: "Độ ẩm", value: "11.5%" }],
    weights: _weights(190000)
  },
  {
    id: "prod-13", categoryId: "specialty", name: "Moka Cầu Đất Nguyên Bản", slug: "moka-cau-dat-nguyen-ban",
    subtitle: "Bảo Tồn Giống Cổ",
    image: "assets/img/products/moka-cau-dat-nguyen-ban.png", badge: "Huyền Thoại", origin: "Cầu Đất", roast: "Rang Nhạt",
    roastLevel: "light", salesCount: 90, dateAdded: "2023-11-10", cuppingScore: 87.0,
    methods: ["pourover"], region: "caudat",
    tastingNotes: ["Hoa Trắng", "Đào Cơm", "Thanh Tao"], variant: "Túi Zip van 1 chiều (250g)", price: 450000, originalPrice: 510000, discount: "-11%",
    rating: 5.0, reviewsCount: 32,
    description: "Giống Moka (Bourbon) nguyên bản quý hiếm từ thời Pháp thuộc được phục tráng. Thể chất thanh mượt, ngập tràn hương hoa trắng và trái cây mọng nước.",
    attributes: [{ icon: "terrain", label: "Độ cao", value: "1.650m" }, { icon: "eco", label: "Giống hạt", value: "Moka (Bourbon)" }, { icon: "water_drop", label: "Độ ẩm", value: "10.8%" }],
    weights: _weights(450000)
  },
  {
    id: "prod-14", categoryId: "coldbrew", name: "Túi Lọc Cold Brew Tiện Lợi", slug: "tui-loc-cold-brew-tien-loi",
    subtitle: "Dạng túi lọc túi 30g",
    image: "assets/img/products/tui-loc-cold-brew-tien-loi.png", badge: "Bán Chạy Nhất", origin: "Cầu Đất & Buôn Ma Thuột", roast: "Rang Vừa",
    roastLevel: "medium", salesCount: 2300, dateAdded: "2023-06-05", cuppingScore: 81.5,
    methods: ["coldbrew"], region: "blend",
    tastingNotes: ["Ngọt Thanh", "Trái Cây Đỏ", "Mượt"], variant: "Hộp 10 túi lọc", price: 150000, originalPrice: 175000, discount: "-14%",
    rating: 4.9, reviewsCount: 423,
    description: "Giải pháp ủ lạnh tại nhà dễ dàng nhất. Chỉ cần thả túi lọc vào bình nước lạnh và đợi 12-16 tiếng là có ngay bình Cold Brew tươi mát.",
    attributes: [{ icon: "terrain", label: "Độ cao", value: "Vary" }, { icon: "eco", label: "Giống hạt", value: "Blend" }, { icon: "water_drop", label: "Độ ẩm", value: "11.2%" }],
    weights: [
      { weight: "Hộp 10 túi (300g)", price: 150000, oldPrice: 175000, label: "Trải nghiệm" },
      { weight: "Hộp 25 túi (750g)", price: 350000, oldPrice: 400000, label: "Tiết kiệm lớn" }
    ]
  },
  {
    id: "prod-15", categoryId: "specialty", name: "Decaf Colombia Tách Caffeine", slug: "decaf-colombia-tach-caffeine",
    subtitle: "Sugar Cane Process",
    image: "assets/img/products/decaf-colombia-tach-caffeine.png", badge: "Nhập Khẩu", origin: "Colombia", roast: "Rang Vừa",
    roastLevel: "medium", salesCount: 180, dateAdded: "2023-08-20", cuppingScore: 84.0,
    methods: ["pourover", "espresso", "phin"], region: "blend",
    tastingNotes: ["Hạnh Nhân", "Đường Nâu", "Tròn Trịa"], variant: "Túi Zip van 1 chiều (250g)", price: 380000, originalPrice: 430000, discount: "-11%",
    rating: 4.8, reviewsCount: 64,
    description: "Tách caffeine tự nhiên 99.9% bằng chiết xuất mía đường, đảm bảo an toàn tuyệt đối nhưng vẫn giữ trọn vẹn hương vị hạnh nhân thơm béo.",
    attributes: [{ icon: "terrain", label: "Độ cao", value: "1.800m" }, { icon: "eco", label: "Giống hạt", value: "Castillo" }, { icon: "water_drop", label: "Độ ẩm", value: "10.9%" }],
    weights: _weights(380000)
  },
  {
    id: "prod-16", categoryId: "arabica", name: "Arabica Mường Ảng Điện Biên", slug: "arabica-muong-ang-dien-bien",
    subtitle: "Washed Process",
    image: "assets/img/products/arabica-muong-ang-dien-bien.png", badge: null, origin: "Điện Biên", roast: "Rang Nhạt",
    roastLevel: "light", salesCount: 340, dateAdded: "2023-10-15", cuppingScore: 83.5,
    methods: ["pourover"], region: "sonla",
    tastingNotes: ["Thảo Mộc", "Trà Đen", "Cam Ngọt"], variant: "Túi Zip van 1 chiều (250g)", price: 240000, originalPrice: 275000, discount: "-12%",
    rating: 4.7, reviewsCount: 45,
    description: "Cà phê cực kì độc đáo từ Điện Biên, thừa hưởng sương mù quanh năm tạo nên hương trà đen đậm đặc và hậu vị ngọt của kẹo cam.",
    attributes: [{ icon: "terrain", label: "Độ cao", value: "900 - 1.200m" }, { icon: "eco", label: "Giống hạt", value: "Catimor" }, { icon: "water_drop", label: "Độ ẩm", value: "11.6%" }],
    weights: _weights(240000)
  },
  {
    id: "prod-17", categoryId: "blend", name: "Blend Vị Choc Hạnh Nhân", slug: "blend-vi-choc-hanh-nhan",
    subtitle: "Special Nutty Blend",
    image: "assets/img/products/blend-vi-choc-hanh-nhan.png", badge: null, origin: "Brazil & Việt Nam", roast: "Rang Vừa",
    roastLevel: "medium", salesCount: 890, dateAdded: "2023-07-22", cuppingScore: 82.0,
    methods: ["espresso", "phin"], region: "blend",
    tastingNotes: ["Hạnh Nhân", "Sô Cô La Sữa", "Mượt Mà"], variant: "Túi Zip van 1 chiều (250g)", price: 210000, originalPrice: 240000, discount: "-12%",
    rating: 4.9, reviewsCount: 288,
    description: "Hạt Arabica Brazil béo ngậy được điểm xuyết bởi sức mạnh của Robusta Việt, tạo ra tách latte mượt mà như nhung.",
    attributes: [{ icon: "terrain", label: "Độ cao", value: "Vary" }, { icon: "eco", label: "Giống hạt", value: "Catuai & TR4" }, { icon: "water_drop", label: "Độ ẩm", value: "11.2%" }],
    weights: _weights(210000)
  },
  {
    id: "prod-18", categoryId: "specialty", name: "Robusta Lên Men Trái Cây", slug: "robusta-len-men-trai-cay",
    subtitle: "Fruity Fermentation Process",
    image: "assets/img/products/robusta-len-men-trai-cay.png", badge: "Mới Nhất", origin: "Đắk Lắk", roast: "Rang Vừa",
    roastLevel: "medium", salesCount: 410, dateAdded: "2023-11-20", cuppingScore: 83.5,
    methods: ["pourover", "frenchpress", "phin"], region: "bmt",
    tastingNotes: ["Chuối Sấy", "Trái Cây Nhiệt Đới", "Lên Men"], variant: "Túi Zip van 1 chiều (250g)", price: 220000, originalPrice: 250000, discount: "-12%",
    rating: 4.8, reviewsCount: 132,
    description: "Một trải nghiệm khác biệt hoàn toàn về Robusta. Quy trình lên men yếm khí kéo dài 72 tiếng thổi bùng hương thơm của trái cây nhiệt đới chín mọng.",
    attributes: [{ icon: "terrain", label: "Độ cao", value: "850m" }, { icon: "eco", label: "Giống hạt", value: "Robusta" }, { icon: "water_drop", label: "Độ ẩm", value: "11.8%" }],
    weights: _weights(220000)
  },
  {
    id: "prod-19", categoryId: "blend", name: "Blend Sáng Mới", slug: "blend-sang-moi",
    subtitle: "Morning Bright Blend",
    image: "assets/img/products/blend-sang-moi.png", badge: null, origin: "Lâm Đồng", roast: "Rang Nhạt",
    roastLevel: "light", salesCount: 650, dateAdded: "2023-09-01", cuppingScore: 82.5,
    methods: ["pourover", "coldbrew"], region: "caudat",
    tastingNotes: ["Tươi Sáng", "Cam Chanh", "Trà Đen"], variant: "Túi Zip van 1 chiều (250g)", price: 190000, originalPrice: 220000, discount: "-13%",
    rating: 4.6, reviewsCount: 145,
    description: "Dành riêng cho những ai thích một buổi sáng nhẹ nhàng nhưng tỉnh táo. Độ acid sáng từ Arabica Lâm Đồng hòa quyện nhịp nhàng.",
    attributes: [{ icon: "terrain", label: "Độ cao", value: "1.400m" }, { icon: "eco", label: "Giống hạt", value: "Blend" }, { icon: "water_drop", label: "Độ ẩm", value: "11.4%" }],
    weights: _weights(190000)
  },
  {
    id: "prod-20", categoryId: "arabica", name: "Arabica Catimor Trạm Hành", slug: "arabica-catimor-tram-hanh",
    subtitle: "Washed Process",
    image: "assets/img/products/arabica-catimor-tram-hanh.png", badge: null, origin: "Trạm Hành", roast: "Rang Nhạt",
    roastLevel: "light", salesCount: 580, dateAdded: "2023-10-20", cuppingScore: 84.0,
    methods: ["pourover", "frenchpress"], region: "caudat",
    tastingNotes: ["Chanh Dây", "Hoa Trắng", "Cacao Nhạt"], variant: "Túi Zip van 1 chiều (250g)", price: 235000, originalPrice: 270000, discount: "-12%",
    rating: 4.9, reviewsCount: 187,
    description: "Trạm Hành luôn tự hào với những hạt cà phê hảo hạng. Nốt hương của chanh dây kết hợp với vị ngọt của cacao tạo cảm giác rất sảng khoái.",
    attributes: [{ icon: "terrain", label: "Độ cao", value: "1.600m" }, { icon: "eco", label: "Giống hạt", value: "Catimor" }, { icon: "water_drop", label: "Độ ẩm", value: "11.0%" }],
    weights: _weights(235000)
  }
];

// Mobile Menu and Footer Accordion Logic
document.addEventListener('DOMContentLoaded', () => {


  // Mini Cart Logic
  const cartBtns = document.querySelectorAll('.cart-btn');
  const miniCarts = document.querySelectorAll('.mini-cart');

  if (cartBtns.length > 0 && miniCarts.length > 0) {
    cartBtns.forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Toggle active class on corresponding mini cart
        const miniCart = miniCarts[index] || btn.nextElementSibling;
        if (miniCart && miniCart.classList.contains('mini-cart')) {
          miniCart.classList.toggle('active');
        }
      });
    });

    // Close mini cart when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.cart-wrapper')) {
        miniCarts.forEach(cart => cart.classList.remove('active'));
      }
    });
  }

  // Mobile Search Logic
  const mobileSearchBtns = document.querySelectorAll('.mobile-search-btn');
  const mobileSearchDropdown = document.querySelector('.mobile-search-dropdown');
  const closeSearchBtns = document.querySelectorAll('.close-search-btn');
  const mobileSearchInput = document.getElementById('mobileSearchInput');

  if (mobileSearchDropdown) {
    mobileSearchBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        mobileSearchDropdown.classList.toggle('active');
        if (mobileSearchDropdown.classList.contains('active') && mobileSearchInput) {
          setTimeout(() => mobileSearchInput.focus(), 100);
        }
      });
    });

    closeSearchBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        mobileSearchDropdown.classList.remove('active');
      });
    });
  }
  // Mobile Menu
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenuDrawer = document.querySelector('.mobile-menu-drawer');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');

  if (mobileMenuBtn && mobileMenuDrawer && mobileMenuOverlay) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuDrawer.classList.add('open');
      mobileMenuOverlay.classList.add('open');
    });

    mobileMenuClose.addEventListener('click', () => {
      mobileMenuDrawer.classList.remove('open');
      mobileMenuOverlay.classList.remove('open');
    });

    mobileMenuOverlay.addEventListener('click', () => {
      mobileMenuDrawer.classList.remove('open');
      mobileMenuOverlay.classList.remove('open');
    });
  }

  // Footer Accordion
  const footerTitles = document.querySelectorAll('.footer-col:not(:first-child):not(.newsletter-col) .footer-title');
  footerTitles.forEach(title => {
    title.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        const col = title.closest('.footer-col');
        col.classList.toggle('open');
      }
    });
  });
});


// --- CART LOGIC ---
window.formatVND = (amount) => new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
let cart = JSON.parse(localStorage.getItem('kcoffee_cart')) || [];

function saveCart() {
  localStorage.setItem('kcoffee_cart', JSON.stringify(cart));
}

window.addToCart = function (productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }

  saveCart();
  updateCartUI();

  // Show toast if triggerCartToast exists (product detail page has its own custom toast)
  if (typeof triggerCartToast === 'function') {
    triggerCartToast(product.name);
  } else {
    // Global toast for other pages (Home, Product List, etc.)
    showGlobalToast('Đã thêm vào giỏ hàng!', product.name);
  }
}

window.showGlobalToast = function (title, desc) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'global-toast';
    toast.innerHTML = `
      <span class="material-symbols-outlined global-toast-icon text-[24px]">task_alt</span>
      <div class="global-toast-content">
        <span class="global-toast-title" id="g-toast-title"></span>
        <span class="global-toast-desc" id="g-toast-desc"></span>
      </div>
    `;
    document.body.appendChild(toast);
  }

  document.getElementById('g-toast-title').innerText = title;
  document.getElementById('g-toast-desc').innerText = desc;

  toast.classList.add('show');

  if (toast.timeoutId) clearTimeout(toast.timeoutId);
  toast.timeoutId = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

window.updateCartQuantity = function (productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      updateCartUI();
    }
  }
}

window.removeFromCart = function (productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  let totalPrice = 0;

  // Update badges
  const cartBadges = document.querySelectorAll('.cart-badge');
  cartBadges.forEach(badge => {
    badge.innerText = totalItems;
    if (totalItems > 0) {
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  });

  // Update total items count in mini cart
  document.querySelectorAll('.cart-total-items').forEach(el => {
    el.innerText = totalItems;
  });

  // Render mini cart lists
  const miniCartLists = document.querySelectorAll('.mini-cart-list');
  let html = '';

  if (cart.length === 0) {
    html = '<div class="empty-cart font-body-md">Giỏ hàng trống</div>';
  } else {
    cart.forEach(item => {
      totalPrice += item.price * item.quantity;
      html += `
        <div class="mini-cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="mini-cart-item-info">
            <a href="product-detail.html?id=${item.id}" class="mini-cart-item-name font-title-sm">${item.name}</a>
            <div class="mini-cart-item-bottom">
              <span class="mini-cart-item-price font-title-sm">${formatVND(item.price)}</span>
            </div>
          </div>
          <div class="mini-cart-qty">
            <button type="button" onclick="updateCartQuantity('${item.id}', -1)">-</button>
            <span>${item.quantity}</span>
            <button type="button" onclick="updateCartQuantity('${item.id}', 1)">+</button>
          </div>
          <button class="remove-cart-item" onclick="removeFromCart('${item.id}')"><span class="material-symbols-outlined">delete</span></button>
        </div>
      `;
    });
  }

  miniCartLists.forEach(list => list.innerHTML = html);

  // Update total price
  document.querySelectorAll('.cart-total-price').forEach(el => {
    el.innerText = formatVND(totalPrice);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
});


// --- FAVORITE LOGIC ---
let favorites = JSON.parse(localStorage.getItem('kcoffee_favorites')) || [];

function saveFavorites() {
  localStorage.setItem('kcoffee_favorites', JSON.stringify(favorites));
}

window.toggleFavorite = function (productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const index = favorites.findIndex(item => item.id === productId);
  if (index !== -1) {
    showGlobalToast('Đã bỏ thích sản phẩm!', product.name);
    favorites.splice(index, 1);
  } else {
    favorites.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    showGlobalToast('Đã thêm vào mục yêu thích!', product.name);
  }

  saveFavorites();
  updateFavUI();
}

window.removeFromFav = function (productId) {
  const item = favorites.find(item => item.id === productId);
  if (!item) return;

  favorites = favorites.filter(item => item.id !== productId);
  saveFavorites();
  updateFavUI();
  showGlobalToast('Đã bỏ thích sản phẩm!', item.name);
}

function updateFavUI() {
  const totalItems = favorites.length;

  // Update badges
  const favBadges = document.querySelectorAll('.fav-badge');
  favBadges.forEach(badge => {
    badge.innerText = totalItems;
    if (totalItems > 0) {
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  });

  // Update total items count in mini fav
  document.querySelectorAll('.fav-total-items').forEach(el => {
    el.innerText = totalItems;
  });

  // Render mini fav lists
  const miniFavLists = document.querySelectorAll('.mini-fav-list');
  let html = '';

  if (favorites.length === 0) {
    html = '<div class="empty-cart font-body-md">Chưa có sản phẩm yêu thích</div>';
  } else {
    html += `
      <div class="mini-cart-columns font-label-sm" style="grid-template-columns: 48px 1fr 32px;">
        <div class="mc-col-img"></div>
        <div class="mc-col-name">Sản phẩm</div>
        <div class="mc-col-action"></div>
      </div>
    `;
    favorites.forEach(item => {
      html += `
        <div class="mini-cart-item" style="grid-template-columns: 48px 1fr 32px;">
          <img src="${item.image}" alt="${item.name}">
          <div class="mini-cart-item-info">
            <a href="product-detail.html?id=${item.id}" class="mini-cart-item-name font-title-sm">${item.name}</a>
            <div class="mini-cart-item-bottom">
              <span class="mini-cart-item-price font-title-sm">${formatVND(item.price)}</span>
            </div>
          </div>
          <button class="remove-cart-item" onclick="removeFromFav('${item.id}')">
            <span class="material-symbols-outlined filled" style="color: #ba1a1a;">favorite</span>
          </button>
        </div>
      `;
    });
  }

  miniFavLists.forEach(list => list.innerHTML = html);

  // Update product card heart icons
  const favBtns = document.querySelectorAll('.prod-fav-btn');
  favBtns.forEach(btn => {
    const onclickAttr = btn.getAttribute('onclick');
    if (onclickAttr) {
      const match = onclickAttr.match(/toggleFavorite\('([^']+)'\)/);
      if (match) {
        const productId = match[1];
        const isFav = favorites.some(f => f.id === productId);
        const icon = btn.querySelector('.material-symbols-outlined');
        if (icon) {
          if (isFav) {
            icon.classList.add('filled');
            icon.style.color = '#ba1a1a';
          } else {
            icon.classList.remove('filled');
            icon.style.color = '';
          }
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateFavUI();
});

// --- AUTHENTICATION LOGIC ---
window.toggleUserMenu = function () {
  const menu = document.getElementById('user-dropdown-menu');
  if (menu) {
    menu.classList.toggle('active');
  }
};

window.handleLogout = function () {
  localStorage.removeItem('kcoffee_session');
  updateAuthUI();
  if (typeof showGlobalToast === 'function') {
    showGlobalToast('Đã đăng xuất thành công', 'Hẹn gặp lại bạn!');
  }
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

function updateAuthUI() {
  const sessionData = localStorage.getItem('kcoffee_session');
  const authBtnsAll = document.querySelectorAll('#header-auth-btns');
  const userProfilesAll = document.querySelectorAll('#header-user-profile');
  const nameEls = document.querySelectorAll('#user-display-name');
  const emailEls = document.querySelectorAll('#user-display-email');

  if (sessionData) {
    const user = JSON.parse(sessionData);
    authBtnsAll.forEach(el => el.style.display = 'none');
    userProfilesAll.forEach(el => el.style.display = 'block');
    nameEls.forEach(el => el.innerText = user.fullname);
    emailEls.forEach(el => el.innerText = user.email);
  } else {
    authBtnsAll.forEach(el => el.style.display = 'flex');
    userProfilesAll.forEach(el => el.style.display = 'none');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();
});

let allUsers = JSON.parse(localStorage.getItem('kcoffee_users')) || [];
if (allUsers.length === 0) {
  allUsers.push({
    fullname: 'K-Coffee Admin',
    phone: '0912345678',
    email: 'admin@kcoffee.vn',
    password: 'Password123'
  });
  localStorage.setItem('kcoffee_users', JSON.stringify(allUsers));
}
