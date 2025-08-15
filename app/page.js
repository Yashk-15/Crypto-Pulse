
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getData } from "../utils/api";
import CoinsTable from "../components/CoinTable"; // Add this import

// Simple debounce function
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}


export default function HomePage() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value); // This updates immediately for UI
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchInput]);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const cachedData = sessionStorage.getItem('cachedCoins');
        const cacheTime = sessionStorage.getItem('cacheTime');
        
        if (cachedData && cacheTime && Date.now() - cacheTime < 300000) {
          setCoins(JSON.parse(cachedData));
        } else {
          const data = await getData('/coins/markets?vs_currency=usd&per_page=50');
          setCoins(data);
          sessionStorage.setItem('cachedCoins', JSON.stringify(data));
          sessionStorage.setItem('cacheTime', Date.now());
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [page]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-shadow-amber-50 mb-2">Cryptocurrency Markets</h1>
          <p className="text-shadow-amber-200">Track live cryptocurrency prices and market data</p>
        </div>

        {/* Search Input */}
        <div className="mb-6">
        <input
  type="text"
  placeholder="Search by name or symbol..."
  value={searchInput} // Changed from search to searchInput
  onChange={handleSearchChange} // Updated handler
  className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
/>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading cryptocurrencies...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filteredCoins.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-gray-600">
          <p>It&apos;s a great time to invest in crypto</p>
         </p>
          </div>
        )}
      
        {/* Coins Table - Replaced with CoinsTable component */}
        {!loading && !error && filteredCoins.length > 0 && (
          <CoinsTable coins={filteredCoins} />
        )}

        {/* Pagination Controls */}
        {!loading && !error && !searchQuery && (
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-6 py-3 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            
            <span className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium">
              Page {page}
            </span>
            
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}




