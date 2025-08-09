import "./globals.css";

export const metadata = {
  title: "Crypto Dashboard",
  description: "Live cryptocurrency prices, charts, and watchlist using CoinGecko API",
  keywords: "cryptocurrency, bitcoin, ethereum, crypto prices, market cap",
  author: "Crypto Dashboard",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}