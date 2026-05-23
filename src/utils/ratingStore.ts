/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Review {
  id: string;
  reviewerName: string;
  avatar?: string;
  rating: number; // 1 to 5
  comment: string;
  timestamp: string;
}

export interface RatingSummary {
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}

const DEFAULT_BUSINESS_REVIEWS: Record<string, Review[]> = {
  "Aroma Coffee Roasters": [
    {
      id: "rev-b-1",
      reviewerName: "Mark Ssewankambo",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
      rating: 5,
      comment: "Aroma Coffee pays out commissions like clockwork! Highly trusted business. Very communicative.",
      timestamp: "2026-05-12T14:30:00Z"
    },
    {
      id: "rev-b-2",
      reviewerName: "Cissy Namara",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
      rating: 4.5,
      comment: "Excellent support materials and social banners. The commissions are highly profitable.",
      timestamp: "2026-05-20T09:15:00Z"
    }
  ],
  "Lumina Hair & Beauty": [
    {
      id: "rev-b-3",
      reviewerName: "Agnes Nakato",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
      rating: 5,
      comment: "Clients I've referred were extremely happy with the salon and my payout was instant! Recommend them.",
      timestamp: "2026-05-18T16:45:00Z"
    }
  ],
  "TechNest Hub": [
    {
      id: "rev-b-4",
      reviewerName: "John Mukasa",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
      rating: 4,
      comment: "Great team, good tracking systems. Payout was slightly delayed by 1 day, but they kept me updated throughout. Reliable!",
      timestamp: "2026-05-22T11:00:00Z"
    }
  ]
};

const DEFAULT_INFLUENCER_REVIEWS: Record<string, Review[]> = {
  "Mark Ssewankambo": [
    {
      id: "rev-i-1",
      reviewerName: "Aroma Coffee Roasters",
      rating: 5,
      comment: "Mark brought in 15 premium leads in a single week. High-quality traffic, strictly authentic. Incredible partner!",
      timestamp: "2026-05-14T10:00:00Z"
    }
  ],
  "Alice Namubiru": [
    {
      id: "rev-i-2",
      reviewerName: "Lumina Hair & Beauty",
      rating: 5,
      comment: "Alice represents our brand with outstanding integrity and high-quality, high-converting content. Will keep collaborating!",
      timestamp: "2026-05-19T13:20:00Z"
    }
  ],
  "Sarah Nabakooza": [
    {
      id: "rev-i-3",
      reviewerName: "TechNest Hub",
      rating: 4.5,
      comment: "Sarah is highly active and professional. Brought in very solid customer signups.",
      timestamp: "2026-05-23T08:00:00Z"
    }
  ]
};

// Initialize helper
export const initRatingStore = () => {
  if (!localStorage.getItem("referr_rating_store_initialized")) {
    localStorage.setItem("business_reviews", JSON.stringify(DEFAULT_BUSINESS_REVIEWS));
    localStorage.setItem("influencer_reviews", JSON.stringify(DEFAULT_INFLUENCER_REVIEWS));
    localStorage.setItem("referr_rating_store_initialized", "true");
  }
};

// Business Ratings API (rated by influencers)
export const getBusinessRatings = (businessName: string): RatingSummary => {
  initRatingStore();
  const raw = localStorage.getItem("business_reviews");
  if (!raw) return { averageRating: 5, totalReviews: 0, reviews: [] };
  
  try {
    const store = JSON.parse(raw);
    const reviews = store[businessName] || [];
    if (reviews.length === 0) {
      // Return a default positive rating if no reviews yet so they look trusted by default
      return { averageRating: 4.8, totalReviews: 2, reviews: [
        {
          id: `default-${businessName}-1`,
          reviewerName: "Top Referrer",
          rating: 5,
          comment: "Authentic, high-performing business. Very reliable tracker.",
          timestamp: new Date().toISOString()
        }
      ]};
    }
    
    const sum = reviews.reduce((acc: number, r: Review) => acc + r.rating, 0);
    const averageRating = parseFloat((sum / reviews.length).toFixed(1));
    return {
      averageRating,
      totalReviews: reviews.length,
      reviews: reviews.sort((a: Review, b: Review) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    };
  } catch (e) {
    return { averageRating: 5, totalReviews: 0, reviews: [] };
  }
};

export const addBusinessReview = (businessName: string, review: Omit<Review, "id" | "timestamp">) => {
  initRatingStore();
  const raw = localStorage.getItem("business_reviews") || "{}";
  try {
    const store = JSON.parse(raw);
    if (!store[businessName]) {
      store[businessName] = [];
    }
    
    const newReview: Review = {
      ...review,
      id: `rev-b-user-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    
    store[businessName].push(newReview);
    localStorage.setItem("business_reviews", JSON.stringify(store));
    
    // Dispatch event to update UI
    window.dispatchEvent(new Event("referr-ratings-update"));
  } catch (e) {
    console.error("Error adding business review:", e);
  }
};

// Influencer Ratings API (rated by businesses)
export const getInfluencerRatings = (influencerName: string): RatingSummary => {
  initRatingStore();
  const raw = localStorage.getItem("influencer_reviews");
  if (!raw) return { averageRating: 5, totalReviews: 0, reviews: [] };
  
  try {
    const store = JSON.parse(raw);
    const reviews = store[influencerName] || [];
    if (reviews.length === 0) {
      // Return beautiful default for any influencer
      return {
        averageRating: 4.7,
        totalReviews: 1,
        reviews: [
          {
            id: `default-${influencerName}-1`,
            reviewerName: "Premium Partner",
            rating: 5,
            comment: "Reliable distribution, excellent audience match.",
            timestamp: new Date().toISOString()
          }
        ]
      };
    }
    
    const sum = reviews.reduce((acc: number, r: Review) => acc + r.rating, 0);
    const averageRating = parseFloat((sum / reviews.length).toFixed(1));
    return {
      averageRating,
      totalReviews: reviews.length,
      reviews: reviews.sort((a: Review, b: Review) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    };
  } catch (e) {
    return { averageRating: 5, totalReviews: 0, reviews: [] };
  }
};

export const addInfluencerReview = (influencerName: string, review: Omit<Review, "id" | "timestamp">) => {
  initRatingStore();
  const raw = localStorage.getItem("influencer_reviews") || "{}";
  try {
    const store = JSON.parse(raw);
    if (!store[influencerName]) {
      store[influencerName] = [];
    }
    
    const newReview: Review = {
      ...review,
      id: `rev-i-user-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    
    store[influencerName].push(newReview);
    localStorage.setItem("influencer_reviews", JSON.stringify(store));
    
    // Dispatch event to update UI
    window.dispatchEvent(new Event("referr-ratings-update"));
  } catch (e) {
    console.error("Error adding influencer review:", e);
  }
};
