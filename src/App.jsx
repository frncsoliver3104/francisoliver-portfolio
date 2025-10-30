import './App.css'
import Footer from './sections/Footer/Footer'
import Person from './sections/Person/Person'
import Projects from './sections/Projects/Projects'
import Skills from './sections/Skills/Skills'
import Contact from './sections/Contact/Contact'
import Navbar from './common/Navbar'
import Loading from './common/Loading'
import Reveal from './common/Reveal'
import { useEffect, useState } from 'react'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // If you would rather wait for resources, replace the timeout with real load checks.
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  if (loading) return <Loading onFinish={() => setLoading(false)} duration={700} />

  return (
    <>
      <Navbar />
      <main>
        <Reveal><Person /></Reveal>
        <Reveal><Projects /></Reveal>
        <Reveal><Skills /></Reveal>
        <Reveal><Contact /></Reveal>
      </main>
      <Footer />
    </>
  )

}

export default App