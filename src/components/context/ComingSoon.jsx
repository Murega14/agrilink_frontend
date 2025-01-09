import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sprout, Sun, Cloud, Wind } from 'lucide-react';

const ComingSoon = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-blue-50 to-yellow-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 animate-spin-slow">
        <Sun className="w-16 h-16 text-yellow-400" />
      </div>
      <div className="absolute top-40 left-20 animate-bounce">
        <Cloud className="w-12 h-12 text-blue-300" />
      </div>
      <div className="absolute bottom-20 right-40 animate-pulse">
        <Wind className="w-12 h-12 text-blue-400" />
      </div>
      
      {/* Back Button */}
      <div className="p-6">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 bg-white/80 px-4 py-2 rounded-lg shadow-sm backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="animate-bounce mb-8">
          <Sprout className="w-24 h-24 text-green-500" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-500 to-yellow-500 text-center mb-6">
          Coming Soon
        </h1>
        
        <div className="max-w-2xl text-center space-y-6 backdrop-blur-sm bg-white/30 p-8 rounded-2xl shadow-xl">
          <p className="text-2xl text-gray-800">
            We're cultivating something special for our farmers
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-lg text-gray-700">
            <span className="px-4 py-2 bg-white/50 rounded-full">🌱 Better Insights</span>
            <span className="px-4 py-2 bg-white/50 rounded-full">🚜 Smart Tools</span>
            <span className="px-4 py-2 bg-white/50 rounded-full">📊 Deep Analytics</span>
            <span className="px-4 py-2 bg-white/50 rounded-full">🌿 Growth Solutions</span>
          </div>
        </div>

        {/* Growing Plants Animation */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="w-1 bg-green-500 rounded-t-full animate-grow"
              style={{
                height: '40px',
                animationDelay: `${i * 0.2}s`,
                opacity: 0.7
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const style = document.createElement('style');
style.textContent = `
  @keyframes grow {
    0% { height: 0; }
    100% { height: 40px; }
  }
  .animate-grow {
    animation: grow 2s ease-out infinite alternate;
  }
  .animate-spin-slow {
    animation: spin 8s linear infinite;
  }
`;
document.head.appendChild(style);

export default ComingSoon;