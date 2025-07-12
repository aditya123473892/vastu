import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const additionalImages = [
  // Placeholder images for the grid, replace with real data if available
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=450&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=450&fit=crop',
  'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&h=450&fit=crop',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=450&fit=crop',
  'https://images.unsplash.com/photo-1600607688960-e095bd8e0a3f?w=600&h=450&fit=crop',
  'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=600&h=450&fit=crop',
  'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=600&h=450&fit=crop',
  'https://images.unsplash.com/photo-1600607688876-4e2a09cf159d?w=600&h=450&fit=crop',
];

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id.toString() === id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!project) return <p className="text-center py-16">Project not found.</p>;

  return (
    <div className="bg-white min-h-screen">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <Link to="/project" className="inline-flex items-center text-xs text-gray-500 hover:text-gray-900 mb-4">
          <span className="mr-2">&#8592;</span> Back to Projects
        </Link>
      </div>
      {/* Main Image */}
      <div className="w-full aspect-[3/1] bg-gray-100 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title and Subtitle */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-light mb-2 tracking-wide">
          {project.name}
        </h1>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span className="text-xs text-gray-500 uppercase tracking-widest">
            {project.location}
          </span>
          <span className="text-xs text-gray-400 uppercase tracking-widest border border-gray-300 rounded px-2 py-0.5">
            {project.type}
          </span>
        </div>
        <div className="w-16 h-px bg-gray-300 mb-8"></div>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8">
          {project.description}
        </p>
      </div>

      {/* Image Grid */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 gap-6">
          {additionalImages.map((img, idx) => (
            <button
              key={idx}
              className="aspect-[4/3] bg-gray-100 overflow-hidden focus:outline-none"
              onClick={() => {
                setLightboxIndex(idx);
                setLightboxOpen(true);
              }}
              type="button"
            >
              <img
                src={img}
                alt={`Project additional ${idx + 1}`}
                className="w-full h-full object-cover cursor-zoom-in"
              />
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={additionalImages.map((src) => ({ src }))}
      />

      {/* Footer */}
      <div className="flex items-center justify-between pt-8 border-t border-gray-200 w-full max-w-6xl mx-auto mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">f</span>
            </div>
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">in</span>
            </div>
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">@</span>
            </div>
          </div>
          <span className="text-xs text-gray-400">
            (850) 432-7773
          </span>
          <span className="text-xs text-gray-400">
            CONNECT@SMP-ARCH.COM
          </span>
          <span className="text-xs text-gray-400">
            206 E INTENDENCIA ST, PENSACOLA, FL 32502
          </span>
        </div>
        <div className="text-xs text-gray-400">
          © COPYRIGHT 2024 VASTU DESIGN CONSULTANTS
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail; 