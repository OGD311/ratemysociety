import { updateSocietyCount } from "@/lib/universities";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = () => {
  console.log('Running startup...')
  console.log('Society Count: 🔄')
  updateSocietyCount()
  console.log('Society Count: ✅')
  return nextConfig;
};