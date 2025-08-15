# Crypto Dashboard

A responsive and feature-rich cryptocurrency dashboard built with **Next.js** and powered by the **CoinGecko API**.  
The dashboard allows users to browse live market data, view detailed charts, search & filter coins, and manage a personal watchlist.

## Features

### 1️. Markets List (Homepage)
- 📋 Paginated table of **50 coins per page**.
- Columns: `# (rank)`, `coin (icon + name + symbol)`, `price`, `24h %`, `market cap`, `24h volume`.
- Client-side search filtering by name or symbol.
- Filters for market cap rank, 24h change %, and volume.
- Loading, empty, and error states.
- Data displayed in **USD**.

### 2. Coin Details
- Clicking a coin opens a dedicated **`/coin/[id]`** page.
- Displays:
  - Price  
  - Market cap  
  - 24h volume  
  - Rank  
  - Supply
- Interactive price chart with selectable ranges: `24h`, `7d`, `30d`, `90d`.
- Creative layout with clean UI.

### 3️. Watchlist
- Add/remove coins to a **local watchlist**.
- Watchlist persists using **localStorage**.
- Watchlist page displays the same table format with **live updated prices**.

## 4. Tech Stack
- **Frontend:** Next.js, React
- **Styling:** Tailwind CSS
- **Charts:** Chart.js / react-chartjs-2
- **API:** CoinGecko API
- **State Persistence:** localStorage
