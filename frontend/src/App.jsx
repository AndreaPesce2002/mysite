import { useState, useEffect } from 'react'
import Menu from './components/Menu';
import Footer from './components/Footer';
import { ErrorBoundary } from "react-error-boundary";


function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      console.log(import.meta.env.VITE_API_URL)
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}post`);
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const result = await response.json()
        console.log(result)
        setData(result)
      } catch (error) {
        console.error('error fetch data', error)
      }
    }
    fetchData();
  }, [])

  return (
    <ErrorBoundary>
      <div>
        <Menu />
        <p>hello word</p>
        <Footer />
      </div>
    </ErrorBoundary>

  )
}

export default App
