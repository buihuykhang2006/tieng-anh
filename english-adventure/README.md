# English Adventure 🦊

Website học tiếng Anh cho học sinh tiểu học (lớp 1–5), xây dựng theo lộ trình Phase 1 (HTML + CSS + JS thuần, không cần backend).

## Cách chạy trong VS Code

1. Giải nén thư mục `english-adventure` vào nơi bạn muốn (ví dụ `C:\Users\pc\Downloads\Tiếng anh`).
2. Mở thư mục đó bằng VS Code (`File > Open Folder...`).
3. Cài extension **Live Server** (Ritwick Dey) trong VS Code.
4. Chuột phải vào `index.html` → **Open with Live Server**.
5. Trình duyệt sẽ tự mở trang chủ. Có thể mở trực tiếp file `index.html` bằng trình duyệt cũng chạy được, nhưng dùng Live Server sẽ mượt hơn (đặc biệt phần font chữ Google Fonts).

> Không cần cài Node.js, không cần internet để chạy app (chỉ cần internet để tải font chữ Google Fonts và dùng giọng đọc tiếng Anh có sẵn của trình duyệt).

## Cấu trúc thư mục

```
english-adventure/
├── index.html      → Trang chủ giới thiệu
├── learn.html      → Trang chọn Unit / Lesson (đường học zig-zag)
├── quiz.html       → Trang làm bài (4 dạng bài tập)
├── profile.html    → Hồ sơ, huy hiệu, nhân vật
├── css/style.css   → Toàn bộ giao diện
├── js/
│   ├── data.js     → Toàn bộ nội dung bài học (Level 1: 5 Unit, 10 bài)
│   ├── storage.js  → XP / streak / tim / huy hiệu, lưu vào localStorage
│   ├── learn.js    → Logic trang chọn bài
│   ├── quiz.js     → Engine làm bài (4 dạng câu hỏi)
│   └── profile.js  → Logic trang hồ sơ
```

## Đã làm được (MVP)

- ✅ Trang chủ giới thiệu
- ✅ Level 1 với 5 Unit (Hello, Numbers, Colors, Animals, Toys), mỗi Unit 2 bài
- ✅ 4 dạng bài tập: chọn đáp án, nghe & chọn (dùng giọng đọc trình duyệt, không cần file mp3), điền từ, sắp xếp câu
- ✅ Hệ thống XP, lên cấp, streak theo ngày, tim (mất tim khi trả lời sai, ôn tập để lấy lại tim)
- ✅ 5 huy hiệu thành tích + nhân vật mở khoá theo cấp độ
- ✅ Mở khoá bài học tuần tự (phải hoàn thành bài trước mới mở bài sau)
- ✅ Lưu tiến độ bằng `localStorage` — không cần tài khoản, không cần backend

## Bước tiếp theo (theo lộ trình Phase 7-8 trong kế hoạch của bạn)

- Thêm Level 2–5: chỉ cần copy cấu trúc trong `js/data.js` và nối thêm object mới vào mảng `COURSE.units`.
- Khi muốn có tài khoản nhiều máy: xây thêm trang đăng nhập + backend Node.js/Express + MySQL (hoặc Firebase) để thay thế `localStorage`.
- Có thể thay giọng đọc `speechSynthesis` bằng file mp3 thật trong thư mục `audio/` nếu muốn giọng tự nhiên hơn.
