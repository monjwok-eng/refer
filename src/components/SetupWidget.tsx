import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SetupWidget({
  onCreateSite,
  isCreatingSite = false,
}: {
  onCreateSite?: () => void;
  isCreatingSite?: boolean;
}) {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    {
      title: "Create your site",
      done: false,
      action: "Create Site",
      route: "/create-site",
    },
    {
      title: "Post your first deal",
      done: false,
      action: "Post Deal",
      route: "/dashboard/deals",
    },
  ]);

  useEffect(() => {
    const businessName = localStorage.getItem("businessName") || "Business";
    const isPublished = localStorage.getItem(`site_created_${businessName}`) === "true";
    const hasPostedDeal = localStorage.getItem(`deal_posted_${businessName}`) === "true";

    setTasks((prev) =>
      prev.map((t) => {
        if (t.title === "Create your site" && isPublished)
          return { ...t, done: true };
        if (t.title === "Post your first deal" && hasPostedDeal)
          return { ...t, done: true };
        return t;
      }),
    );
  }, []);

  const toggleTask = (index: number) => {
    const task = tasks[index];
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const completed = tasks.filter((s) => s.done).length;
  const progress = (completed / tasks.length) * 100;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 md:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-[15px] md:text-[16px] text-slate-900">
          Let's set up your site
        </h3>
        <span className="text-[11px] md:text-[12px] text-slate-500 font-medium">
          {completed}/{tasks.length} completed
        </span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-slate-900 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="space-y-4 text-[14px]">
        {tasks.map((task, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-1 bg-slate-50/30 sm:bg-transparent p-3 sm:p-0 rounded-lg sm:rounded-none">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <button
                onClick={() => toggleTask(i)}
                className="flex items-center gap-3 w-full text-left active:opacity-70 transition-opacity"
              >
                {task.done ? (
                  <div className="bg-[#0F172A] rounded-full p-0.5">
                  <svg
                    viewBox="0 0 18 18"
                    fill="currentColor"
                    width="14px"
                    height="14px"
                    className="text-white"
                  >
                    <path d="M11.9393398,6 C12.232233,5.70710678 12.7071068,5.70710678 13,6 C13.2928932,6.29289322 13.2928932,6.76776695 13,7.06066017 L7.5,12.5606602 L5,10.0606602 C4.70710678,9.76776695 4.70710678,9.29289322 5,9 C5.29289322,8.70710678 5.76776695,8.70710678 6.06066017,9 L7.5,10.4393398 L11.9393398,6 Z"></path>
                  </svg>
                  </div>
                ) : (
                  <div className="w-[18px] h-[18px] border-2 border-slate-300 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
                <span
                  className={`text-[13px] md:text-[14px] truncate ${task.done ? "text-slate-400 line-through" : "font-semibold text-slate-800"}`}
                >
                  {task.title}
                </span>
              </button>
            </div>
            {!task.done && (
              <button
                onClick={() => {
                  if (task.route === "/create-site" && onCreateSite) {
                    onCreateSite();
                  } else {
                    navigate(task.route);
                  }
                }}
                disabled={task.route === "/create-site" && isCreatingSite}
                className="w-full sm:w-auto h-9 px-4 flex items-center justify-center gap-1.5 min-w-[100px] text-[12px] font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
              >
                {task.route === "/create-site" && isCreatingSite ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  task.action
                )}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
