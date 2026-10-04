# Kế hoạch thực hiện website bán cà phê — Mộc Cà Phê

> Phạm vi: chỉ dùng HTML, CSS và JavaScript thuần; không dùng framework hoặc thư viện UI.
> Các trang được giữ đúng theo file đang có: `index.html`, `product.html`, `product-detail.html`, `auth..html`.

## Hướng thiết kế đã chọn

**Warm minimal kết hợp glassmorphism nhẹ.** Nền kem ấm, nâu espresso và xanh rêu tạo cảm giác thủ công, gần gũi. Glass effect chỉ đặt ở điều hướng, card và hộp nổi để trang vẫn rõ ràng, không bị rối hoặc nặng máy.

## Phase 1 — Nền tảng giao diện chung

**Mục tiêu:** tạo hệ màu, typography, responsive cơ bản và khung thống nhất cho 4 trang.

- [x] Tạo file kế hoạch này.
- [x] Định nghĩa CSS variables, reset và các component chung bằng CSS thuần.
- [x] Làm header, điều hướng và footer dùng xuyên suốt.
- [x] Tạo khung nhận diện cho Trang chủ, Danh mục, Chi tiết và Xác thực.
- [x] Tách CSS theo `base`, `components`, và từng trang; tách JavaScript component điều hướng.

**Cách kiểm tra:** mở mỗi file HTML; tất cả phải có cùng logo Mộc, menu, tông kem/nâu/xanh và hiển thị ổn trên màn hình nhỏ.

## Phase 2 — Hoàn thiện trang chủ và 4 chức năng JS

**Mục tiêu:** biến `index.html` thành trang chủ hoàn chỉnh.

- Hero, CTA, điểm nổi bật, sản phẩm chọn lọc, quy trình pha và phần nhận bản tin.
- JS 1: menu mobile đóng/mở.
- JS 2: đổi slide/ảnh hero tự động và điều khiển thủ công.
- JS 3: hiệu ứng xuất hiện khi cuộn.
- JS 4: form nhận ưu đãi kiểm tra email và hiện toast.

**Cách kiểm tra:** thử menu ở màn hình hẹp, chuyển hero, cuộn trang và nhập email sai/đúng.

## Phase 3 — Danh mục sản phẩm từ mảng JavaScript

**Mục tiêu:** hoàn chỉnh `product.html` và đáp ứng tiêu chí dữ liệu động.

- Khai báo một mảng sản phẩm trong `js/script.js` (tên, giá, loại, mức rang, ảnh, mô tả).
- Render card sản phẩm hoàn toàn bằng JavaScript.
- Tìm kiếm, lọc theo loại cà phê, sắp xếp theo giá và trạng thái “không tìm thấy”.
- Dẫn đến trang chi tiết qua query string, ví dụ `product-detail.html?id=latte-moc`.

**Cách kiểm tra:** dùng DevTools xem card được sinh bằng JS; thử từng bộ lọc, tìm kiếm và sắp xếp.

## Phase 4 — Trang chi tiết và ít nhất 3 chức năng JS

**Mục tiêu:** hoàn chỉnh `product-detail.html`.

- Đọc `id` từ URL để hiển thị đúng sản phẩm.
- JS 1: chọn ảnh thumbnail.
- JS 2: chọn size/tuỳ chọn và cập nhật giá.
- JS 3: tăng/giảm số lượng.
- JS 4: nút thêm vào giỏ hiển thị toast và lưu giỏ hàng vào `localStorage`.

**Cách kiểm tra:** mở một sản phẩm từ danh mục, đổi tuỳ chọn, số lượng và kiểm tra toast/giỏ hàng.

## Phase 5 — Đăng ký, đăng nhập và validate

**Mục tiêu:** hoàn chỉnh `auth..html` bằng hai form dạng tab trong cùng file hiện có.

- Đăng ký: tên, email, mật khẩu, xác nhận mật khẩu; validate trực tiếp bằng JS.
- Lưu tài khoản demo vào `localStorage`.
- Đăng nhập: validate dữ liệu và đối chiếu tài khoản đã lưu.
- Hiện/ẩn mật khẩu, thông báo lỗi rõ ràng, trạng thái đăng nhập thành công.

**Cách kiểm tra:** đăng ký thiếu/sai dữ liệu, đăng ký hợp lệ, sau đó đăng nhập sai và đúng.

## Phase 6 — Rà soát và bàn giao

**Mục tiêu:** kiểm tra toàn bộ yêu cầu ASM trước khi nộp.

- Rà link điều hướng, giao diện mobile và các trạng thái lỗi.
- Đảm bảo không dùng thư viện; chỉ HTML/CSS/JS.
- Kiểm tra đủ 4 JS trang chủ, render mảng ở danh mục, 3 JS trang chi tiết, validate auth.
- Làm sạch mã, thêm chú thích ngắn cho các phần JS quan trọng.

**Cách kiểm tra:** kiểm thử từ đầu như người dùng mới, sau đó đối chiếu từng dòng yêu cầu chữ đỏ trong tài liệu ASM.
