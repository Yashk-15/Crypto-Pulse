'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Fixed: Use App Router hook
import Navbar from '../../../components/Navbar';
import CoinChart from '../../../components/CoinChart';
import { getData } from '../../../utils/api';

export default function CoinDetails() {
  const params = useParams();
  const id = params?.id;

  const [coin, setCoin] = useState(null);
  const [range, setRange] = useState(7);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    async function fetchCoinData() {
      try {
        setLoading(true);
        setError('');

        // Use centralized API utility
        const data = await getData(`/coins/${id}`);
        setCoin(data);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching coin details:', err);
        setError('Failed to load coin details. Please try again.');
        setLoading(false);
      }
    }

    fetchCoinData();
  }, [id]);

  if (loading) return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading coin details...</p>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );

  if (!coin) return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Coin not found</p>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Coin Header */}
        <div className="flex items-center space-x-4 mb-8">
          <img 
            src={coin.image?.large || coin.image?.small || '/placeholder-coin.png'} 
            alt={coin.name || 'Coin'} 
            className="w-16 h-16 rounded-full"
            onError={(e) => {e.target.src = '/placeholder-coin.png'}}
          />
          <div>
            <h1 className="text-3xl font-bold text-shadow-amber-50">{coin.name}</h1>
            <p className="text-gray-500 text-lg">{coin.symbol?.toUpperCase()}</p>
          </div>
        </div>

        {/* Market Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Current Price</p>
            <p className="text-2xl font-semibold text-gray-900">
              ${coin.market_data?.current_price?.usd?.toLocaleString() || 'N/A'}
            </p>
          </div>
          
          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Market Cap</p>
            <p className="text-2xl font-semibold text-gray-900">
              ${coin.market_data?.market_cap?.usd?.toLocaleString() || 'N/A'}
            </p>
          </div>
          
          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-1">24h Volume</p>
            <p className="text-2xl font-semibold text-gray-900">
              ${coin.market_data?.total_volume?.usd?.toLocaleString() || 'N/A'}
            </p>
          </div>
          
          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Market Rank</p>
            <p className="text-2xl font-semibold text-gray-900">
              #{coin.market_cap_rank || 'N/A'}
            </p>
          </div>
          
          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Circulating Supply</p>
            <p className="text-2xl font-semibold text-gray-900">
              {coin.market_data?.circulating_supply?.toLocaleString() || 'N/A'}
            </p>
          </div>

          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-1">24h Change</p>
            <p className={`text-2xl font-semibold ${
              (coin.market_data?.price_change_percentage_24h || 0) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {coin.market_data?.price_change_percentage_24h?.toFixed(2) || 0}%
            </p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Price Chart</h2>

          {/* Range Selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[1, 7, 30, 90, 365].map((days) => (
              <button
                key={days}
                onClick={() => setRange(days)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  range === days 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {days === 1 ? '24h' : days === 365 ? '1Y' : `${days}d`}
              </button>
            ))}
          </div>

          {/* Chart Component */}
          <div className="h-96">
            <CoinChart id={id} range={range} />
          </div>
        </div>

        {/* Description Section */}
        {coin.description?.en && (
          <div className="mt-8 bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-gray-900">About {coin.name}</h3>
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: coin.description.en.substring(0, 500) + '...' 
              }} 
            />
          </div>
        )}
      </div>
    </div>
  );
}


















