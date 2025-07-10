import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const ArchitecturePortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const featuredProjects = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "The Artisan Village",
      subtitle: "Mixed-use development",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "The Pavilion at Prospect Landing & The Overlook",
      subtitle: "Commercial complex",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Residences at River Development",
      subtitle: "Residential complex",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "The Riverside Executive Campus",
      subtitle: "Office development",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Seaside Resort",
      subtitle: "Hospitality & leisure",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Mountain View Pavilion",
      subtitle: "Community center",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Modern Family Housing",
      subtitle: "Residential project",
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Maple Public Library",
      subtitle: "Public facility",
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1600607688960-e095bd8e0a3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Urban Residential Complex",
      subtitle: "Mixed-use development",
    },
    {
      id: 10,
      image:
        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Contemporary Office Tower",
      subtitle: "Commercial building",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
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

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop"
            alt="Modern beach house architecture"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-light tracking-wide">
              ARCHITECTURE
            </h1>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12 lg:mb-16">
            <h2 className="text-xs font-light text-gray-500 tracking-[0.2em] uppercase mb-2">
              Featured Projects
            </h2>
            <div className="w-12 h-px bg-gray-300"></div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {featuredProjects.map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-gray-100 mb-4 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-light text-gray-900 tracking-wide">
                    {project.title}
                  </h3>
                  <p className="text-xs font-light text-gray-500 tracking-[0.1em] uppercase">
                    {project.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {/* Row 1 */}
          <div className="aspect-[4/3] bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=450&fit=crop"
              alt="Modern villa with pool"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=450&fit=crop"
              alt="Waterfront resort"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Row 2 */}
          <div className="aspect-[4/3] bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&h=450&fit=crop"
              alt="White modern buildings"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=450&fit=crop"
              alt="Luxury apartments"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Row 3 */}
          <div className="aspect-[4/3] bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1600607688960-e095bd8e0a3f?w=600&h=450&fit=crop"
              alt="Beach house landscape"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=600&h=450&fit=crop"
              alt="Contemporary home"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Row 4 */}
          <div className="aspect-[4/3] bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=600&h=450&fit=crop"
              alt="Modern glass building"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1600607688876-4e2a09cf159d?w=600&h=450&fit=crop"
              alt="Suburban villa"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Row 5 */}
          <div className="aspect-[4/3] bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1600607688888-4e2a09cf159d?w=600&h=450&fit=crop"
              alt="Commercial building"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1600607688999-4e2a09cf159d?w=600&h=450&fit=crop"
              alt="Mixed use complex"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Row 6 */}
          <div className="aspect-[4/3] bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1600607689000-4e2a09cf159d?w=600&h=450&fit=crop"
              alt="Historic renovation"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1600607689111-4e2a09cf159d?w=600&h=450&fit=crop"
              alt="Interior design"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Single large image */}
        </div>

        {/* Bottom text section */}
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-24">
          {/* Left side - Large black and white image */}
          <div className="aspect-[3/4] bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&h=800&fit=crop&sat=-100"
              alt="Architectural founders"
              className="w-full h-full object-cover grayscale"
            />
          </div>

          {/* Right side - Text content */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="text-xs font-light text-gray-500 tracking-[0.2em] uppercase mb-6">
                About the Practice
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Architectural David Stern, David Sandeen, and Edmund Le studied
                at the University of Southern California. They practice in urban
                design to private residence, from campus planning to resort
                development. With an emphasis on site planning, massing, and
                careful attention to detail, their work has been characterized
                by a sense of place and quality of experience.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                During their tenure, including nearly three decades of practice,
                they have completed over 200 projects across the United States
                and internationally.
              </p>
            </div>
          </div>
        </div>

        {/* In the Press Section */}
        <div className="mb-16 lg:mb-24">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xs font-light text-gray-500 tracking-[0.2em] uppercase">
              In the Press
            </h3>
            <a
              href="#"
              className="text-xs font-light text-gray-400 hover:text-gray-700 tracking-[0.15em] uppercase transition-colors duration-300"
            >
              View All
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Press Item 1 */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-gray-100 mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop"
                  alt="Press coverage"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                New development at George Beach showcases sustainable design and
                community spirit.
              </p>
              <p className="text-xs text-gray-400 mt-2">Design + Build</p>
            </div>

            {/* Press Item 2 */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-gray-100 mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop"
                  alt="Press coverage"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                This is exactly the type of project that validates the role of
                architecture in community design.
              </p>
              <p className="text-xs text-gray-400 mt-2">Architectural Review</p>
            </div>

            {/* Press Item 3 */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-gray-100 mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400&h=300&fit=crop"
                  alt="Press coverage"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                High-end housing, pristine marina, and resort facilities on
                South Padre Island.
              </p>
              <p className="text-xs text-gray-400 mt-2">Texas Architect</p>
            </div>

            {/* Press Item 4 */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-gray-100 mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop"
                  alt="Press coverage"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Premiere architect Sean Sandeen's three architectural style
                influences.
              </p>
              <p className="text-xs text-gray-400 mt-2">Dwell Magazine</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-4 sm:mb-0">
              <span className="text-xs font-light text-gray-400 tracking-[0.2em] uppercase">
                SMP Architecture
              </span>
            </div>
            <div className="flex space-x-6 text-xs text-gray-400">
              <a
                href="#"
                className="hover:text-gray-700 transition-colors duration-300"
              >
                Contact
              </a>
              <a
                href="#"
                className="hover:text-gray-700 transition-colors duration-300"
              >
                Copyright 2024
              </a>
              <a
                href="#"
                className="hover:text-gray-700 transition-colors duration-300"
              >
                Site by SMP Architecture
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ArchitecturePortfolio;
