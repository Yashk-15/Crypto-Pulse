'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { getData } from '../../utils/api';
import CoinsTable from '../../components/CoinTable';

export default function WatchlistPage() {
  const [watchlistCoins, setWatchlistCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get watchlist from localStorage
  const getWatchlist = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('watchlist');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  };

  // Fetch data for watchlisted coins
  useEffect(() => {
    const watchlist = getWatchlist();
    if (watchlist.length === 0) {
      setLoading(false);
      return;
    }

    const fetchWatchlistCoins = async () => {
      try {
        setLoading(true);
        const data = await getData(
          `/coins/markets?vs_currency=usd&ids=${watchlist.join(',')}&order=market_cap_desc`
        );
        setWatchlistCoins(data);
      } catch (err) {
        setError('Failed to load watchlist data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistCoins();
  }, []);

  // Handle removing from watchlist
  const handleRemove = (coinId) => {
    const updatedWatchlist = getWatchlist().filter(id => id !== coinId);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    setWatchlistCoins(watchlistCoins.filter(coin => coin.id !== coinId));
  };

  if (loading) return (
    <div>
      <Navbar />
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading watchlist...</p>
      </div>
    </div>
  );

  if (error) return (
    <div>
      <Navbar />
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">My Watchlist</h1>
        
        {watchlistCoins.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">Your watchlist is empty</p>
            <Link 
              href="/" 
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Browse Cryptocurrencies
            </Link>
          </div>
        ) : (
          <CoinsTable 
            coins={watchlistCoins} 
            watchlist={getWatchlist()}
            onToggleWatchlist={handleRemove}
            showRemoveButton={true}
          />
        )}
      </div>
    </div>
  );
}






