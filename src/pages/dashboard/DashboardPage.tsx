import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Github, 
  Calendar, 
  Globe 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getUserPortfolios, deletePortfolio } from '../../services/portfolioService';
import { Portfolio } from '../../types';

const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      if (!currentUser) return;
      
      try {
        const data = await getUserPortfolios(currentUser.uid);
        setPortfolios(data);
      } catch (err) {
        console.error('Error fetching portfolios:', err);
        setError('Failed to load your portfolios');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, [currentUser]);

  const handleDeletePortfolio = async (portfolioId: string) => {
    try {
      await deletePortfolio(portfolioId);
      setPortfolios(portfolios.filter(p => p.id !== portfolioId));
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting portfolio:', err);
      setError('Failed to delete portfolio');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            className="text-3xl font-bold text-gray-900"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Portfolios
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/dashboard/create"
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Portfolio
            </Link>
          </motion.div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {portfolios.length === 0 ? (
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-medium text-gray-900 mb-4">You don't have any portfolios yet</h2>
            <p className="text-gray-500 mb-6">
              Create your first portfolio to showcase your work and skills.
            </p>
            <Link
              to="/dashboard/create"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Portfolio
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio, index) => (
              <motion.div 
                key={portfolio.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-40 bg-gradient-to-r from-primary-500 to-secondary-600 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{portfolio.name}</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Last updated: {new Date(portfolio.updatedAt).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Globe className="h-4 w-4 mr-1" />
                    <span>
                      Status: {portfolio.isPublished ? (
                        <span className="text-green-600 font-medium">Published</span>
                      ) : (
                        <span className="text-amber-600 font-medium">Draft</span>
                      )}
                    </span>
                  </div>

                  {portfolio.socialLinks.github && (
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Github className="h-4 w-4 mr-1" />
                      <span>GitHub connected</span>
                    </div>
                  )}

                  <div className="mt-4 flex space-x-3">
                    <Link
                      to={`/dashboard/edit/${portfolio.id}`}
                      className="flex-1 flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                    
                    <Link
                      to={`/p/${portfolio.slug}`}
                      className="flex-1 flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Link>
                    
                    {deleteConfirm === portfolio.id ? (
                      <button
                        onClick={() => handleDeletePortfolio(portfolio.id)}
                        className="flex-1 flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                      >
                        Confirm
                      </button>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(portfolio.id)}
                        className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;