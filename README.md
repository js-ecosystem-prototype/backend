# EcoSystemJS Backend

##Update 11/07/2025
```
GET: /api/v1/members
```w

## Hướng dẫn cấu hình khi clone dự án

### 1. Clone dự án
```bash
git clone <repository-url>
cd backend
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cấu hình file `.env`
Tạo file `.env` trong thư mục `backend` với nội dung mẫu:
```
PORT=
DATABASE_URL=

```
> Thay đổi giá trị các biến cho phù hợp với môi trường của bạn.

### 4. Build và chạy dự án

- **Chạy development:**
  ```bash
  npm run dev
  ```

---

**Lưu ý:** Đảm bảo đã cài đặt Node.js và PostgreSQL trước khi chạy dự án, nếu dev ở trường thì fake vpn thì mới kết nối được với db neon