export default function WorkingTestPage() {
  return (
    <div className="min-h-screen bg-blue-500 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Tailwind Test</h1>
        <p className="text-gray-700 mb-4">If this has colors and styling, Tailwind is working!</p>
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold">
          Click Me
        </button>
      </div>
    </div>
  )
}