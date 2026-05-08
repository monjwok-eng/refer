import {useParams, Link} from 'react-router-dom';
import {DEALS} from '../constants';
import { Logo } from './Navbar';

export default function DealDetails() {
  const {id} = useParams();
  const deal = DEALS.find(d => d.id === parseInt(id!));

  if (!deal) return <div className="p-10">Deal not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="h-[80px] bg-white border-b border-gray-100 flex justify-between items-center px-8 sticky top-0 z-50">
        <Logo />
        <Link to="/dashboard" className="text-gray-600 font-display font-medium hover:text-[#1dbf73] transition-colors text-[16px]">Back to Dashboard</Link>
      </nav>
      <div className="max-w-4xl mx-auto p-10 bg-white mt-10 rounded-2xl shadow-sm border border-gray-100">
        <img src={deal.image} alt={deal.title} className="w-full h-64 object-cover rounded-xl mb-6" />
        <h2 className="text-4xl font-bold mb-2">{deal.title}</h2>
        <p className="text-xl text-[#1dbf73] font-medium mb-6">{deal.price}</p>
        <p className="text-gray-700 mb-8">{deal.description} Additional context about why this is a great deal and what's required for a successful referral.</p>
        
        <div className="flex gap-4">
          <button onClick={() => navigator.clipboard.writeText(`https://referr.com/ref/${deal.id}`)} className="bg-gray-800 text-white px-6 py-3 rounded-full font-bold hover:bg-gray-900 transition-all active:scale-[0.98]">
            Copy Referral Link
          </button>
          <a href={deal.video} download className="bg-white border-2 border-gray-300 px-6 py-3 rounded-full font-bold hover:border-[#1dbf73] text-gray-700">
            Download Promo Video
          </a>
        </div>
      </div>
    </div>
  );
}
