# 🛠 Shopee Scraper API (TypeScript + Puppeteer + Bright Data)

A scalable, stealthy Shopee scraper built in TypeScript that:
- Mimics browser behavior using Puppeteer Stealth
- Uses Bright Data or free proxy pools
- Retrieves product JSON from Shopee's internal `get_pc` API
- Supports high-concurrency scraping with fallback strategies

---

## 🎯 Features

- RESTful API: `GET /shopee?storeId=xxx&itemId=yyy`
- Scalable, retry-based Axios scraper
- Bright Data proxy support via `.env`
- Puppeteer Stealth fallback with full browser emulation
- Dockerized setup for deployment

---

## 📐 System Design

| Layer                         | Description |
|------------------------------|-------------|
| API Gateway                  | Validates, rate-limits requests |
| Application Logic            | Builds request & invokes scraper |
| Retry + Proxy Layer          | Axios retries + rotating proxies |
| Puppeteer Fallback           | Headless browser if blocked |
| Shopee API Integration       | Hits Shopee's private `get_pc` endpoint |

## ↩️ Sequence Diagram
![Sequence Diagram](docs/seq_diagram.png)

### Flow
| Layer         | Role                                              |
| ------------- | ------------------------------------------------- |
| Client        | Triggers the scraping request                     |
| API Gateway   | Validates input, rate limits, routes requests     |
| ShopeeFetcher | Core logic, switching between Axios and Puppeteer |
| Axios Layer   | Fast direct requests with proxy + retries         |
| Puppeteer     | Browser fallback for hard-to-scrape pages         |
| Shopee API    | The real source of product detail data            |

---

## 🚀 Quickstart

### 1. Clone and Install

```bash
npm install
```

### 2. Create `.env` with Bright Data credentials

```env
BRIGHTDATA_USER=your_user
BRIGHTDATA_PASS=your_pass
BRIGHTDATA_HOST=brd.superproxy.io
BRIGHTDATA_PORT=22225
```

### 3. Build and Run

```bash
npm run build
npm start
```

Visit: `http://localhost:3000/shopee?storeId=xxx&itemId=yyy`

---

## 🧪 Puppeteer Fallback

When standard scraping fails:
- Puppeteer navigates to the product page
- Extracts cookies, CSRF token
- Emulates a browser making the actual API request

---

## 🐳 Docker

```bash
docker-compose up --build
```

---

## 📦 Project Structure

```
src/
├── api/                 # Express API entrypoint
├── services/            # Main Shopee fetcher logic
├── utils/               # Retry, proxy, rate-limit logic
└── puppeteer/           # Browser fallback handler
```