import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-xs font-light text-gray-500 tracking-[0.2em] uppercase">
              SMP ARCHITECTURE
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-16">
              <a
                href="#"
                className="text-xs font-light text-gray-400 hover:text-gray-700 tracking-[0.15em] uppercase transition-colors duration-300 relative group"
              >
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#"
                className="text-xs font-light text-gray-400 hover:text-gray-700 tracking-[0.15em] uppercase transition-colors duration-300 relative group"
              >
                People
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#"
                className="text-xs font-light text-gray-400 hover:text-gray-700 tracking-[0.15em] uppercase transition-colors duration-300 relative group"
              >
                Press
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#"
                className="text-xs font-light text-gray-400 hover:text-gray-700 tracking-[0.15em] uppercase transition-colors duration-300 relative group"
              >
                Practice
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-700 focus:outline-none transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-4 pb-6 space-y-4 bg-white/95 backdrop-blur-sm">
              <a
                href="#"
                className="text-xs font-light text-gray-400 hover:text-gray-700 block px-4 py-3 tracking-[0.15em] uppercase transition-colors duration-300"
              >
                Projects
              </a>
              <a
                href="#"
                className="text-xs font-light text-gray-400 hover:text-gray-700 block px-4 py-3 tracking-[0.15em] uppercase transition-colors duration-300"
              >
                People
              </a>
              <a
                href="#"
                className="text-xs font-light text-gray-400 hover:text-gray-700 block px-4 py-3 tracking-[0.15em] uppercase transition-colors duration-300"
              >
                Press
              </a>
              <a
                href="#"
                className="text-xs font-light text-gray-400 hover:text-gray-700 block px-4 py-3 tracking-[0.15em] uppercase transition-colors duration-300"
              >
                Practice
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
