import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Loader } from 'lucide-react';
import AgrilinkSpinner from '../Spinner';

// Card Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>
    {children}
  </div>
);

const Newsletter = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sampleArticles = [
    {
      title: "New Sustainable Farming Techniques Show Promise in Increasing Crop Yields",
      description: "Research shows that implementing regenerative agriculture practices can increase farm productivity while reducing environmental impact.",
      publishedAt: "2025-01-09T08:00:00Z",
      url: "#",
      image: "https://therealdeal.com/wp-content/uploads/2017/04/Farmland_-_geograph.org_.uk_-_11688.jpg",
      source: { name: "Agricultural Weekly" }
    },
    {
      title: "Global Climate Change Impact on Agricultural Production",
      description: "Scientists predict shifting weather patterns will require farmers to adapt their growing strategies in the coming years.",
      publishedAt: "2025-01-08T14:30:00Z",
      url: "#",
      image: "https://www.cmegroup.com/content/dam/cmegroup/newsletters/quarterly-agriculture-report/2023-q3-ag-update-thumbnail-940x600.jpg",
      source: { name: "Farm Technology Review" }
    },
    {
      title: "Innovation in Irrigation: Smart Water Management Systems",
      description: "New IoT-based irrigation systems help farmers optimize water usage and reduce costs while maintaining crop health.",
      publishedAt: "2025-01-08T10:15:00Z",
      url: "#",
      image: "https://www.utas.edu.au/__data/assets/image/0011/1637264/People-in-paddock-at-Forthside.jpg",
      source: { name: "AgTech Today" }
    },
    {
      title: "Organic Farming Market Shows Continued Growth",
      description: "Consumer demand for organic produce continues to rise, creating new opportunities for farmers considering organic certification.",
      publishedAt: "2025-01-07T16:45:00Z",
      url: "#",
      image: "https://www.startus-insights.com/wp-content/uploads/2018/08/IndustryCover-Agriculture_1120x630_Startus-Insights-420x236.webp",
      source: { name: "Market Agriculture" }
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setArticles(sampleArticles);
      setLoading(false);
    }, 1000);

  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back button */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        {/* Page Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Agricultural News & Updates</h1>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-screen">
          <AgrilinkSpinner size={150} color="#1F4D4D" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="p-6 text-center text-red-600">
            <p>{error}</p>
          </Card>
        )}

        {/* Articles Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-gray-500">{article.source.name}</span>
                      <span className="text-sm text-gray-500">{formatDate(article.publishedAt)}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 leading-tight">
                      {article.title}
                    </h2>
                  </div>
                  <p className="text-gray-600 line-clamp-3">
                    {article.description}
                  </p>
                  <a 
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                  >
                    <span>Read more</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsletter;