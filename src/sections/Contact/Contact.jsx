import styles from './ContactStyles.module.css'
import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser' // npm i @emailjs/browser
import Navbar from '../../common/Navbar'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('Email service not configured. Check .env.local')
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

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setStatus('Message sent — thank you!')
        setForm({ name: '', email: '', message: '' })
        setSending(false)
      })
      .catch((err) => {
        console.error('EmailJS error:', err)
        setStatus('Failed to send message. Please try again later.')
        setSending(false)
      })
  }

  return (
    <section id="contact" className={styles.container}>
      <h1 className="sectionTittle">Contact Me</h1>

      <div className={styles.content}>
        <form className={styles.form} onSubmit={onSubmit}>
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