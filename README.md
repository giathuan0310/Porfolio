# 🚀 IT Developer Interactive Portfolio

> Portfolio hiện đại chuẩn Production dành cho Software Engineer / Full-Stack Developer với hiệu ứng chòm sao động tương tác chuột (HTML5 Canvas), giao diện phong cách Dark Nebula / Neon Cyberpunk và khả năng tùy chỉnh dữ liệu trực tiếp.

---

## 🛠️ Công Nghệ Sử Dụng

- **Core:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) (Tốc độ khởi động siêu tốc)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/) + Custom Glassmorphism & Neon Shadows
- **Animation:** HTML5 Canvas Constellation Graph (Tương tác lực đẩy con trỏ chuột) + CSS Keyframes
- **Icons:** [Lucide React](https://lucide.dev/) (Bộ icon đồ họa vector sắc nét)
- **State Management:** React `useState` & `useEffect` (Hỗ trợ 2-way data binding với Edit Profile Modal)

---

## 📂 Cấu Trúc Dự Án

```bash
portfolio/
├── public/
│   └── favicon.svg                # Icon nhận diện thương hiệu công nghệ
├── src/
│   ├── assets/
│   │   └── projects/              # Thư mục lưu trữ hình ảnh demo dự án
│   ├── components/                # Thư mục tách module component tái sử dụng
│   ├── App.jsx                    # Giao diện chính chứa toàn bộ Portfolio logic
│   ├── main.jsx                   # Điểm kích hoạt ReactDOM
│   └── index.css                  # Tailwind Directives, Custom Keyframes & Sleek Scrollbar
├── index.html                     # HTML5 chuẩn SEO & liên kết Google Fonts (Plus Jakarta Sans, Fira Code)
├── package.json                   # Cấu hình dependencies & NPM scripts
├── tailwind.config.js             # Bảng màu Neon Cyberpunk (Cyan, Emerald, Purple)
├── postcss.config.js              # Cấu hình xử lý CSS tự động
├── vite.config.js                 # Cấu hình Vite Dev Server
└── README.md                      # Hướng dẫn chi tiết
```

---

## ⚡ Hướng Dẫn Cài Đặt & Chạy Local

### 1. Cài đặt dependencies (nếu chưa cài):
```bash
npm install
```

### 2. Chạy môi trường phát triển (Dev Server):
```bash
npm run dev
```
Trình duyệt sẽ tự động mở tại: `http://localhost:3000`

### 3. Build sản phẩm tối ưu (Production Build):
```bash
npm run build
```
Thư mục `dist/` sẽ được tạo sẵn sàng để deploy lên Vercel, Netlify hoặc GitHub Pages.

---

## ✨ Các Tính Năng Nổi Bật

1. **Hiệu Ứng Hạt Tương Tác Chuột (Constellation Effect):** Nền vũ trụ công nghệ với 75 hạt chuyển động ngẫu nhiên, tự động kết nối mạng lưới khi ở gần và phản xạ đẩy lùi khi di chuột qua.
2. **Hero Section 3D Avatar & Floating Badges:** Hiệu ứng lơ lửng card avatar kèm các terminal tag mô phỏng code live (`app.tsx`, `Senior Verified`).
3. **Lưới Kỹ Năng 3 Khối:** Phân tầng chuyên môn rõ ràng: UI/Client, Server/Core và Cloud/DevOps.
4. **Dự Án Nổi Bật Kèm Modal Chi Tiết:** Xem mô tả chi tiết, metrics tải trang và chuyển hướng Live Demo / Source Code.
5. **Modal "Chỉnh Sửa Thông Tin":** Tùy biến Họ tên, Chức danh, Email, Tiểu sử và các liên kết mạng xã hội theo thời gian thực mà không cần sửa code.
6. **Section "TÌM TÔI TRÊN":** Phong cách Dark Nebula với các nút icon phát sáng Neon (GitHub, Facebook, LinkedIn, Instagram).
