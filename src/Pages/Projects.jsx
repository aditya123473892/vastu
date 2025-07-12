import React, { useState } from 'react';
import { projects } from '../data';
import { Link } from 'react-router-dom';

const buildTabs = ['Build', 'Unbuild'];

const Projects = () => {
  const [activeNav, setActiveNav] = useState('WORKPLACE');
  const [activeTab, setActiveTab] = useState('Build');

  // Filter projects by activeTab (Build/Unbuild)
  const filteredProjects = projects.filter(
    (project) => project.type === activeTab
  );

  return (
    <div className="min-h-screen bg-white px-2 sm:px-4 md:px-8 pt-8">
      {/* Build/Unbuild Tabs */}
      <div className="flex justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-8 text-sm sm:text-base bg-white py-2 sm:py-4 border-b border-gray-200 sticky top-0 z-10 mt-8 sm:mt-12">
        {buildTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`uppercase tracking-widest font-semibold px-2 sm:px-4 py-1 sm:py-2  transition-colors duration-200 ${
              activeTab === tab
                ? 'text-gray-700 border-b-2 border-muted-700'
                : 'text-gray-400 hover:text-muted-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 md:gap-10 mb-10 sm:mb-16 w-full max-w-6xl">
          {filteredProjects.map((project) => (
            <Link key={project.id} to={`/project/${project.id}`} className="flex flex-col">
              <div className="w-full aspect-square mb-3 sm:mb-4 overflow-hidden rounded-sm bg-gray-100">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-medium text-gray-900 tracking-wide uppercase mb-1">
                  {project.name}
                </h3>
                <span className="text-xs text-gray-400 tracking-wide uppercase">
                  {project.location}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 border-t border-gray-200 w-full max-w-6xl mx-auto mb-8 gap-4 sm:gap-0 px-2 sm:px-0">
        <div className="flex items-center space-x-2 sm:space-x-4">
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

export default Projects;
