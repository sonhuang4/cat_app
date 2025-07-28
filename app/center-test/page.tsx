export default function CenterTestPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Visual guide to show centering */}
      <div className="w-full bg-red-200 h-2"></div>
      
      <div className="container bg-blue-100 min-h-screen">
        <div className="py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Centering Test</h1>
          
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Container Width Test</h2>
            <p className="mb-4">This content should be perfectly centered on the page.</p>
            <p className="mb-4">The blue background shows the container bounds.</p>
            <p>The red line at the top shows the full page width.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-brand-coral text-white p-6 rounded-lg text-center">
              <h3 className="font-bold mb-2">Column 1</h3>
              <p>This should be centered</p>
            </div>
            <div className="bg-brand-teal text-white p-6 rounded-lg text-center">
              <h3 className="font-bold mb-2">Column 2</h3>
              <p>This should be centered</p>
            </div>
            <div className="bg-brand-coral text-white p-6 rounded-lg text-center">
              <h3 className="font-bold mb-2">Column 3</h3>
              <p>This should be centered</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <a href="/" className="bg-brand-coral text-white px-6 py-3 rounded-full hover:bg-brand-coral-dark transition-colors">
              Back to Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}