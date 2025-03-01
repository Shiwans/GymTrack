import React from 'react';
import abouti from '../assets/abouti.png'

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section with Navigation */}
      <section className="relative h-64 bg-gray-800 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold mb-8">About</h1>
          <div className="flex space-x-8">
            <a href="#" className="hover:underline">Pricing</a>
            <a href="#" className="hover:underline">Location</a>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-12 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 pr-0 md:pr-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Shivaji Vyam Shala,</h2>
            <p className="text-gray-600 mb-4">where strength meets legacy.</p>
            
            <p className="mb-4">
              Inspired by the <strong>valor and discipline of Chhatrapati Shivaji Maharaj</strong>, our fitness center is a tribute to his indomitable spirit and dedication to excellence. At Shivaji Vyam Shala, we believe fitness is more than physical strength—it's about cultivating the <strong>courage, resilience, and determination</strong> that Shivaji Maharaj embodied.
            </p>
            
            <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-600 my-6">
              <p>"शिवाजी नसता जिंकला तरी झालत हा"</p>
            </blockquote>
            
            <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-600 my-6">
              <p>"जीवे की मरावे जयाचिया मुखी ते शब्द हे"</p>
            </blockquote>
          </div>
          <div className="md:w-1/3 mt-6 md:mt-0">
            <div className="relative h-64 md:h-auto">
              <img 
                src={abouti} 
                alt="Fitness equipment" 
                className="w-full h-full object-cover rounded"
              />
              {/* <div className="absolute inset-0 border-2 border-orange-500 rounded transform translate-x-4 translate-y-4 z-0"></div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-8 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
        <p className="mb-4">
          Our mission is to blend <strong>traditional</strong> values with modern fitness techniques, creating a space where individuals can <strong>harness their inner warrior</strong>. Whether you're here to build strength, improve endurance, or embark on a transformative journey, Shivaji Vyam Shala provides the tools, guidance, and motivation you need.
        </p>
        <p className="mb-4">
          Join us in honoring a legacy of greatness, and let's build not just bodies but unwavering spirits, one workout at a time.
        </p>
        <blockquote className="text-center border-t border-b border-gray-200 py-6 my-8">
          <p className="text-xl text-orange-500 italic">"Fitness is not just a goal; it's a way of life that honors the strength of our ancestors."</p>
        </blockquote>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Choose the Perfect Plan for Your Fitness Journey</h2>
          <p className="text-center text-gray-600 mb-8">Find the Right Fit and Start Transforming Your Life Today!</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1 Month Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6 text-center">
                <h3 className="font-medium text-gray-700">1 Month</h3>
                <div className="text-4xl font-bold text-orange-500 my-4">600</div>
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    Unlimited Access to Gym Equipment
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    Access to Group Fitness Classes
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    Personalized Workout Plan
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    Locker Room Access
                  </li>
                </ul>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded">
                  Get Started
                </button>
              </div>
              <div className="bg-gray-100 px-6 py-4 text-center">
                <button className="text-orange-500 hover:underline">Oustaide</button>
              </div>
            </div>

            {/* 6 Month Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-orange-500 transform scale-105 z-10">
              <div className="p-6 text-center">
                <h3 className="font-medium text-gray-700">6 Month</h3>
                <div className="text-4xl font-bold text-orange-500 my-4">1200</div>
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    Unlimited Access to Gym Equipment
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    Access to Group Fitness Classes
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    Personal Training Session per Month
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    Nutritional Guidance and Meal Plans
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    Access to Wellness Programs
                  </li>
                </ul>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded">
                  Get Started
                </button>
              </div>
              <div className="bg-gray-100 px-6 py-4 text-center">
                <button className="text-orange-500 hover:underline">Shivanagar</button>
              </div>
            </div>

            {/* 1 Year Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6 text-center">
                <h3 className="font-medium text-gray-700">1 year</h3>
                <div className="text-4xl font-bold text-orange-500 my-4">1800</div>
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    All Premium Plan Benefits
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    Weekly Personal Training Sessions
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    Customized Advanced Workout Plans
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    Monthly Wellness Seminars
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    VIP Access to New Classes
                  </li>
                </ul>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded">
                  Get Started
                </button>
              </div>
              <div className="bg-gray-100 px-6 py-4 text-center">
                <button className="text-orange-500 hover:underline">Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Visit Shivaji Vyam Shala</h2>
        <p className="text-center text-gray-600 mb-8">Conveniently Located to Serve Your Fitness Needs. Find Us and Start Your Journey Today!</p>
        
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 pr-0 md:pr-8">
          </div>
          <div className="md:w-1/2">
            <div className="bg-white p-6 border border-gray-200 rounded shadow-md">
              <h3 className="font-bold text-lg mb-4">Address</h3>
              <p className="font-medium mb-1">FitLife Studio</p>
              <p className="text-gray-600 mb-1">Shivanagar near metro Station</p>
              <p className="text-gray-600 mb-4">Pimpri - 400017</p>
            
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;