export default function CSSTestPage() {
  return (
    <div>
      <div className="test-bg">
        <h1>CSS Test - This should have red background and blue border</h1>
        <p>If you see red background, CSS is loading</p>
      </div>
      
      <div className="p-8 bg-blue-500 text-white m-4">
        <h2>Tailwind Test</h2>
        <p>If this has blue background, Tailwind is working</p>
      </div>
      
      <div style={{backgroundColor: 'green', color: 'white', padding: '20px', margin: '20px'}}>
        <h3>Inline Styles Test</h3>
        <p>This uses inline styles and should always work</p>
      </div>
    </div>
  )
}