import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createCheckoutSession } from '../services/paymentService';

const PricingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Check if there's a plan in the URL params
  useEffect(() => {
    const planFromUrl = searchParams.get('plan');
    if (planFromUrl) {
      setSelectedPlan(planFromUrl);
    }
  }, [searchParams]);

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  const handleSubscribe = async (priceId: string) => {
    if (!currentUser) {
      // Redirect to register page with plan parameter
      navigate(`/register?plan=${selectedPlan}`);
      return;
    }

    setLoading(true);
    try {
      await createCheckoutSession(currentUser.uid, priceId);
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      name: 'Free',
      id: 'free',
      price: '$0',
      priceId: 'free',
      description: 'Get started with basic features',
      features: [
        '1 portfolio',
        'Basic templates',
        'GitHub integration',
        'Custom domain not included',
        'Limited analytics',
      ],
      notIncluded: [
        'Premium templates',
        'Custom domain',
        'Advanced analytics',
        'Priority support',
      ],
    },
    {
      name: 'Pro',
      id: 'pro',
      price: '$9',
      priceId: 'price_pro',
      description: 'Perfect for individual developers',
      features: [
        '3 portfolios',
        'All templates',
        'GitHub integration',
        'Custom domain',
        'Advanced analytics',
        'Priority email support',
      ],
      notIncluded: [
        'Team management',
      ],
      popular: true,
    },
    {
      name: 'Team',
      id: 'team',
      price: '$29',
      priceId: 'price_team',
      description: 'For teams and agencies',
      features: [
        'Unlimited portfolios',
        'All templates',
        'GitHub integration',
        'Custom domains',
        'Advanced analytics',
        'Team management',
        '24/7 priority support',
      ],
      notIncluded: [],
    },
  ];

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <motion.h2 
            className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p 
            className="mt-4 text-xl text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Choose the plan that's right for you
          </motion.p>
        </div>

        <motion.div 
          className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-x-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {plans.map((plan) => (
            <motion.div 
              key={plan.id}
              className={`rounded-lg shadow-sm divide-y divide-gray-200 ${
                plan.popular 
                  ? 'border-2 border-primary-500 relative' 
                  : 'border border-gray-200'
              } bg-white`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -mt-3 mr-3 px-3 py-1 rounded-full text-xs font-semibold bg-primary-500 text-white">
                  Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-base font-medium text-gray-500">/mo</span>
                </p>
                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`mt-8 w-full rounded-md py-2 px-4 text-sm font-medium text-white 
                    ${selectedPlan === plan.id 
                      ? 'bg-primary-700 hover:bg-primary-800' 
                      : 'bg-primary-600 hover:bg-primary-700'
                    }`}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-sm font-medium text-gray-900">What's included</h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">{feature}</p>
                    </li>
                  ))}
                  {plan.notIncluded && plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-start opacity-50">
                      <div className="flex-shrink-0">
                        <X className="h-5 w-5 text-gray-400" />
                      </div>
                      <p className="ml-3 text-sm text-gray-500">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          {selectedPlan && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {selectedPlan === 'free' ? (
                <Link
                  to={currentUser ? '/dashboard' : '/register'}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                >
                  {currentUser ? 'Go to Dashboard' : 'Sign up for free'}
                </Link>
              ) : (
                <button
                  onClick={() => handleSubscribe(`price_${selectedPlan}`)}
                  disabled={loading}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : currentUser ? 'Subscribe Now' : 'Sign up & Subscribe'}
                </button>
              )}
            </motion.div>
          )}
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center">Frequently Asked Questions</h3>
          <div className="mt-12 max-w-3xl mx-auto">
            <dl className="space-y-10">
              <div>
                <dt className="text-lg font-medium text-gray-900">Can I cancel my subscription?</dt>
                <dd className="mt-2 text-base text-gray-500">
                  Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access to your plan features until the end of your billing period.
                </dd>
              </div>
              <div>
                <dt className="text-lg font-medium text-gray-900">How do custom domains work?</dt>
                <dd className="mt-2 text-base text-gray-500">
                  With Pro and Team plans, you can connect your own domain to your portfolio. We provide simple instructions on how to set up the necessary DNS records.
                </dd>
              </div>
              <div>
                <dt className="text-lg font-medium text-gray-900">Can I switch plans later?</dt>
                <dd className="mt-2 text-base text-gray-500">
                  Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated amount for the remainder of your billing cycle.
                </dd>
              </div>
              <div>
                <dt className="text-lg font-medium text-gray-900">Do you offer a free trial?</dt>
                <dd className="mt-2 text-base text-gray-500">
                  We offer a free plan with basic features that you can use indefinitely. If you want to try out premium features, we recommend signing up for a month and canceling if it doesn't meet your needs.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;