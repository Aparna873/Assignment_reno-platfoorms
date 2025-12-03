"use client"

import { useEffect, useState } from "react"

interface School {
  id: number
  name: string
  address: string
  city: string
  state?: string
  contact?: string
  email_id?: string
  image_url?: string
}

export default function ShowSchools() {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const API = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    if (!API) return

    setLoading(true)
    fetch(`${API}/api/schools`)
      .then((res) => res.json())
      .then((data: School[]) => {
        setSchools(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [API])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-2 mb-8">
          <h1 className="text-4xl font-bold text-slate-900">All Schools</h1>
          <p className="text-slate-600">Browse registered educational institutions</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <svg
              className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" stroke="none" fill="none" strokeOpacity="0.25"></circle>
              <path
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              ></path>
            </svg>
            <p className="text-slate-600">Loading schools...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="space-y-2 mb-8">
        <h1 className="text-4xl font-bold text-slate-900">All Schools</h1>
        <p className="text-slate-600">
          {schools.length > 0
            ? `Showing ${schools.length} registered school${schools.length !== 1 ? "s" : ""}`
            : "No schools registered yet"}
        </p>
      </div>

      {schools.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-300">
          <div className="text-5xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">No Schools Yet</h2>
          <p className="text-slate-600 mb-6">Start by adding your first school</p>
          <a
            href="/addSchool"
            className="inline-block px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition"
          >
            ➕ Add First School
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school) => (
            <div
              key={school.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-slate-200 hover:border-blue-300 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="h-48 bg-linear-to-br from-slate-200 to-slate-300 overflow-hidden relative">
                {school.image_url ? (
                  <img
                    src={school.image_url || "/placeholder.svg"}
                    alt={school.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-100 to-indigo-100">
                    <span className="text-5xl">🏫</span>
                  </div>
                )}
              </div>

              {/* Content Container */}
              <div className="p-6 space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition">
                    {school.name}
                  </h2>
                </div>

                <div className="space-y-2 text-sm">
                  {/* Address */}
                  <div className="flex items-start gap-2">
                    <span className="text-lg shrink-0">📍</span>
                    <div className="text-slate-600 line-clamp-2">{school.address}</div>
                  </div>

                  {/* City & State */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🏙️</span>
                    <div className="text-slate-600">
                      {school.city}
                      {school.state && `, ${school.state}`}
                    </div>
                  </div>

                  {/* Contact */}
                  {school.contact && (
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📞</span>
                      <a href={`tel:${school.contact}`} className="text-blue-600 hover:text-blue-700 font-medium">
                        {school.contact}
                      </a>
                    </div>
                  )}

                  {/* Email */}
                  {school.email_id && (
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📧</span>
                      <a
                        href={`mailto:${school.email_id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium truncate"
                      >
                        {school.email_id}
                      </a>
                    </div>
                  )}
                </div>

                {/* View Details Button */}
                <button className="w-full py-2 px-4 bg-linear-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-600 font-semibold rounded-lg transition duration-200 border border-blue-200">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
