export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24">
      <div className="text-center space-y-6">
        <div className="space-y-3">
          <h2 className="text-5xl sm:text-6xl font-bold bg-linear-to-r from-blue-600 via-indigo-600 to-slate-900 bg-clip-text text-transparent">
            Welcome to EduManage
          </h2>
          <p className="text-xl text-slate-600">Your complete school management solution</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-2xl mx-auto">
          <a
            href="/addSchool"
            className="group p-8 rounded-2xl bg-white border-2 border-transparent hover:border-blue-600 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="text-4xl mb-4">➕</div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Add New School</h3>
            <p className="text-slate-600 mb-4">Register a new school with details and images</p>
            <span className="inline-block text-blue-600 font-semibold group-hover:translate-x-2 transition">
              Get Started →
            </span>
          </a>

          <a
            href="/showSchool"
            className="group p-8 rounded-2xl bg-white border-2 border-transparent hover:border-indigo-600 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="text-4xl mb-4">👁️</div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">View All Schools</h3>
            <p className="text-slate-600 mb-4">Browse and explore all registered schools</p>
            <span className="inline-block text-indigo-600 font-semibold group-hover:translate-x-2 transition">
              Explore →
            </span>
          </a>
        </div>

        <p className="text-slate-500 text-sm mt-12">Manage your educational institutions efficiently</p>
      </div>
    </div>
  )
}
