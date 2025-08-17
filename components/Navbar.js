'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/watchlist", label: "Watchlist", icon: "⭐" }
  ];

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg shadow-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-xl font-bold hover:text-cyan-400 hover:scale-105 transition-all duration-300"
            >
              <span className="text-2xl">₿</span>
              <span>Crypto Dashboard</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-baseline space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(link.href) ? 'border-b-2 border-cyan-400' : ''}

                    ? 'bg-cyan-500 text-white shadow-lg scale-105'
                    : 'text-gray-300 hover:bg-gray-700/60 hover:scale-105 hover:shadow-lg'
                }`}
                
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}


