import { useEffect } from 'react'
import './Loading.module.css'

function Loading({ onFinish, duration = 700 }) {
  useEffect(() => {
    const t = setTimeout(() => onFinish && onFinish(), duration)
    return () => clearTimeout(t)
  }, [onFinish, duration])

  return (
    <div className="loading-root" role="status" aria-label="Loading site">
      <div className="loading-card">
        <div className="spinner" aria-hidden="true"></div>
        <div className="brand">
          {'Francis Oliver'.split('').map((char, index) => (
            <span key={index} className="brand-letter" style={{'--index': index}}>
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loading
