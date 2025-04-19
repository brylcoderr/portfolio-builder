import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Rocket, Zap, Github, CheckCircle2 } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 w-full h-full bg-gradient-to-br from-primary-500 to-secondary-600 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Create Your Developer</span>
                <span className="block text-primary-600">Portfolio in Minutes</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Showcase your skills, projects, and experience with our beautiful portfolio templates. 
                Perfect for developers, designers, and tech professionals.
              </p>
              <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-10">
                <div className="rounded-md shadow">
                  <Link
                    to="/register"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get Started
                  </Link>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <Link
                    to="/templates"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    Browse Templates
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Demo Showcase */}
      <div className="relative py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Beautiful Portfolio Templates
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Choose from our selection of professionally designed templates
            </p>
          </motion.div>

          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((template) => (
                <motion.div 
                  key={template}
                  className="rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: template * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <img 
                    src={`https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} 
                    alt={`Template ${template}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6 bg-white">
                    <h3 className="text-lg font-medium text-gray-900">Modern Developer {template}</h3>
                    <p className="mt-2 text-base text-gray-500">A clean, minimal portfolio template perfect for showcasing your projects.</p>
                    <div className="mt-4">
                      <Link
                        to={`/templates/${template}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-primary-50 hover:bg-primary-100"
                      >
                        Preview Template
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/templates"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-50 hover:bg-primary-100"
              >
                View All Templates
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to showcase your work
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform provides all the tools you need to create a professional portfolio that stands out
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <motion.div 
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-4">
                  <Code size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-900">GitHub Integration</h3>
                <p className="mt-2 text-base text-gray-500">
                  Automatically showcase your GitHub repositories directly in your portfolio.
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-4">
                  <Zap size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Fast and Responsive</h3>
                <p className="mt-2 text-base text-gray-500">
                  All of our templates are fully responsive and optimized for speed.
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-4">
                  <Rocket size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Easy Customization</h3>
                <p className="mt-2 text-base text-gray-500">
                  Customize colors, fonts, and sections to match your personal brand.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Choose the plan that's right for you
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
            <motion.div 
              className="border border-gray-200 rounded-lg shadow-sm p-8 bg-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold text-gray-900">Free</h3>
              <p className="mt-4 text-sm text-gray-500">Get started with basic features</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">$0</span>
                <span className="text-base font-medium text-gray-500">/mo</span>
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-sm text-gray-700">1 portfolio</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-sm text-gray-700">Basic templates</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-sm text-gray-700">GitHub integration</p>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>

            <motion.div 
              className="border border-primary-200 rounded-lg shadow-sm p-8 bg-white relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                <div className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary-500 text-white">
                  Most Popular
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Pro</h3>
              <p className="mt-4 text-sm text-gray-500">Perfect for individual developers</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">$9</span>
                <span className="text-base font-medium text-gray-500">/mo</span>
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-sm text-gray-700">3 portfolios</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-sm text-gray-700">Premium templates</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-sm text-gray-700">Custom domain</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-sm text-gray-700">Analytics</p>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  to="/register?plan=pro"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  Get Pro
                </Link>
              </div>
            </motion.div>

            <motion.div 
              className="border border-gray-200 rounded-lg shadow-sm p-8 bg-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold text-gray-900">Team</h3>
              <p className="mt-4 text-sm text-gray-500">For teams and agencies</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">$29</span>
                <span className="text-base font-medium text-gray-500">/mo</span>
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-sm text-gray-700">Unlimited portfolios</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-sm text-gray-700">All templates</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-sm text-gray-700">Team management</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-sm text-gray-700">Priority support</p>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  to="/register?plan=team"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  Get Team
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary-700">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white text-center">
            Ready to showcase your developer skills?
          </h2>
          <p className="mt-4 text-lg leading-6 text-primary-200 text-center">
            Join thousands of developers who have created stunning portfolios with our platform.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50"
            >
              Get started for free
            </Link>
            <Link
              to="/templates"
              className="ml-3 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-800"
            >
              Browse templates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;