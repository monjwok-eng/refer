import { Link } from 'react-router-dom';
import { DEALS } from '../constants';
import SidebarLayout from './SidebarLayout';
import { motion } from 'motion/react';
import { Search, Filter, ArrowRight } from 'lucide-react';

export default function Deals() {
  return (
    <SidebarLayout title="Explore Deals">
      <div className="mb-10">
        <h1 className="text-[32px] font-bold tracking-tight mb-2">Deal Opportunities</h1>
        <p className="text-[#62646a] text-lg font-light">Bridge the gap: connect companies with high-quality leads and earn.</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b5b6ba]" size={20} />
          <input 
            type="text" 
            placeholder="Search for services or clients..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-[#e4e5e7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1dbf73]/20 focus:border-[#1dbf73] transition-all text-[15px]"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 border border-[#e4e5e7] rounded-lg font-semibold text-[#62646a] bg-white hover:bg-gray-50 transition-colors">
          <Filter size={20} />
          <span>Filters</span>
        </button>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {DEALS.map((deal, idx) => (
          <motion.div 
            key={deal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-xl border border-[#e4e5e7] shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={deal.image} 
                alt={deal.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[12px] font-bold text-[#1dbf73] border border-white/20 shadow-sm">
                Verified Deal
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-xl leading-tight text-[#222325] group-hover:text-[#1dbf73] transition-colors">{deal.title}</h3>
              </div>
              <p className="text-[#62646a] text-[15px] mb-6 line-clamp-2 font-light">{deal.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-[#f1f1f1]">
                <div>
                  <p className="text-[11px] font-bold text-[#b5b6ba] uppercase tracking-wider mb-1">Commission</p>
                  <p className="text-[18px] font-bold text-[#222325]">{deal.price}</p>
                </div>
                <Link 
                  to={`/deal/${deal.id}`} 
                  className="flex items-center gap-2 text-[#1dbf73] font-bold text-[14px] hover:gap-3 transition-all"
                >
                  Details <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SidebarLayout>
  );
}
