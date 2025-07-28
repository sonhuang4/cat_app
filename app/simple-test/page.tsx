export default function SimpleTestPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">CatBox Test Page</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Testing Basic Styles</h2>
          <p className="text-gray-600 mb-4">
            This is a test page using only standard Tailwind classes to verify CSS is loading properly.
          </p>
          
          <div className="flex gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
              Primary Button
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors">
              Secondary Button
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">Card 1</h3>
            <p className="text-gray-600">This is a test card with standard Tailwind styling.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">Card 2</h3>
            <p className="text-gray-600">Another test card to verify grid layout works.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">Card 3</h3>
            <p className="text-gray-600">Third card to complete the grid layout test.</p>
          </div>
        </div>
      </div>
    </div>
  )
}