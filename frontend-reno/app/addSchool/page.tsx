"use client"

import { useForm, type SubmitHandler } from "react-hook-form"
import { useState, type ChangeEvent } from "react"

interface SchoolFormValues {
  name: string
  address: string
  city: string
  state: string
  contact?: string
  email_id?: string
  image?: FileList
}

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SchoolFormValues>()
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const API = process.env.NEXT_PUBLIC_API_URL

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    } else {
      setPreview(null)
    }
  }

  const onSubmit: SubmitHandler<SchoolFormValues> = async (data) => {
    setLoading(true)
    try {
      const form = new FormData()
      form.append("name", data.name)
      form.append("address", data.address)
      form.append("city", data.city)
      form.append("state", data.state)
      if (data.contact) form.append("contact", data.contact)
      if (data.email_id) form.append("email_id", data.email_id)
      if (data.image?.[0]) form.append("image", data.image[0])

      const res = await fetch(`${API}/api/schools`, {
        method: "POST",
        body: form,
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Upload failed")

      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
      reset()
      setPreview(null)
    } catch (err: any) {
      alert("Error: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="space-y-2 mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Add New School</h1>
        <p className="text-slate-600">Register a new educational institution</p>
      </div>

      {submitted && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
          <span className="text-2xl">✅</span>
          <div>
            <p className="font-semibold text-green-900">School Added Successfully!</p>
            <p className="text-green-700 text-sm">Your school has been registered</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* School Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">School Name *</label>
            <input
              {...register("name", { required: "School name is required", maxLength: 200 })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              placeholder="Enter school name"
            />
            {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Address *</label>
            <textarea
              {...register("address", { required: "Address is required" })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none"
              placeholder="Enter complete address"
              rows={3}
            />
            {errors.address && <span className="text-red-500 text-sm mt-1">Address is required</span>}
          </div>

          {/* City, State, Contact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">City *</label>
              <input
                {...register("city", { required: "City is required" })}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                placeholder="Enter city"
              />
              {errors.city && <span className="text-red-500 text-sm mt-1">City is required</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">State *</label>
              <input
                {...register("state", { required: "State is required" })}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                placeholder="Enter state"
              />
              {errors.state && <span className="text-red-500 text-sm mt-1">State is required</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Contact Number</label>
              <input
                {...register("contact", { pattern: /^[0-9]{6,15}$/ })}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                placeholder="10-15 digits"
              />
              {errors.contact && <span className="text-red-500 text-sm mt-1">Invalid contact number</span>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address</label>
            <input
              {...register("email_id", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              placeholder="school@example.com"
            />
            {errors.email_id && <span className="text-red-500 text-sm mt-1">{errors.email_id.message}</span>}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">School Image</label>
            <div className="relative">
              <input {...register("image")} type="file" accept="image/*" onChange={onFileChange} className="w-full" />
              <p className="text-xs text-slate-500 mt-1">JPG, PNG • Max 5MB</p>
            </div>
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-900">Image Preview</p>
              <img
                src={preview || "/placeholder.svg"}
                alt="preview"
                className="w-48 h-40 object-cover rounded-xl border-2 border-blue-200"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    strokeWidth="2"
                    stroke="none"
                    fill="none"
                    strokeOpacity="0.25"
                  ></circle>
                  <path
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  ></path>
                </svg>
                Saving School...
              </span>
            ) : (
              "✓ Register School"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
