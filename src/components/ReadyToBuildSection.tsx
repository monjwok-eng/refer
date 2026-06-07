import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ReadyToBuildSection() {
  return (
    <section className="bg-[#050505] py-12 md:py-24">
      <div className="max-w-[1240px] mx-auto px-5 md:px-8">
        {/* Background CTA container using the exact markup structure requested */}
        <div className="relative">
          {/* Desktop/Tablet Background Image */}
          <img 
            alt="" 
            loading="lazy" 
            width="1200" 
            height="1200" 
            decoding="async" 
            data-nimg="1" 
            className="hidden w-full sm:block" 
            style={{ color: "transparent" }} 
            srcSet="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1200,quality=75/www/homepage/bg-EndOfPageCTA.png 1x, https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=3840,quality=75/www/homepage/bg-EndOfPageCTA.png 2x" 
            src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=3840,quality=75/www/homepage/bg-EndOfPageCTA.png" 
            data-cmp-ab="2" 
            data-cmp-info="10"
            referrerPolicy="no-referrer"
          />
          {/* Mobile Background Image */}
          <img 
            alt="" 
            loading="lazy" 
            width="600" 
            height="600" 
            decoding="async" 
            data-nimg="1" 
            className="block w-full sm:hidden" 
            style={{ color: "transparent" }} 
            srcSet="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=640,quality=75/www/homepage/bg-EndOfPageCTA-mobile.png 1x, https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1200,quality=75/www/homepage/bg-EndOfPageCTA-mobile.png 2x" 
            src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1200,quality=75/www/homepage/bg-EndOfPageCTA-mobile.png" 
            data-cmp-ab="2" 
            data-cmp-info="10"
            referrerPolicy="no-referrer"
          />

          {/* Foreground Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12 z-25 bg-black/5 transform translate-y-3 md:translate-y-6">
            <div className="flex flex-col gap-4 items-center text-center">
              <h2 className="clash-grotesk-font-family uppercase font-bold text-xl sm:text-4xl md:text-5xl text-[#060419]">
                READY TO EARN?
              </h2>
              <p className="text-lg md:text-xl font-medium mx-auto max-w-xs text-sm sm:max-w-2xl sm:text-base text-[#060419]/90 mb-8">
                Unlock the power of your professional network today
              </p>
            </div>

            <div className="relative">
              {/* Cursor SVG pointing at the button */}
              <svg xmlns="http://www.w3.org/2000/svg" width="56" height="35" fill="none" className="absolute -right-10 top-11 z-30 pointer-events-none transform translate-x-1 translate-y-1">
                <g filter="url(#YouCursor)">
                  <rect width="40" height="20" x="11.684" y="10.68" fill="#FFDCFF" rx="10" shapeRendering="crispEdges"></rect>
                  <rect width="38" height="18" x="12.684" y="11.68" stroke="#060419" strokeWidth="2" rx="9" shapeRendering="crispEdges"></rect>
                  <path fill="#060419" d="M24.64 21.366 21.8 16.27h1.645l1.657 3.06c.061.116.115.223.161.323l.138.299c.039-.07.07-.134.092-.196.023-.061.05-.122.08-.184.04-.069.081-.15.127-.242l1.646-3.06h1.6l-2.831 5.097v3.314H24.64v-3.314Zm3.604.46c0-.59.13-1.108.391-1.553a2.76 2.76 0 0 1 1.082-1.059c.46-.253.982-.38 1.565-.38.59 0 1.112.127 1.565.38.46.254.82.606 1.081 1.06.261.444.392.962.392 1.552 0 .591-.13 1.113-.392 1.565-.26.445-.621.794-1.081 1.048-.453.253-.975.38-1.565.38a3.193 3.193 0 0 1-1.565-.38 2.784 2.784 0 0 1-1.082-1.048c-.26-.452-.391-.974-.391-1.564Zm1.404 0c0 .346.069.649.207.91.146.26.337.464.575.61.246.145.53.218.852.218.322 0 .606-.073.851-.219.246-.145.438-.349.576-.61.138-.26.207-.563.207-.909 0-.352-.07-.655-.207-.909a1.52 1.52 0 0 0-.576-.61 1.636 1.636 0 0 0-.851-.218c-.322 0-.606.073-.852.219-.238.145-.43.349-.575.61-.138.253-.207.556-.207.909Zm9.504-2.83h1.404v5.684h-1.3l-.104-.76c-.169.27-.422.488-.76.657a2.385 2.385 0 0 1-1.08.253c-.653 0-1.163-.207-1.531-.622-.368-.414-.553-.966-.553-1.657v-3.555h1.404v3.06c0 .538.104.925.311 1.163.207.238.506.357.898.357.444 0 .774-.13.99-.392.214-.268.321-.67.321-1.208v-2.98Z"></path>
                </g>
                <path fill="#FFDCFF" stroke="#060419" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10.34 10.336 7.398-2.066a.72.72 0 0 0 .025-1.367L1.95 1.038a.719.719 0 0 0-.913.91L6.902 17.76a.72.72 0 0 0 1.367-.024l2.07-7.4Z"></path>
                <defs>
                  <filter id="YouCursor" width="44" height="24" x="11.684" y="10.68" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                    <feOffset dx="4" dy="4"></feOffset>
                    <feComposite in2="hardAlpha" operator="out"></feComposite>
                    <feColorMatrix values="0 0 0 0 0.0235294 0 0 0 0 0.0156863 0 0 0 0 0.0980392 0 0 0 0.2 0"></feColorMatrix>
                    <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_2193_98229"></feBlend>
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_2193_98229" result="shape"></feBlend>
                  </filter>
                </defs>
              </svg>

              <Link
                to="/signin"
                className="custom-box-shadow-button relative flex cursor-pointer justify-center select-none p-0 outline-none border-none bg-transparent"
              >
                <div className="text-white bg-[#2F39BA] hover:bg-[#3d48cf] border-[#2F39BA] border rounded-[6px] text-base lg:text-lg font-bold leading-6 h-[58px] px-8 whitespace-nowrap flex items-center justify-center text-center custom-box-shadow-text relative z-10 gap-2">
                  Get started for free
                  <ArrowRight size={20} />
                </div>
                <div className="bg-[#F092DD] rounded-[6px] transform-style-preserve-3d custom-box-shadow-2 absolute inset-0 h-full w-full border border-[#0B0D2A] z-0"></div>
                <div className="bg-[#FFC8EB] rounded-[6px] transform-style-preserve-3d custom-box-shadow-1 absolute inset-0 h-full w-full border border-[#0B0D2A] z-0"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
