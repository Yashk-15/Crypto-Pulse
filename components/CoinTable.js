'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function CoinsTable({ coins }) {
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('watchlist');
    setWatchlist(stored ? JSON.parse(stored) : []);
  }, []);

  // Toggle coin in watchlist
  const toggleWatchlist = (coinId) => {
    const newWatchlist = watchlist.includes(coinId)
      ? watchlist.filter(id => id !== coinId)
      : [...watchlist, coinId];
    
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
    setWatchlist(newWatchlist);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                ★
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coin
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                24h Change
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Market Cap
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                24h Volume
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coins.map((coin) => (
              <tr key={coin.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-center font-medium text-gray-900">
                  {coin.market_cap_rank || '-'}
                </td>
                
                {/* Star Column */}
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => toggleWatchlist(coin.id)}
                    className={`text-2xl ${watchlist.includes(coin.id) ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-500 transition-colors`}
                    aria-label={watchlist.includes(coin.id) ? 'Remove from watchlist' : 'Add to watchlist'}
                  >
                    {watchlist.includes(coin.id) ? '★' : '☆'}
                  </button>
                </td>
                
                {/* Coin Column */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link 
                    href={`/coin/${coin.id}`} 
                    className="flex items-center space-x-3 hover:text-blue-600 transition-colors"
                  >
                   <Image
                      src={coin.image || '/placeholder-coin.png'}
alt={coin.name}
width={32}
  height={32}
    className="w-8 h-8 rounded-full"
      unoptimized
        />

                    <div>
                      <div className="font-medium text-gray-900">{coin.name}</div>
                      <div className="text-gray-500 text-sm">{coin.symbol.toUpperCase()}</div>
                    </div>
                  </Link>
                </td>
                
                {/* Price Columns */}
                <td className="px-6 py-4 whitespace-nowrap text-right font-semibold text-gray-900">
                  ${coin.current_price?.toLocaleString() || 'N/A'}
                </td>
                
                <td className={`px-6 py-4 whitespace-nowrap text-right font-medium ${
                  (coin.price_change_percentage_24h || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {coin.price_change_percentage_24h?.toFixed(2) || 0}%
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-right text-gray-900">
                  ${coin.market_cap?.toLocaleString() || 'N/A'}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-right text-gray-900">
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



