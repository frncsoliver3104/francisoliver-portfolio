import styles from './ContactStyles.module.css'
import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser' // npm i @emailjs/browser
import Navbar from '../../common/Navbar'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)

  // Prefer Vite build-time env, but allow a runtime fallback via
  // window.__EMAILJS_CONFIG__ so the built app can be configured
  // by injecting a small script into `index.html` on the host.
  const runtimeConfig = typeof window !== 'undefined' ? window.__EMAILJS_CONFIG__ : null

  const SERVICE_ID =
    import.meta.env.VITE_EMAILJS_SERVICE_ID || runtimeConfig?.VITE_EMAILJS_SERVICE_ID || runtimeConfig?.SERVICE_ID
  const TEMPLATE_ID =
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID || runtimeConfig?.VITE_EMAILJS_TEMPLATE_ID || runtimeConfig?.TEMPLATE_ID
  const PUBLIC_KEY =
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY || runtimeConfig?.VITE_EMAILJS_PUBLIC_KEY || runtimeConfig?.PUBLIC_KEY

  const formRef = useRef(null)

  // Initialize EmailJS client once when PUBLIC_KEY is available.
  useEffect(() => {
    if (PUBLIC_KEY && typeof emailjs?.init === 'function') {
      try {
        emailjs.init(PUBLIC_KEY)
      } catch (err) {
        // If init fails, keep going — we'll still try to send with the key as a fallback.
        console.error('EmailJS init error:', err)
      }
    }
  }, [PUBLIC_KEY])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus(
        'Email service not configured. Check .env.local (dev) or inject runtime config into index.html (production).'
      )
      return
    }

    setSending(true)
    setStatus(null)

    const templateParams = {
      name: form.name,
      email: form.email,
      message: form.message,
      time: new Date().toLocaleString()
    }

    try {
      // If init() succeeded we can call send without the public key.
      // Otherwise pass PUBLIC_KEY as fallback fourth argument.
      if (typeof emailjs?.send === 'function') {
        if (emailjs._userID || (PUBLIC_KEY && typeof emailjs.init === 'function')) {
          await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
        } else {
          await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
        }
      } else {
        throw new Error('EmailJS client not available')
      }

      setStatus('Message sent — thank you!')
      setForm({ name: '', email: '', message: '' })
      if (formRef.current) formRef.current.reset()
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('Failed to send message. Please try again later.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className={styles.container}>
      <h1 className="sectionTittle">Contact Me</h1>

      <div className={styles.content}>
  <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
          <label>
            Name
            <input name="name" value={form.name} onChange={onChange} required />
          </label>

          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={onChange} required />
          </label>

          <label>
            Message
            <textarea name="message" value={form.message} onChange={onChange} rows={6} required />
          </label>

          <button type="submit" disabled={sending} aria-busy={sending}>
            {sending ? 'Sending...' : 'Send'}
          </button>

          {status && <p className={styles.status}>{status}</p>}
        </form>

        <div className={styles.info}>
          <h3>Get in touch</h3>
          <p>If you prefer, email me directly at:</p>
          <a href="mailto:villanuevafranz616@gmail.com">villanuevafranz616@gmail.com</a>
        </div>
      </div>
    </section>
  )
}

export default Contact;