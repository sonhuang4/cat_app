export default function PositionTestPage() {
  return (
    <div className="min-h-screen">
      {/* Visual Center Line */}
      <div className="fixed top-0 left-1/2 w-0.5 h-full bg-red-500 opacity-30 z-50 pointer-events-none"></div>
      
      {/* Hero Section Test */}
      <section className="py-16 bg-gradient-to-r from-brand-coral to-brand-teal text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Position Test Page</h1>
          <p className="text-xl mb-8">All content should be perfectly centered</p>
          <button className="bg-white text-brand-coral px-8 py-3 rounded-full font-semibold">
            Centered Button
          </button>
        </div>
      </section>

      {/* Grid Section Test */}
      <section className="py-16 bg-brand-beige-dark">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Grid Layout Test</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-brand-coral rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">1</div>
              <h3 className="text-xl font-semibold mb-2">Column 1</h3>
              <p className="text-brand-neutral-600">This column should be aligned with the center line above</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-brand-teal rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">2</div>
              <h3 className="text-xl font-semibold mb-2">Column 2</h3>
              <p className="text-brand-neutral-600">This column should be centered on the red line</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-brand-coral rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">3</div>
              <h3 className="text-xl font-semibold mb-2">Column 3</h3>
              <p className="text-brand-neutral-600">This column should be aligned with the center line above</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Width Test */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Content Width Test</h2>
          
          <div className="bg-blue-100 p-8 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Container Boundaries</h3>
            <p className="mb-4">This blue box shows the container boundaries. It should be centered with equal margins on both sides.</p>
            <p>The red line shows the exact center of the viewport.</p>
          </div>

          <div className="text-center">
            <div className="inline-block bg-green-100 px-8 py-4 rounded-lg">
              <p className="font-semibold">This green box should be centered on the red line</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Test */}
      <section className="py-16 bg-brand-beige-dark">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Navigation Test</h2>
          <p className="mb-8">Check that the navigation bar above is properly centered</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/" className="bg-brand-coral text-white px-6 py-3 rounded-full hover:bg-brand-coral-dark transition-colors">
              Homepage
            </a>
            <a href="/products" className="bg-brand-teal text-white px-6 py-3 rounded-full hover:bg-brand-teal-dark transition-colors">
              Products
            </a>
            <a href="/build-box" className="bg-brand-coral text-white px-6 py-3 rounded-full hover:bg-brand-coral-dark transition-colors">
              Build Box
            </a>
          </div>
        </div>
      </section>

      {/* Mobile Test Note */}
      <section className="py-8 bg-brand-neutral-100">
        <div className="container mx-auto text-center">
          <p className="text-sm text-brand-neutral-600">
            <strong>Note:</strong> Resize your browser window to test responsive centering. 
            The red line shows the center - all content should align properly at all screen sizes.
          </p>
        </div>
      </section>
    </div>
  )
}