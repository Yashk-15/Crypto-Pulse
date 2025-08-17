'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function CoinsTable({ coins }) {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('watchlist');
    setWatchlist(stored ? JSON.parse(stored) : []);
  }, []);

  const toggleWatchlist = (coinId) => {
    const newWatchlist = watchlist.includes(coinId)
      ? watchlist.filter(id => id !== coinId)
      : [...watchlist, coinId];
    
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
    setWatchlist(newWatchlist);
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-gray-200/40 rounded-2xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/80 border-b border-gray-200">
            <tr>
              {['Rank', '★', 'Coin', 'Price', '24h Change', 'Market Cap', '24h Volume'].map((header, i) => (
                <th
                  key={i}
                  className={`px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider ${header === '★' ? 'text-center' : header === 'Coin' ? 'text-left' : 'text-right'}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coins.map((coin) => (
              <tr
                key={coin.id}
                className="hover:bg-gray-100/80 hover:scale-[1.02] hover:shadow-xl cursor-pointer transition-transform duration-300 ease-out"
              >
                <td className="px-6 py-4 text-center font-medium text-gray-900">
                  {coin.market_cap_rank || '-'}
                </td>

                {/* Star Column */}
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => toggleWatchlist(coin.id)}
                    className={`text-2xl transform hover:scale-125 transition-all duration-300 ${
                      watchlist.includes(coin.id) ? 'text-yellow-400 drop-shadow-md' : 'text-gray-300 hover:text-yellow-400'
                    }`}
                    aria-label={watchlist.includes(coin.id) ? 'Remove from watchlist' : 'Add to watchlist'}
                  >
                    {watchlist.includes(coin.id) ? '★' : '☆'}
                  </button>
                </td>

                {/* Coin Column */}
                <td className="px-6 py-4">
                  <Link
                    href={`/coin/${coin.id}`}
                    className="flex items-center space-x-3 hover:text-blue-600 transition-colors"
                  >
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-8 h-8 rounded-full hover:scale-110 transition-transform duration-300"
                      onError={(e) => e.target.src = '/placeholder-coin.png'}
                    />
                    <div>
                      <div className="font-medium text-gray-900">{coin.name}</div>
                      <div className="text-gray-500 text-sm">{coin.symbol.toUpperCase()}</div>
                    </div>
                  </Link>
                </td>

                {/* Price */}
                <td className="px-6 py-4 text-right font-semibold text-gray-900">
                  ${coin.current_price?.toLocaleString() || 'N/A'}
                </td>

                {/* 24h Change */}
                <td className={`px-6 py-4 text-right font-medium transition-colors duration-500 ${
                  (coin.price_change_percentage_24h || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {coin.price_change_percentage_24h?.toFixed(2) || 0}%
                </td>

                <td className="px-6 py-4 text-right text-gray-900">
                  ${coin.market_cap?.toLocaleString() || 'N/A'}
                </td>

                <td className="px-6 py-4 text-right text-gray-900">
                  ${coin.total_volume?.toLocaleString() || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



