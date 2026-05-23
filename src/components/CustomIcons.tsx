import React from "react";

type IconProps = { className?: string; strokeWidth?: number };

export const IconSprout = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M24 40v-16" />
    <path d="M24 24c-8 0-14-6-14-14 0 6 6 10 14 10" />
    <path d="M24 24c8 0 14-6 14-14 0 6-6 10-14 10" />
    <path d="M14 40h20" />
  </svg>
);

export const IconGraph = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 42h36" />
    <path d="M6 34l12-12 8 8 16-16" />
    <path d="M26 14h12v12" />
    <circle cx="18" cy="22" r="2" fill="currentColor" />
    <circle cx="26" cy="30" r="2" fill="currentColor" />
    <circle cx="42" cy="14" r="2" fill="currentColor" />
  </svg>
);

export const IconDiamond = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M24 4L10 18l14 26 14-26L24 4z" />
    <path d="M10 18h28" />
    <path d="M24 4v40" />
    <path d="M24 4l-7 14 7 26" />
    <path d="M24 4l7 14-7 26" />
  </svg>
);

export const IconCoins = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="24" cy="34" rx="14" ry="6" />
    <path d="M10 34v-8c0 3.31 6.27 6 14 6s14-2.69 14-6v8" />
    <ellipse cx="24" cy="26" rx="14" ry="6" />
    <path d="M10 26v-8c0 3.31 6.27 6 14 6s14-2.69 14-6v8" />
    <ellipse cx="24" cy="18" rx="14" ry="6" />
  </svg>
);

export const IconPiggyBank = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M38 24a14 14 0 0 0-28 0c0 7.73 6.27 14 14 14h6c4.42 0 8-3.58 8-8v-6z" />
    <path d="M12 20l-4-4" />
    <path d="M30 10v4" />
    <circle cx="34" cy="22" r="2" fill="currentColor" />
    <path d="M16 36l-2 6" />
    <path d="M28 38l-2 6" />
    <path d="M24 6a4 4 0 0 1 4 4" />
  </svg>
);

export const IconBriefcase = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="6" y="16" width="36" height="24" rx="4" />
    <path d="M16 16v-6a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v6" />
    <path d="M6 24h12c0 3.31 2.69 6 6 6s6-2.69 6-6h12" />
  </svg>
);

export const IconCompass = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="24" cy="24" r="20" />
    <path d="M24 10l5 9 9 5-9 5-5 9-5-9-9-5 9-5 5-9z" />
    <circle cx="24" cy="24" r="3" fill="currentColor" />
  </svg>
);

export const IconSearch = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="20" cy="20" r="12" />
    <path d="M29 29l11 11" />
    <path d="M16 20h8" />
    <path d="M20 16v8" />
  </svg>
);

export const IconPackage = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M24 6L6 14v18l18 10 18-10V14L24 6z" />
    <path d="M6 14l18 10 18-10" />
    <path d="M24 24v20" />
    <path d="M14 10l18 10" />
  </svg>
);
