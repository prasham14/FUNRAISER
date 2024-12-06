import React from 'react';

const items = [
  {
    title: 'Start Your Fundraiser with Ease',
    description: 'Launch a fundraiser effortlessly and reach a wide audience, connecting with supporters across the platform.',
  },
  {
    title: 'Maximized Reach and Visibility',
    description: 'Get noticed! Our platform optimizes visibility, ensuring your cause is seen by more potential donors ready to help.',
  },
  {
    title: 'Real-Time Updates and Engagement',
    description: 'Stay connected with your supporters through live updates and activity tracking, fostering real-time engagement.',
  },
  {
    title: 'Insights to Boost Your Impact',
    description: 'Access insights into your fundraiser’s performance with detailed analytics, helping you make impactful decisions.',
  },
  {
    title: 'Support for Initiatives & NGOs',
    description: 'Launch and promote NGO projects or initiative programs with tools that amplify reach and impact, connecting you with passionate supporters.',
  }
  ,
  {
    title: 'Boosted Donor Engagement',
    description: 'Engage supporters with personalized messages, updates, and thank-yous, making every donor feel valued.',
  },
];

export default function Highlights() {
  return (
    <div id="highlights" className="bg-[#f2f1ed] text-gray-800 pb-8 sm:pb-16">
      <div className="container mx-auto flex flex-col items-center gap-6 sm:gap-12">
        <div className="w-full sm:w-4/5 md:w-3/5 text-center sm:text-left">
          <h2 className="text-3xl font-bold text-black mb-4 flex  text-center justify-center sm:justify-start items-center">
            Why Choose Us?
          </h2>
          <p className="text-gray-600 text-center sm:text-left">
            Discover how our platform empowers fundraisers with visibility, engagement, and user-friendly tools designed to help you reach your goals.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex flex-col items-start max-w-[400px] hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-lg font-medium text-[#aa4528] mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

    </div>

  );
}
