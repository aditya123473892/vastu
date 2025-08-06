import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 py-12 mt-16">
      {/* Company History Section */}
      <div className="max-w-4xl mx-auto mb-24">
        <div className="mb-12">
          <h2 className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase mb-2">
            Company History
          </h2>
          <div className="w-12 h-px bg-gray-300"></div>
        </div>
        
        <div className="space-y-6">
          <p className="text-base font-light text-gray-700 leading-relaxed">
            <span className="font-medium">Established in 2011 | Based in Nagpur, Maharashtra</span>
          </p>
          <p className="text-base font-light text-gray-700 leading-relaxed">
            Founded in 2011 by <span className="font-medium">Ar. Sunny Gupta</span> and <span className="font-medium">Ar. Rahul Lokhande</span>, "Vastu Design Consultants" has grown into a well-regarded architectural practice based in Nagpur, with a design philosophy rooted in context, functionality, and innovation. With over a decade of professional experience, the firm has developed a diverse portfolio of work spanning residential, commercial, institutional, and interior projects in and around Nagpur.
          </p>
          <p className="text-base font-light text-gray-700 leading-relaxed">
            The partners, both graduates of one of the leading architectural schools in India, bring complementary strengths in design and technical execution. Their collaborative approach forms the backbone of the firm's operations, blending creativity with precision to deliver contextually responsive and client-focused solutions.
          </p>
          <p className="text-base font-light text-gray-700 leading-relaxed">
            Over the years, "VASTU DESIGN CONSULTANTS" has consistently demonstrated an ability to handle projects of various scales and complexities — from compact residential interiors to large institutional campuses, from private residential to commercial office spaces. The firm's work is characterized by clarity in design, attention to detail, and an understanding of materials and construction techniques.
          </p>
          <p className="text-base font-light text-gray-700 leading-relaxed">
            As "VASTU DESIGN CONSULTANTS" moves into its next phase, it continues to evolve its design language while staying grounded in its founding principles of collaboration, integrity, and excellence in design.
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <div className="max-w-4xl mx-auto mb-24">
        <div className="mb-12">
          <h2 className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase mb-2">
            Our Vision
          </h2>
          <div className="w-12 h-px bg-gray-300"></div>
        </div>
        
        <p className="text-base font-light text-gray-700 leading-relaxed">
          To be a trusted design studio in society to be known for delivering intelligent, sustainable, and meaningful built environments that enhance society and lifestyle.
        </p>
      </div>

      {/* Key Highlights Section */}
      <div className="max-w-4xl mx-auto mb-24">
        <div className="mb-12">
          <h2 className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase mb-2">
            Key Highlights
          </h2>
          <div className="w-12 h-px bg-gray-300"></div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-base font-light text-gray-600 tracking-[0.1em] uppercase">Year Established</span>
            <span className="text-base font-medium text-gray-900">2011</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-base font-light text-gray-600 tracking-[0.1em] uppercase">Founders</span>
            <span className="text-base font-medium text-gray-900">Ar. Sunny Gupta & Ar. Rahul Lokhande</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-base font-light text-gray-600 tracking-[0.1em] uppercase">Location</span>
            <span className="text-base font-medium text-gray-900">Nagpur, Maharashtra</span>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-4xl mx-auto mb-24">
        <div className="mb-12">
          <h2 className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase mb-2">
            Our Services
          </h2>
          <div className="w-12 h-px bg-gray-300"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="py-2 border-b border-gray-100">
              <span className="text-base font-light text-gray-700">Architectural Design</span>
            </div>
            <div className="py-2 border-b border-gray-100">
              <span className="text-base font-light text-gray-700">Interior Design</span>
            </div>
            <div className="py-2 border-b border-gray-100">
              <span className="text-base font-light text-gray-700">Building Permit and Liaisoning work</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="py-2 border-b border-gray-100">
              <span className="text-base font-light text-gray-700">Site Planning</span>
            </div>
            <div className="py-2 border-b border-gray-100">
              <span className="text-base font-light text-gray-700">Project Visualization & 3D Rendering</span>
            </div>
            <div className="py-2 border-b border-gray-100">
              <span className="text-base font-light text-gray-700">Execution Support & Site Supervision</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Types Section */}
      <div className="max-w-4xl mx-auto mb-24">
        <div className="mb-12">
          <h2 className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase mb-2">
            Select Project Types
          </h2>
          <div className="w-12 h-px bg-gray-300"></div>
        </div>
        
        <div className="space-y-4">
          <div className="py-2 border-b border-gray-100">
            <span className="text-base font-light text-gray-700">Private Residences (bungalows, duplex homes)</span>
          </div>
          <div className="py-2 border-b border-gray-100">
            <span className="text-base font-light text-gray-700">Commercial Spaces (offices & showrooms)</span>
          </div>
          <div className="py-2 border-b border-gray-100">
            <span className="text-base font-light text-gray-700">Institutional (schools)</span>
          </div>
          <div className="py-2 border-b border-gray-100">
            <span className="text-base font-light text-gray-700">Interior Architecture (residential, offices & clinics)</span>
          </div>
        </div>
      </div>

      {/* What Sets Us Apart Section */}
      <div className="max-w-4xl mx-auto mb-24">
        <div className="mb-12">
          <h2 className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase mb-2">
            What Sets Us Apart
          </h2>
          <div className="w-12 h-px bg-gray-300"></div>
        </div>
        
        <div className="space-y-4">
          <div className="py-2 border-b border-gray-100">
            <span className="text-base font-light text-gray-700">Design Approach: Context-driven, modern yet rooted in conventional method.</span>
          </div>
          <div className="py-2 border-b border-gray-100">
            <span className="text-base font-light text-gray-700">Team Strength: Small, agile studio model with dedicated support consultants</span>
          </div>
          <div className="py-2 border-b border-gray-100">
            <span className="text-base font-light text-gray-700">14+ years of hands-on project experience.</span>
          </div>
          <div className="py-2 border-b border-gray-100">
            <span className="text-base font-light text-gray-700">In-depth local knowledge of Nagpur.</span>
          </div>
          <div className="py-2 border-b border-gray-100">
            <span className="text-base font-light text-gray-700">Emphasis on climate-sensitive and cost-effective design.</span>
          </div>
          <div className="py-2 border-b border-gray-100">
            <span className="text-base font-light text-gray-700">Seamless coordination with engineers, contractors, and consultants.</span>
          </div>
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

export default AboutUs;
