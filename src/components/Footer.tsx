import { Link } from 'react-router-dom';

const footerSections = [
  {
    title: 'Top Referred Skills',
    links: [
      { name: 'Graphics & Design', to: '/categories/graphics-design' },
      { name: 'Digital Marketing', to: '/categories/online-marketing' },
      { name: 'Writing & Translation', to: '/categories/writing-translation' },
      { name: 'Video & Animation', to: '/categories/video-animation' },
      { name: 'Programming & Tech', to: '/categories/programming-tech' },
      { name: 'Business Consulting', to: '/categories/business' },
      { name: 'Lifestyle & Health', to: '/categories/lifestyle' },
    ]
  },
  {
    title: 'For Clients',
    links: [
        { name: 'How Referrals Work', to: '/how-it-works' },
        { name: 'Success Stories', to: '/success-stories' },
        { name: 'Trust & Safety', to: '/trust-safety' },
        { name: 'Our Mission', to: '/mission' },
    ]
  },
  {
    title: 'For Professionals',
    links: [
        { name: 'Build Reputation', to: '/reputation' },
        { name: 'Partner Program', to: '/partner' },
        { name: 'Community Hub', to: '/community' },
        { name: 'Professional Events', to: '/events' },
    ]
  },
  {
    title: 'Company',
    links: [
        { name: 'About Us', to: '/about' },
        { name: 'Careers', to: '/careers' },
        { name: 'Terms of Service', to: '/terms' },
        { name: 'Privacy Policy', to: '/privacy' },
    ]
  }
];

export default function Footer() {
  return (
    <footer className="bg-[#001e00] text-white py-16 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
        {footerSections.map((section) => (
          <div key={section.title}>
            <h4 className="font-bold text-white mb-6 text-[16px]">{section.title}</h4>
            <ul className="space-y-4">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link to={link.to} className="text-white/70 hover:text-white hover:underline transition-colors text-[14px]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="py-8">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
                <span className="text-[28px] font-black text-white tracking-tighter font-display">Referr<span className="text-[#1dbf73] text-[32px] leading-[0] ml-[1px]">.</span></span>
                <span className="text-white/40 text-[14px]">© Referr International Ltd. 2026</span>
            </div>
            <div className="flex items-center gap-8">
                <ul className="flex items-center gap-5">
                    <li>
                        <a href="#" className="text-white hover:text-[#1dbf73] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20" viewBox="0 0 24 24"><path d="M21 12.033C21 7.043 16.972 3 12 3s-9 4.043-9 9.033a9.028 9.028 0 006.826 8.765v-6.005H7.968v-2.76h1.858v-1.19c0-3.074 1.386-4.497 4.392-4.497.568 0 1.555.112 1.954.224v2.5a11.71 11.71 0 00-1.04-.033c-1.476 0-2.045.56-2.045 2.02v.976h2.941l-.504 2.76h-2.433V21C17.548 20.458 21 16.65 21 12.033z"></path></svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-white hover:text-[#1dbf73] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20" viewBox="0 0 24 24"><path d="M19.67 3H4.33C3.59 3 3 3.59 3 4.33v15.34C3 20.4 3.59 21 4.33 21h15.34c.73 0 1.33-.59 1.33-1.33V4.33C21 3.6 20.41 3 19.67 3zM8.36 18.33H5.65V9.74h2.71v8.6-.01zM7.01 8.55c-.86 0-1.56-.66-1.56-1.55s.7-1.55 1.56-1.55c.86 0 1.56.66 1.56 1.55s-.7 1.55-1.56 1.55zm11.33 9.79h-2.71v-4.7c0-1.39-.59-1.81-1.35-1.81-.8 0-1.59.6-1.59 1.85v4.66H9.98v-8.6h2.6v1.19h.03c.26-.53 1.18-1.43 2.57-1.43 1.51 0 3.14.9 3.14 3.52v5.32h.02z"></path></svg>
                        </a>
                    </li>
                </ul>
                <div className="flex items-center gap-6 text-white font-bold text-[14px]">
                    <button className="hover:text-[#1dbf73] transition-colors cursor-pointer bg-transparent border-none p-0 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58 0 0 3.58 0 8C0 12.42 3.58 16 8 16C12.42 16 16 12.42 16 8C16 3.58 12.42 0 8 0ZM7.5 14.45C4.07 14.15 1.5 11.28 1.5 8C1.5 7.6 1.54 7.21 1.62 6.83L5.5 10.71V11.5C5.5 12.33 6.17 13 7 13V14.45H7.5ZM12.78 12.03C12.52 11.45 11.96 11 11.3 11H10.5V9C10.5 8.45 10.05 8 9.5 8H6.5V6H8.5C9.05 6 9.5 5.55 9.5 5V4H11.5C12.28 4 12.92 4.6 13 5.37C13.91 6.11 14.5 7.15 14.5 8.35C14.5 9.85 13.8 11.18 12.78 12.03Z"></path></svg>
                        English
                    </button>
                    <button className="hover:text-[#1dbf73] transition-colors cursor-pointer bg-transparent border-none p-0">
                        $ USD
                    </button>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
