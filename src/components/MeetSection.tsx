export function MeetSection() {
  return (
    <div className="px-5 md:px-8 xl:px-32 py-10 sm:py-16 md:py-24 bg-[#050505]">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col gap-14 text-center">
          <div className="flex flex-col gap-4">
            <h2 className="clash-grotesk-font-family uppercase font-bold text-4xl md:text-5xl text-white">
              Meet Referr
            </h2>
            <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto text-white/60">
              Effortlessly create, customize, and track powerful referral campaigns - all in one intuitive platform.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-screen-xl overflow-hidden rounded-[8px] bg-white/5 shadow-2xl">
            <div className="aspect-video relative rounded-lg overflow-hidden border-[10px] border-[#131125]">
              <video 
                className="w-full h-full object-cover"
                autoPlay
                controls
                muted
                loop
                playsInline
                poster="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/ef51b45f79342925d5268e0b2377eae8-1704717764992/thumbnail.png"
                crossOrigin="anonymous"
              >
                <source src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/4934b0c8f6441211d97f83585a7c9c00-1722433273322/Vontelle%20Cutdown-%20Breakthrough%20V5" type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex items-start gap-4 border-t border-[#FF5EC4]/40 py-4">
              <div className="relative top-[3px] flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF5EC4" viewBox="0 0 256 256">
                  <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V96H40V56ZM40,112H96v88H40Zm176,88H112V112H216v88Z"></path>
                </svg>
              </div>
              <div className="max-w-2xl text-left">
                <h3 className="mb-2 text-lg font-semibold text-white">Customizable Campaigns for Every Business</h3>
                <p className="text-base md:text-lg font-medium text-white/60">
                  Choose from powerful referral templates built for any industry. Customize reward structures instantly to match your goals and brand.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 border-t border-[#FF5EC4]/40 py-4">
              <div className="relative top-[3px] flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF5EC4" viewBox="0 0 256 256">
                  <path d="M232,32a8,8,0,0,0-8-8c-44.08,0-89.31,49.71-114.43,82.63A60,60,0,0,0,32,164c0,30.88-19.54,44.73-20.47,45.37A8,8,0,0,0,16,224H92a60,60,0,0,0,57.37-77.57C182.3,121.31,232,76.08,232,32ZM92,208H34.63C41.38,198.41,48,183.92,48,164a44,44,0,1,1,44,44Zm32.42-94.45q5.14-6.66,10.09-12.55A76.23,76.23,0,0,1,155,121.49q-5.9,4.94-12.55,10.09A60.54,60.54,0,0,0,124.42,113.55Zm42.7-2.68a92.57,92.57,0,0,0-22-22c31.78-34.53,55.75-45,69.9-47.91C212.17,55.12,201.65,79.09,167.12,110.87Z"></path>
                </svg>
              </div>
              <div className="max-w-2xl text-left">
                <h3 className="mb-2 text-lg font-semibold text-white">Advanced Analytics & Tracking</h3>
                <p className="text-base md:text-lg font-medium text-white/60">
                  Track custom referrals with flexible reporting options, real-time dashboards, and full performance control without needing technical experience.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 border-t border-[#FF5EC4]/40 py-4">
              <div className="relative top-[3px] flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF5EC4" viewBox="0 0 256 256">
                  <path d="M248,124a56.11,56.11,0,0,0-32-50.61V72a48,48,0,0,0-88-26.49A48,48,0,0,0,40,72v1.39a56,56,0,0,0,0,101.2V176a48,48,0,0,0,88,26.49A48,48,0,0,0,216,176v-1.41A56.09,56.09,0,0,0,248,124ZM88,208a32,32,0,0,1-31.81-28.56A55.87,55.87,0,0,0,64,180h8a8,8,0,0,0,0-16H64A40,40,0,0,1,50.67,86.27,8,8,0,0,0,56,78.73V72a32,32,0,0,1,64,0v68.26A47.8,47.8,0,0,0,88,128a8,8,0,0,0,0,16,32,32,0,0,1,0,64Zm104-44h-8a8,8,0,0,0,0,16h8a55.87,55.87,0,0,0,7.81-.56A32,32,0,1,1,168,144a8,8,0,0,0,0-16,47.8,47.8,0,0,0-32,12.26V72a32,32,0,0,1,64,0v6.73a8,8,0,0,0,5.33,7.54A40,40,0,0,1,192,164Zm16-52a8,8,0,0,1-8,8h-4a36,36,0,0,1-36-36V80a8,8,0,0,1,16,0v4a20,20,0,0,0,20,20h4A8,8,0,0,1,208,112ZM60,120H56a8,8,0,0,1,0-16h4A20,20,0,0,0,80,84V80a8,8,0,0,1,16,0v4A36,36,0,0,1,60,120Z"></path>
                </svg>
              </div>
              <div className="max-w-2xl text-left">
                <h3 className="mb-2 text-lg font-semibold text-white">Automated Reward Payouts</h3>
                <p className="text-base md:text-lg font-medium text-white/60">
                  Manage payouts faster with automated systems that track referrals. Review, approve, and send rewards in minutes securely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
