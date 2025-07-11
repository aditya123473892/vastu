import React from 'react';
import { Link } from 'react-router-dom';
import imagePRo from '../Assets/imagePRo.avif';


const TeamMember = ({ name, title, subtitle, imageSrc }) => {
  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <img 
          src={imageSrc} 
          alt={name}
          className="w-full h-64 object-cover rounded-sm"
        />
      </div>
      <div className="text-left">
        <h3 className="text-sm font-medium text-gray-900 mb-1 tracking-wide uppercase">
          {name}
        </h3>
        <p className="text-xs text-gray-600 leading-tight">
          {title}
          {subtitle && (
            <>
              <br />
              <span className="text-gray-500">{subtitle}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

const People = () => {
  const teamMembers = [
    {
      name: "BRIAN SPENCER",
      title: "AIA | FOUNDING PRINCIPAL",
      imageSrc:  imagePRo
    },
    {
      name: "RANDY MAXWELL",
      title: "AIA, NCARB, LEED AP | PRINCIPAL",
      imageSrc:  imagePRo
    },
    {
      name: "PHILIP PARTINGTON",
      title: "AIA, NCARB | PRINCIPAL",
      imageSrc:  imagePRo
    },
    {
      name: "WILLIAM BRANTLEY",
      title: "AIA, NCARB | PRINCIPAL",
      imageSrc:  imagePRo
    },
    {
      name: "DAN GIRARDIN",
      title: "LEED AP",
      subtitle: "PRINCIPAL | SENIOR PROJECT MANAGER | ARCHITECTURAL DESIGNER",
      imageSrc:  imagePRo
    },
    {
      name: "ISABELLA PRUDHOMME",
      title: "DESIGN ASSOCIATE",
      imageSrc:  imagePRo
    },
    {
      name: "BOBBY KICKLITER",
      title: "B1 | ASSOCIATE",
      imageSrc:  imagePRo
    },
    {
      name: "ALINA TEIXEIRA",
      title: "DESIGNER",
      imageSrc: imagePRo
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center mt-16">
      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
        {teamMembers.slice(0, 6).map((member, index) => (
          <TeamMember
            key={index}
            name={member.name}
            title={member.title}
            subtitle={member.subtitle}
            imageSrc={member.imageSrc}
          />
        ))}
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between pt-8 border-t border-gray-200 w-full max-w-6xl">
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

export default People;