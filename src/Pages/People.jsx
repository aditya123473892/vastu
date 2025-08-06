import React from 'react';
import { Link } from 'react-router-dom';
import founder_Rahul from '../Assets/founder_Rahul.jpeg';
import founder_Sunny from '../Assets/founder_sunny.jpeg';

const TeamMember = ({ name, title, quote, imageSrc }) => {
  return (
    <div className="flex flex-col max-w-md mx-auto">
      <div className="mb-6">
        <img 
          src={imageSrc} 
          alt={name}
          className="w-full h-[32rem] object-cover object-center rounded-sm"
        />
      </div>
      <div className="text-left">
        <h3 className="text-sm font-medium text-gray-900 mb-2 tracking-wide uppercase">
          {name}
        </h3>
        <p className="text-xs text-gray-600 leading-tight mb-4">
          {title}
        </p>
        <blockquote className="text-xs text-gray-700 italic leading-relaxed border-l-2 border-gray-300 pl-4">
          "{quote}"
        </blockquote>
      </div>
    </div>
  );
};

const People = () => {
  const founders = [
    {
      name: "AR. SUNNY GUPTA",
      title: "FOUNDING PRINCIPAL | CO-FOUNDER",
      quote: "Architecture is not just about creating spaces, it's about crafting experiences that resonate with human emotions. Every line we draw, every material we choose, speaks to the soul of the place and its people. Our goal is to build not just structures, but sustainable legacies that inspire future generations.",
      imageSrc: founder_Sunny
    },
    {
      name: "AR. RAHUL LOKHANDE",
      title: "FOUNDING PRINCIPAL | CO-FOUNDER",
      quote: "In the intersection of tradition and innovation lies the future of architecture. We believe in creating designs that honor our cultural heritage while embracing modern functionality. Our business philosophy is simple: deliver excellence through collaboration, integrity, and a deep understanding of our clients' vision.",
      imageSrc: founder_Rahul
    }
  ];

  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 py-12 mt-16">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="mb-12">
          <h2 className="text-sm font-light text-gray-500 tracking-[0.2em] uppercase mb-2">
            Our Founders
          </h2>
          <div className="w-12 h-px bg-gray-300"></div>
        </div>
        <p className="text-base font-light text-gray-700 leading-relaxed max-w-2xl">
          Meet the visionary architects who founded VASTU DESIGN CONSULTANTS in 2011. Their collaborative approach and complementary expertise have shaped our firm's philosophy of creating contextually responsive and client-focused architectural solutions.
        </p>
      </div>

      {/* Founders Grid */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {founders.map((founder, index) => (
            <TeamMember
              key={index}
              name={founder.name}
              title={founder.title}
              quote={founder.quote}
              imageSrc={founder.imageSrc}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto pt-8 border-t border-gray-200">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
            <div className="space-y-2">
              <div className="text-xs font-light text-gray-500 tracking-[0.1em] uppercase">
                <span className="font-medium">FIRM NAME:</span> "VASTU DESIGN CONSULTANTS"
              </div>
              <div className="text-xs font-light text-gray-500 tracking-[0.1em]">
                <span className="font-medium">Postal address:</span> C/o. Godrej Interio Showroom, Laxmi Niwas, Empress Mills Road, Marwadi Chawl, Bajeriya, NAGPUR- 440018
              </div>
              <div className="text-xs font-light text-gray-500 tracking-[0.1em]">
                <span className="font-medium">E-MAIL:</span> vastudesignconsultant@gmail.com
              </div>
              <div className="text-xs font-light text-gray-500 tracking-[0.1em]">
                <span className="font-medium">Contact No.:</span> Ar. Sunny Gupta: 09372637087 | Ar. Rahul Lokhande: 9545672125
              </div>
            </div>
            <div className="text-xs font-light text-gray-500 tracking-[0.1em] uppercase">
              © COPYRIGHT 2025 VASTU DESIGN CONSULTANTS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default People;