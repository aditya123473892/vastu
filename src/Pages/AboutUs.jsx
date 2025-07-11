import React from 'react';

const Step = ({ label }) => (
  <div className="flex flex-col items-center">
    <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-400 flex items-center justify-center mb-2 text-gray-700 font-semibold">
      <span className="text-sm">{label[0]}</span>
    </div>
    <span className="text-xs text-gray-600 uppercase tracking-widest">{label}</span>
  </div>
);

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 py-12 mt-16 ">
      {/* HISTORY Section */}
      <div className="flex flex-col lg:flex-row items-center mb-24">
        <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
          <img
            src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
            alt="Founders on rooftop"
            className="w-full max-w-xl rounded shadow"
          />
        </div>
        <div className="w-full lg:w-1/2 lg:pl-16">
          <h2 className="text-2xl font-light tracking-wide mb-6 uppercase">History</h2>
          <p className="text-gray-700 text-base leading-relaxed">
            Founded in 1989, VASTU DESIGN CONSULTANTS offers 30+ years of experience to the Gulf Coast community. Recognized for our commitment and passion for the Pensacola area, our team continues to make contributions as architects, developers, philanthropists, and even citizen elected representatives! After founding the firm, Principals Brian Spencer and Randy Maxwell welcomed Philip Partington in 2005 as the firm’s third principal. In 2019, William Brantley and Dan Girardin joined as firm principals. Today, VASTU DESIGN CONSULTANTS’s team of architects, designers and creative thinkers brings an unmatched level of diligence and youthful enthusiasm to each project.
          </p>
        </div>
      </div>

      {/* OUR WORK Section */}
      <div className="flex flex-col lg:flex-row items-center mb-24">
        <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
          <img
            src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
            alt="Our Work Building"
            className="w-full max-w-xl rounded shadow"
          />
        </div>
        <div className="w-full lg:w-1/2 lg:pl-16">
          <h2 className="text-2xl font-light tracking-wide mb-6 uppercase">Our Work</h2>
          <p className="text-gray-700 text-base leading-relaxed">
            VASTU DESIGN CONSULTANTS provides professional services in architecture, land planning, urban design, interior design, development, and construction administration. In collaboration with our interdisciplinary team of consultants we offer a full range of engineering services and stay fully engaged from the initial concept through construction. A design focused firm, we work on a wide range of project types of all scales: hospitality, single and multi-family residential, commercial office, medical office, adaptive re-use, civic, mixed-use and master planning. We believe this variety in our open studio environment fosters creativity. Projects are approached and addressed holistically, considering every potential impact in the community.
          </p>
        </div>
      </div>

      {/* OUR PROCESS Section */}
      <div className="bg-gray-50 rounded-lg py-12 px-4 sm:px-8 mt-12 mb-16">
        <h2 className="text-2xl font-light tracking-wide mb-6 uppercase text-center">Our Process</h2>
        <p className="text-gray-700 text-base leading-relaxed max-w-2xl mx-auto text-center mb-10">
          Our process is collaborative and transparent, ensuring every client is involved and informed at each stage. From the initial consultation to the final delivery, we focus on quality, creativity, and client satisfaction.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
          {/* Stepper */}
          <div className="flex flex-col sm:flex-row items-center w-full justify-center">
            <Step label="Consultation" />
            <div className="hidden sm:block flex-1 h-1 bg-gray-300 mx-2"></div>
            <Step label="Design" />
            <div className="hidden sm:block flex-1 h-1 bg-gray-300 mx-2"></div>
            <Step label="Development" />
            <div className="hidden sm:block flex-1 h-1 bg-gray-300 mx-2"></div>
            <Step label="Delivery" />
          </div>
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

export default AboutUs;
