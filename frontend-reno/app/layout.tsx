import "./globals.css";
import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

export const metadata = {
  title: "School Management",
  description: "Add & View Schools",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased bg-linear-to-br from-slate-50 to-slate-100`}>
        
        {/* NAVBAR */}
         <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                EduManage
              </h1>
            </div>
            {/* Links */}
            <ul className="flex items-center gap-2">
              <li>
                <a
                  href="/addSchool"
                  className="px-4 py-2 rounded-lg font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
                >
                  ➕ Add School
                </a>
              </li>
              <li>
                <a
                  href="/showSchool"
                  className="px-4 py-2 rounded-lg font-medium text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition duration-200 shadow-md hover:shadow-lg"
                >
                  👁️ View Schools
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {/* MAIN CONTENT */}
        <main className="max-w-6xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
