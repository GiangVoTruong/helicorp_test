# TechNexus Landing Page

Landing page hiện đại cho thương hiệu công nghệ **TechNexus**, xây dựng với React 19, Vite 8 và Tailwind CSS v4.

## Tính năng

- **Scrollytelling** — Hero, tính năng nổi bật, thông số kỹ thuật, form đăng ký nhận tin (parallax + reveal on scroll)
- **Dark mode** — Chuyển theme sáng/tối, lưu preference trong `localStorage`
- **Đa ngôn ngữ** — Tiếng Việt / English
- **Mini e-commerce** — Danh mục sản phẩm, giỏ hàng, yêu thích, sản phẩm đã xem
- **Chatbot** — Trợ lý AI (Google Gemini) với fallback khi API lỗi
- **SEO** — Meta title, description và Open Graph trong `index.html`

## Tech stack

| Công nghệ | Phiên bản |
|-----------|-----------|
| React | 19 |
| Vite | 8 |
| TypeScript | 6 |
| Tailwind CSS | 4 |

## Yêu cầu

- Node.js 20+
- pnpm (khuyến nghị) hoặc npm

## Cài đặt & chạy

```bash
# Cài dependencies
pnpm install

# Copy biến môi trường
cp .env.example .env

# Chạy dev server → http://localhost:5173
pnpm dev

# Build production
pnpm build

# Preview bản build → http://localhost:4173
pnpm preview

# Lint
pnpm lint
```

## Biến môi trường

| Biến | Mô tả |
|------|-------|
| `GEMINI_API_KEY` | API key Google Gemini cho chatbot (server-side, không lộ ra client) |

## Cấu trúc thư mục

```
src/
├── components/
│   ├── analytics/     # Theo dõi hành vi (scroll, click)
│   ├── scrolly/       # Các section scrollytelling
│   └── ui/            # Toast, theme toggle, language switcher
├── features/
│   ├── chatbot/       # Chat widget + Gemini service
│   ├── commerce/      # Catalog, cart, favorites
│   ├── home/          # Trang chủ
│   └── layout/        # Header, footer, layout shell
├── hooks/             # useInView, useScrollProgress, …
├── i18n/              # Bản dịch VI / EN
├── theme/             # Dark / light theme provider
└── data/              # Dữ liệu sản phẩm mẫu
```

## Git workflow

| Nhánh | Mục đích |
|-------|----------|
| `main` | Code ổn định |
| `feat/*` | Tính năng mới |
| `fix/*` | Sửa lỗi |
| `chore/*` | Config, dọn dẹp |
| `docs/*` | Tài liệu |

Commit message theo [Conventional Commits](https://www.conventionalcommits.org/): `feat(scope): mô tả ngắn`.

## Deploy trên Render

> **Quan trọng:** Dùng **Web Service**, không dùng **Static Site**.  
> Static Site chỉ serve file trong `dist/` → `/api/env-check` và chatbot proxy sẽ **404**.

### Tạo Web Service

1. Render Dashboard → **New +** → **Web Service** (không chọn Static Site)
2. Connect repo `helicorp_test`
3. Cấu hình:

| Cài đặt | Giá trị |
|---------|---------|
| **Runtime** | Node |
| **Build Command** | `pnpm install && pnpm build` |
| **Start Command** | `pnpm start` |
| **Environment** | `GEMINI_API_KEY` = API key Gemini |

4. **Save** → đợi deploy xong
5. Mở Console (F12) → thấy `[env] server GEMINI_API_KEY: set`

### Nếu đang dùng Static Site

Xóa Static Site cũ (hoặc tạo Web Service mới với URL khác), rồi làm theo bước trên.  
File `render.yaml` trong repo đã cấu hình sẵn cho Web Service.

### Kiểm tra nhanh

- `https://your-app.onrender.com/api/env-check` → phải trả JSON, không phải 404
- Render Logs → thấy `[server] listening on 0.0.0.0:...`

## Liên kết

Sau khi tạo repo GitHub mới:

```bash
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```
