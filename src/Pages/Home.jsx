import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useImages } from "../services/api";

const ArchitecturePortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { images, loading, error } = useImages();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Filter images to only include 'built' or 'unbuilt' categories
  const filteredImages = images.filter(img => 
    img.category === 'built' || img.category === 'unbuilt'
  );

  // Group filtered images by title
  const groupedImages = filteredImages.reduce((acc, img) => {
    if (!acc[img.title]) {
      acc[img.title] = [];
    }
    acc[img.title].push(img);
    return acc;
  }, {});

  // Convert to array for rendering
  const allProjects = Object.entries(groupedImages);

  return (
    <div className="min-h-screen bg-white">
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

          {/* Loading and Error States */}
          {loading && (
            <div className="text-center py-16">
              <p className="text-gray-500">Loading projects...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-16">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {/* Projects Grid - ONLY BUILT OR UNBUILT PROJECTS */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {allProjects.map(([title, groupImages]) => (
                <Link 
                  key={title} 
                  to={`/gallery/${encodeURIComponent(title)}`}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[4/3] bg-gray-100 mb-6 overflow-hidden relative">
                    <img
                      src={`http://localhost:4000/api/images/${groupImages[0].id}/data`}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {groupImages.length > 1 && (
                      <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full w-10 h-10 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">+{groupImages.length - 1}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-light text-gray-900 tracking-wide">
                      {title}
                    </h3>
                    <p className="text-xs font-light text-gray-500 tracking-[0.15em] uppercase">
                      {groupImages[0].category || 'Uncategorized'}
                    </p>
                    {groupImages[0].description && (
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                        {groupImages[0].description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
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
                VASTU DESIGN CONSULTANTS
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
                Site by VASTU DESIGN CONSULTANTS
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ArchitecturePortfolio;