export default function BrandTestPage() {
  return (
    <div className="min-h-screen bg-brand-beige p-8">
      <div className="container">
        <h1 className="text-4xl font-bold text-brand-neutral-900 mb-8 text-center">
          🐱 CatBox Brand Test
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-4">Brand Colors</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-coral rounded"></div>
                <span>Coral Primary</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-teal rounded"></div>
                <span>Teal Secondary</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-beige-dark rounded border"></div>
                <span>Beige Dark</span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-4">Buttons</h3>
            <div className="space-y-3">
              <button className="btn-primary w-full">
                Primary Button
              </button>
              <button className="btn-secondary w-full">
                Secondary Button
              </button>
              <button className="bg-brand-coral hover:bg-brand-coral-dark text-white px-4 py-2 rounded-full transition-colors">
                Custom Coral
              </button>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-4">Typography</h3>
            <div className="space-y-2">
              <h4 className="text-lg font-heading font-bold">Heading Font (Poppins)</h4>
              <p className="font-body">Body text font (Inter)</p>
              <p className="text-brand-neutral-600">Muted text</p>
              <p className="text-brand-coral">Coral accent text</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a 
            href="/" 
            className="inline-block bg-brand-teal hover:bg-brand-teal-dark text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}