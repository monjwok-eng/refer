import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  const sections = [
    {
      title: "Platform",
      links: [
        { name: "Referral Platform", href: "#" },
        { name: "Web Builder", href: "#" },
        { name: "Reward Rules", href: "#" },
        { name: "Analytics Dashboard", href: "#" },
        { name: "Ad Network", href: "#" },
        { name: "Growth Tools", href: "#" },
        { name: "Partner Earnings", href: "#" }
      ]
    },
    {
      title: "Referr for",
      links: [
        { name: "Business", href: "#" },
        { name: "Content Creators", href: "#" },
        { name: "Developers", href: "#" },
        { name: "Health & Fitness", href: "#" },
        { name: "Agencies", href: "#" },
        { name: "Consultants", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#" },
        { name: "Guides", href: "#" },
        { name: "Case Studies", href: "#" },
        { name: "Webinars", href: "#" },
        { name: "Partners", href: "#" },
        { name: "Comparisons", href: "#" }
      ]
    },
    {
      title: "Help",
      links: [
        { name: "Support Center", href: "#" },
        { name: "Community", href: "#" },
        { name: "Status Page", href: "#" },
        { name: "API Docs", href: "#" },
        { name: "Changelog", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Integrations", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-[#050505]">
      <div className="py-8 px-4 md:py-16 md:px-8 xl:px-32 text-white">
        <div className="mx-auto max-w-screen-xl">
          {/* Top Brand & Message Row */}
          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-6 md:gap-10 w-full pb-10 text-center md:text-left">
            <div className="flex items-center shrink-0 select-none mx-auto md:mx-0">
              <Logo size="lg" theme="dark" />
            </div>
          </div>

          {/* Mobile Accordion Menu (Visible only under md) */}
          <div className="md:hidden w-full border-t py-10 border-[#4E4E6C]">
            {sections.map(section => {
              const isOpen = openSection === section.title;
              return (
                <div key={section.title} className="border-b border-gray-700 last:border-b-0">
                  <button 
                    onClick={() => toggleSection(section.title)}
                    className="flex w-full items-center justify-between py-4 focus:outline-none"
                  >
                    <span className="text-sm font-bold">{section.title}</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="1em" 
                      height="1em" 
                      fill="currentColor" 
                      viewBox="0 0 256 256" 
                      className={`h-4 w-4 text-[#D6D6E0] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </button>
                  <div 
                    className="overflow-hidden transition-all duration-200"
                    style={{ maxHeight: isOpen ? `${section.links.length * 48}px` : "0px" }}
                  >
                    <div className="flex flex-col pb-2">
                      {section.links.map(link => (
                        <Link 
                          key={link.name}
                          to={link.href} 
                          className="py-3 px-2 text-[14px] font-medium text-[#D6D6E0] transition hover:bg-white/5 active:bg-white/10 rounded-md"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Grid Menu (Visible from md up) */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-10 w-full border-t border-b py-12 border-[#4E4E6C]">
            {sections.map(section => (
              <div key={section.title} className="flex flex-col items-center md:items-start text-center md:text-left">
                <p className="text-base font-bold mb-5 text-white">{section.title}</p>
                <div className="flex flex-col gap-3">
                  {section.links.map(link => (
                    <Link 
                      key={link.name}
                      to={link.href}
                      className="rounded-md text-sm font-medium text-[#D6D6E0] transition hover:underline cursor-pointer"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row & Newsletter Signup */}
          <div className="flex flex-col items-center justify-center py-8 md:flex-row md:justify-between gap-6">
            <div className="flex flex-col items-center md:items-start gap-6">
              <p className="max-w-lg font-bold text-center text-base md:text-left text-[#D6D6E0]">
                Get Referr updates delivered directly to your inbox.
              </p>
              <div className="mx-auto md:mx-0">
                <iframe
                  src="https://embeds.beehiiv.com/2437321d-52a5-4086-bceb-1550db1eed6d?slim=true"
                  data-test-id="beehiiv-embed"
                  title="Product updates newsletter sign up form powered by Referr"
                  height="52"
                  frameBorder="0"
                  scrolling="no"
                  style={{ margin: 0, borderRadius: "0px", backgroundColor: "transparent" }}
                  data-cmp-ab="2"
                  data-cmp-info="8"
                ></iframe>
              </div>
              <span className="leading-relaxed mt-4 block max-w-sm text-center text-[12px] md:text-left text-gray-400">
                By subscribing you agree to our{" "}
                <Link to="/docs" className="hover:underline text-white">Privacy Policy</Link>{" "}
                and provide consent to receive updates from our company.
              </span>
            </div>

            <div className="flex flex-col gap-8 justify-between items-center md:items-end w-full md:w-auto">
              <div className="flex items-center justify-center md:justify-end space-x-6 mb-auto">
                <a className="flex items-center justify-center transition-transform hover:scale-110" href="#" title="YouTube">
                  <span className="sr-only">YouTube</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="h-6 w-6 text-[#D6D6E0]">
                    <path d="M164.44,121.34l-48-32A8,8,0,0,0,104,96v64a8,8,0,0,0,12.44,6.66l48-32a8,8,0,0,0,0-13.32ZM120,145.05V111l25.58,17ZM234.33,69.52a24,24,0,0,0-14.49-16.4C185.56,39.88,131,40,128,40s-57.56-.12-91.84,13.12a24,24,0,0,0-14.49,16.4C19.08,79.5,16,97.74,16,128s3.08,48.5,5.67,58.48a24,24,0,0,0,14.49,16.41C69,215.56,120.4,216,127.34,216h1.32c6.94,0,58.37-.44,91.18-13.11a24,24,0,0,0,14.49-16.41c2.59-10,5.67-28.22,5.67-58.48S236.92,79.5,234.33,69.52Zm-15.49,113a8,8,0,0,1-4.77,5.49c-31.65,12.22-85.48,12-86,12H128c-.54,0-54.33.2-86-12a8,8,0,0,1-4.77-5.49C34.8,173.39,32,156.57,32,128s2.8-45.39,5.16-54.47A8,8,0,0,1,41.93,68c30.52-11.79,81.66-12,85.85-12h.27c.54,0,54.38-.18,86,12a8,8,0,0,1,4.77,5.49C221.2,82.61,224,99.43,224,128S221.2,173.39,218.84,182.47Z"></path>
                  </svg>
                </a>
                <a className="transition-transform hover:scale-110" href="#" title="TikTok">
                  <span className="sr-only">TikTok</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="h-6 w-6 text-[#D6D6E0]">
                    <path d="M224,72a48.05,48.05,0,0,1-48-48,8,8,0,0,0-8-8H128a8,8,0,0,0-8,8V156a20,20,0,1,1-28.57-18.08A8,8,0,0,0,96,130.69V88a8,8,0,0,0-9.4-7.88C50.91,86.48,24,119.1,24,156a76,76,0,0,0,152,0V116.29A103.25,103.25,0,0,0,224,128a8,8,0,0,0,8-8V80a8,8,0,0,0-8-8ZM-8,39.64a87.19,87.19,0,0,1-43.33-16.15A8,8,0,0,0,160,102v54a60,60,0,0,1-120,0c0-25.9,16.64-49.13,40-57.6v27.67A36,36,0,1,0,136,156V32h24.5A64.14,64.14,0,0,0,216,87.5Z"></path>
                  </svg>
                </a>
                <a className="transition-transform hover:scale-110" href="#">
                  <span className="sr-only">Instagram</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="h-6 w-6 text-[#D6D6E0]">
                    <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32,A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                  </svg>
                </a>
                <a className="transition-transform hover:scale-110" href="#">
                  <span className="sr-only">X</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="h-6 w-6 text-[#D6D6E0]">
                    <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
                  </svg>
                </a>
              </div>
              <div className="mt-auto text-center md:text-right">
                <span className="block text-sm text-gray-400 mb-4">© 2026 Referr, Inc. All rights reserved.</span>
                <div className="flex flex-row justify-center md:justify-end flex-wrap gap-1 md:gap-4">
                  <Link className="py-3 md:py-0 px-2 md:px-0 text-sm inline-block text-gray-400 hover:text-white transition-colors" to="/docs" title="Terms and Conditions">Terms</Link>
                  <Link className="py-3 md:py-0 px-2 md:px-0 text-sm inline-block text-gray-400 hover:text-white transition-colors" to="/docs" title="Privacy Policy">Privacy</Link>
                  <Link className="py-3 md:py-0 px-2 md:px-0 text-sm inline-block text-gray-400 hover:text-white transition-colors" to="/docs#privacy" title="California Privacy">California Privacy</Link>
                  <Link className="py-3 md:py-0 px-2 md:px-0 text-sm inline-block text-gray-400 hover:text-white transition-colors" to="/docs" title="DSAR Form">DSAR Form</Link>
                  <Link className="py-3 md:py-0 px-2 md:px-0 text-sm inline-block text-gray-400 hover:text-white transition-colors" to="/docs">Support</Link>
                  <Link className="py-3 md:py-0 px-2 md:px-0 text-sm inline-block text-gray-400 hover:text-white transition-colors" to="/docs">Security</Link>
                  <Link className="py-3 md:py-0 px-2 md:px-0 text-sm inline-block text-gray-400 hover:text-white transition-colors" to="/docs">Sitemap</Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
