import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  X,
  Trash2,
  Edit3,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  views: number;
}

export default function PostBlogPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
  });

  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "How to save $500 on your next purchase",
      excerpt:
        "Learning the ins and outs of referral codes can save you a fortune...",
      date: "Oct 12, 2023",
      views: 242,
    },
  ]);

  const isValid = blogData.title && blogData.content;

  const handleCreate = () => {
    const newPost: BlogPost = {
      id: Date.now(),
      title: blogData.title,
      excerpt: blogData.content.substring(0, 100) + "...",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      views: 0,
    };
    setPosts([newPost, ...posts]);
    const businessName = localStorage.getItem("businessName") || "Business";
    localStorage.setItem(`blog_posted_${businessName}`, "true"); // Track for checklist
    setBlogData({ title: "", content: "" });
    setIsModalOpen(false);
  };

  const deletePost = (id: number) => {
    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
    if (updated.length === 0) {
      const businessName = localStorage.getItem("businessName") || "Business";
      localStorage.removeItem(`blog_posted_${businessName}`);
    }
  };

  return (
    <>
      <div className="max-w-[1000px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <h1 className="text-[32px] font-bold text-[#222325] tracking-tight italic">
              Blog
            </h1>
            <p className="text-slate-400 text-[14px] mt-1">
              Share updates with your advocates.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto justify-center bg-[#222325] text-white px-8 py-3 rounded-none font-bold hover:bg-black transition-all flex items-center gap-2"
          >
            <Plus size={18} />
            New Post
          </button>
        </div>

        {/* List */}
        <div className="grid grid-cols-1 gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between group hover:border-[#1dbf73] transition-colors gap-4 md:gap-0"
              >
                <div className="flex-1 min-w-0 pr-0 md:pr-8 w-full">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {post.date}
                    </span>
                    <span className="text-[10px] font-bold text-[#1dbf73] uppercase tracking-widest">
                      {post.views} Views
                    </span>
                  </div>
                  <h4 className="text-[20px] font-bold text-slate-900 mb-2 tracking-tight group-hover:underline">
                    {post.title}
                  </h4>
                  <p className="text-[14px] text-slate-400 font-light line-clamp-1 italic">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end border-t border-slate-100 md:border-0 pt-4 md:pt-0 mt-4 md:mt-0">
                  <button
                    onClick={() => deletePost(post.id)}
                    className="p-3 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button className="bg-slate-50 text-slate-900 border border-slate-200 px-6 py-3 rounded-none text-[12px] font-bold hover:bg-slate-100 transition-all flex items-center gap-2">
                    View
                    <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-32 flex flex-col items-center justify-center border border-slate-200 bg-white">
              <div className="w-12 h-12 mb-6 border border-slate-100 flex items-center justify-center text-slate-200">
                <Plus size={20} />
              </div>
              <h3 className="text-[16px] font-bold text-slate-900 mb-1">
                Empty Feed
              </h3>
              <p className="text-slate-400 mb-8 text-[13px] font-light">
                Tell your story to your community.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#222325] text-white px-10 py-3 rounded-none font-bold hover:bg-black transition-all text-[12px] uppercase tracking-widest"
              >
                Post First Blog
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#222325]/40"
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="relative w-full max-w-[600px] bg-white shadow-2xl flex flex-col"
            >
              <div className="p-10 pb-0 flex justify-between items-start">
                <h2 className="text-[24px] font-bold text-[#222325] tracking-tight italic">
                  Draft Post
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-300 hover:text-slate-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-10 space-y-6">
                <input
                  type="text"
                  value={blogData.title}
                  onChange={(e) =>
                    setBlogData((p) => ({ ...p, title: e.target.value }))
                  }
                  className="w-full px-0 py-4 border-b-2 border-slate-100 focus:border-[#1dbf73] outline-none transition-colors text-[20px] font-bold"
                  placeholder="Headline goes here..."
                />
                <textarea
                  value={blogData.content}
                  onChange={(e) =>
                    setBlogData((p) => ({ ...p, content: e.target.value }))
                  }
                  className="w-full px-0 py-4 border-b-2 border-slate-100 focus:border-[#1dbf73] outline-none transition-colors text-[16px] min-h-[200px] resize-none font-light leading-relaxed"
                  placeholder="Start writing..."
                />
              </div>

              <div className="p-10 pt-4">
                <button
                  onClick={handleCreate}
                  disabled={!isValid}
                  className="w-full bg-[#1dbf73] text-white py-5 rounded-none font-bold hover:bg-[#19a463] transition-all disabled:opacity-30 uppercase tracking-widest text-[14px]"
                >
                  Publish Post
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
