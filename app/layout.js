import "./globals.css";
import "./ProgressBar";

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
      <body className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white transition-all duration-500">
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}