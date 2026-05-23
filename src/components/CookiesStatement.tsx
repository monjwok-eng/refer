import React from "react";
import { Link } from "react-router-dom";
import { Cookie, ArrowLeft } from "lucide-react";

export default function CookiesStatement() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#ffcc00]/10 rounded-full flex items-center justify-center text-[#ffcc00]">
              <Cookie size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Cookies Statement</h1>
          </div>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We use cookies and similar technologies to provide the necessary site functionality, and improve your experience on our website. This Cookies Statement explains what cookies are, how we use them, and your choices regarding our use of cookies.
            </p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. What are cookies?</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
            </p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. How we use cookies</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We use the following types of cookies:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li><strong>Strictly Necessary Cookies:</strong> These cookies are essential for you to browse the website and use its features, such as accessing secure areas of the site.</li>
              <li><strong>Performance/Analytics Cookies:</strong> These cookies collect information about how you use our website, like which pages you visited and which links you clicked on. None of this information can be used to identify you.</li>
              <li><strong>Functionality Cookies:</strong> These cookies allow our website to remember choices you make and provide enhanced, more personal features.</li>
              <li><strong>Targeting/Advertising Cookies:</strong> These cookies are used to deliver advertisements more relevant to you and your interests.</li>
            </ul>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Managing your cookie preferences</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              You can manage your cookie preferences at any time by clicking the "Manage Cookie Preferences" link in the footer of our website. Additionally, most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit www.aboutcookies.org or www.allaboutcookies.org.
            </p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Contact us</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              If you have any questions about our use of cookies, please contact us at privacy@example.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
