import React, { useState } from 'react';

const projectData = [
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    title: 'AMERICAN MAGIC',
    location: 'PENSACOLA, FL',
    type: 'Build',
  },
  {
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    title: 'SHADDIX PLASTIC SURGERY',
    location: 'PENSACOLA, FL',
    type: 'Build',
  },
 
  {
    image: 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=600&q=80',
    title: 'SPENCER LAW',
    location: 'PENSACOLA, FL',
    type: 'Unbuild',
  },
  {
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    title: 'CLARK PARTINGTON',
    location: 'PENSACOLA, FL',
    type: 'Unbuild',
  },
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    title: 'BANK OF PENSACOLA',
    location: 'PENSACOLA, FL',
    type: 'Unbuild',
  },

  {
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    title: 'SUNSET TOWER',
    location: 'MIAMI, FL',
    type: 'Build',
  },
  {
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    title: 'OCEAN VIEW RESIDENCE',
    location: 'TAMPA, FL',
    type: 'Build',
  },

  {
    image: 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=600&q=80',
    title: 'RIVERFRONT PLAZA',
    location: 'JACKSONVILLE, FL',
    type: 'Build',
  },
  {
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    title: 'CITY CENTER',
    location: 'TALLAHASSEE, FL',
    type: 'Unbuild',
  },
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    title: 'LAKE HOUSE',
    location: 'GAINESVILLE, FL',
    type: 'Build',
  },
];

const navItems = [
  'FEATURED', 'ALL', 'WORKPLACE', 'MULTI-FAMILY', 'RESIDENTIAL', 'HOSPITALITY', 'RESTAURANT', 'MIXED USE', 'MORE...'
];

const buildTabs = ['Build', 'Unbuild'];

const Projects = () => {
  const [activeNav, setActiveNav] = useState('WORKPLACE');
  const [activeTab, setActiveTab] = useState('Build');

  // Filter projects by activeTab (Build/Unbuild)
  const filteredProjects = projectData.filter(
    (project) => project.type === activeTab
  );

  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 pt-8">
      {/* Top Navigation */}
      <nav className="flex flex-wrap items-center border-b border-gray-200 pb-2 mb-8 text-xs uppercase tracking-widest text-gray-400">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveNav(item)}
            className={`mr-6 mb-2 font-medium transition-colors duration-200 ${activeNav === item ? 'text-gray-900 border-b-2 border-gray-900 pb-1' : 'hover:text-gray-700'}`}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Build/Unbuild Tabs */}
      <div className="flex justify-center space-x-6 mb-8 text-sm">
        {buildTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`uppercase tracking-widest font-medium transition-colors duration-200 ${activeTab === tab ? 'text-gray-900 border-b-2 border-gray-900 pb-1' : 'text-gray-400 hover:text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-10 mb-16">
          {filteredProjects.map((project, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="w-full aspect-square mb-4 overflow-hidden rounded-sm bg-gray-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-medium text-gray-900 tracking-wide uppercase mb-1">
                  {project.title}
                </h3>
                <span className="text-xs text-gray-400 tracking-wide uppercase">
                  {project.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
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

export default Projects;
