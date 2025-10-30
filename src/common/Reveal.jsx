import { useEffect, useRef, useState } from 'react'
import styles from './Reveal.module.css'

export default function Reveal({ children, rootMargin = '0px 0px -10% 0px', threshold = 0.12 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            obs.unobserve(entry.target)
          }
        })
      },
      { rootMargin, threshold }
    )

    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [rootMargin, threshold])

  return (
    <div ref={ref} className={`${styles.reveal} ${visible ? styles.visible : ''}`}>
      {children}
    </div>
  )
}
