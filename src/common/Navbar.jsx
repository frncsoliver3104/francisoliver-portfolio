import { useState } from 'react'
import './Navbar.css'

function Navbar({ compact = false }) {
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen(o => !o)

  const close = () => setOpen(false)

  return (
    <header className={`navbar ${compact ? 'compact' : ''} ${open ? 'open' : ''}`}>
      <div className="navbar-inner">
        <a className="brand" href="#person">Francis Oliver</a>

        <nav className="nav-links" aria-label="Primary">
          <a onClick={close} href="#person">Home</a>
          <a onClick={close} href="#projects">Projects</a>
          <a onClick={close} href="#skills">Skills</a>
          <a onClick={close} href="#contact">Contact</a>
        </nav>

        <button className="nav-toggle" aria-label="Toggle navigation" onClick={toggle}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
