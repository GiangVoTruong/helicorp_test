# TechNexus

Landing page và mini e-commerce cho thương hiệu công nghệ **TechNexus**, xây dựng với React 19, Vite 8 và Tailwind CSS v4. Tích hợp đăng nhập, đăng ký, hồ sơ người dùng và chatbot AI.

## Tính năng

- **Scrollytelling** — Hero, tính năng, thông số, newsletter (parallax + reveal on scroll)
- **Xác thực** — Đăng ký, đăng nhập, hồ sơ (`/login`, `/register`, `/profile`)
- **Dark mode** — Chuyển theme sáng/tối, lưu trong `localStorage`
- **Đa ngôn ngữ** — Tiếng Việt / English
- **Mini e-commerce** — Danh mục sản phẩm, giỏ hàng, yêu thích, sản phẩm đã xem
- **Chatbot** — Trợ lý AI (Google Gemini) với fallback khi API lỗi
- **Toast** — Thông báo đăng nhập, giỏ hàng, newsletter, scroll milestone
- **SEO** — Meta title, description và Open Graph trong `index.html`

## Tech stack

| Công nghệ | Phiên bản / Ghi chú |
|-----------|---------------------|
| React | 19 |
| Vite | 8 |
| TypeScript | 6 |
| Tailwind CSS | 4 |
| React Router | 7 |
| TanStack Query | 5 |
| Axios | 1.x |

## API backend

Frontend kết nối Spring Boot API:

- **Production:** `https://java-x07o.onrender.com/api`
- **Swagger:** [java-x07o.onrender.com/swagger-ui](https://java-x07o.onrender.com/swagger-ui/index.html)

| Endpoint | Mô tả |
|----------|-------|
| `POST /auth/login` | Đăng nhập |
| `POST /auth/register` | Đăng ký |
| `GET /users/profile` | Hồ sơ (Bearer token) |

## Yêu cầu

- Node.js 20+
- pnpm (khuyến nghị)
- Backend chạy tại `http://localhost:8080` (dev) hoặc URL Render ở trên (production)

## Cài đặt & chạy

```bash
pnpm install
cp .env.example .env   # Windows: copy .env.example .env
pnpm dev               # http://localhost:5173
```

```bash
pnpm build             # Build production → dist/
pnpm preview           # Preview local → http://localhost:4173
pnpm start             # Giống preview, dùng trên Render
```

## Biến môi trường

| Biến | Mô tả |
|------|-------|
| `GEMINI_API_KEY` | API key Google Gemini (server-side proxy, không lộ client) |
| `VITE_API_URL` | Base URL API. Dev: `/api` (qua Vite proxy) |
| `VITE_API_PROXY_TARGET` | Target proxy dev/preview. Dev: `http://localhost:8080` |

**Dev (`.env`):**

```env
GEMINI_API_KEY=your-gemini-api-key
VITE_API_URL=/api
VITE_API_PROXY_TARGET=http://localhost:8080
```

**Production (`.env.production` / Render):**

```env
VITE_API_URL=/api
VITE_API_PROXY_TARGET=https://java-x07o.onrender.com
GEMINI_API_KEY=your-gemini-api-key
```

**Vercel:** thêm trong Project Settings → Environment Variables:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://java-x07o.onrender.com/api` |
| `GEMINI_API_KEY` | API key Gemini |

> Backend cần bật CORS cho domain Vercel nếu gọi thẳng API (không qua proxy).

## Routes

| Route | Mô tả |
|-------|-------|
| `/` | Trang chủ |
| `/login` | Đăng nhập |
| `/register` | Đăng ký tài khoản |
| `/profile` | Hồ sơ người dùng (yêu cầu đăng nhập) |

## Cấu trúc thư mục

```
src/
├── components/
│   ├── analytics/     # Scroll milestone, tracking
│   ├── scrolly/         # Sections scrollytelling
│   └── ui/              # Toast, theme, language switcher
├── configs/
│   ├── axios/           # Axios instance + interceptors
│   └── query/           # React Query provider
├── features/
│   ├── auth/            # Login, register, profile
│   ├── chatbot/         # Chat widget + Gemini
│   ├── commerce/        # Catalog, cart, favorites
│   ├── home/            # Trang chủ
│   └── layout/          # Header, footer
├── hooks/
├── i18n/
├── lib/                 # Validation helpers
├── theme/
└── data/                # Dữ liệu sản phẩm mẫu
```

## Deploy

### Render (frontend)

File `render.yaml` đã cấu hình sẵn:

| Cài đặt | Giá trị |
|---------|---------|
| Build Command | `pnpm install && pnpm build` |
| Start Command | `pnpm start` |
| `GEMINI_API_KEY` | API key Gemini |
| `VITE_API_PROXY_TARGET` | `https://java-x07o.onrender.com` |

Vite preview proxy `/api` → backend Render (không cần CORS).

### Vercel

| Cài đặt | Giá trị |
|---------|---------|
| Framework | Vite |
| Install Command | `pnpm install` |
| Build Command | `pnpm run build` |
| Output Directory | `dist` |
| `VITE_API_URL` | `https://java-x07o.onrender.com/api` |
| `GEMINI_API_KEY` | API key Gemini |

## Git workflow

| Nhánh | Mục đích |
|-------|----------|
| `main` | Code ổn định |
| `feat/*` | Tính năng mới |
| `fix/*` | Sửa lỗi |
| `chore/*` | Config, dọn dẹp |
| `docs/*` | Tài liệu |

Commit theo [Conventional Commits](https://www.conventionalcommits.org/): `feat(scope): mô tả ngắn`.

## Liên kết

- **Repo:** [github.com/GiangVoTruong/helicorp_test](https://github.com/GiangVoTruong/helicorp_test)
- **API Swagger:** [java-x07o.onrender.com/swagger-ui](https://java-x07o.onrender.com/swagger-ui/index.html)
