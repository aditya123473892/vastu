import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => (
  <div className="group cursor-pointer">
    <Link to={`/project/${project.id}`}>
      <div className="aspect-square bg-gray-100 mb-4 overflow-hidden rounded-sm">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="text-sm font-medium text-gray-900 tracking-wide uppercase mb-1">
        {project.name}
      </h3>
      <span className="text-xs text-gray-400 tracking-wide uppercase block">
        {project.location}
      </span>
      <span className="text-xs text-gray-500 tracking-wide uppercase block">
        {project.type}
      </span>
    </Link>
  </div>
);

export default ProjectCard; 