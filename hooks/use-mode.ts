"use client";

// This hook now effectively does nothing but enforce the design system
export const useMode = () => ({
  mode: "super", // Always Super
  isBooting: false,
  toggleMode: () => {}, // Do nothing
  setBooting: () => {},
  konamiTrigger: () => {}
});