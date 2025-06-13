'use client'
import { useState, useEffect } from 'react'

export default function BookingForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    partySize: 2,
    date: '',
    time: '',
  })
  const [status, setStatus] = useState('')
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [timeSlots, setTimeSlots] = useState<string[]>([])

  useEffect(() => {
    const dates: string[] = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    for (let i = 0; i < 60; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }
    setAvailableDates(dates)
  }, [])

  useEffect(() => {
    const slots: string[] = []
    const startTime = 12 * 60 
    const endTime = 20 * 60 + 30 
    const interval = 15
    
    for (let time = startTime; time <= endTime; time += interval) {
      const hours = Math.floor(time / 60)
      const minutes = time % 60
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      slots.push(timeString)
    }
    setTimeSlots(slots)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Sending...')
    try {
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const responseData = await res.json()

      if (res.ok) {
        setStatus('Booking confirmed!')
        setForm({ name: '', email: '', phone: '', partySize: 2, date: '', time: '' })
      } else {
        
        if (responseData.errors) {
          const errorMessages = Object.values(responseData.errors).filter(Boolean).join(', ')
          setStatus(`Error: ${errorMessages}`)
        } else {
          setStatus(`Error: ${responseData.message}`)
        }
      }
    } catch (_err) {
      setStatus('Something went wrong.')
    }
  }

  const formatDateDisplay = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('en-GB', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatTimeDisplay = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    const hour24 = parseInt(hours)
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24
    const ampm = hour24 >= 12 ? 'PM' : 'AM'
    return `${hour12}:${minutes} ${ampm}`
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        name="name" 
        placeholder="Name" 
        value={form.name} 
        onChange={handleChange} 
        required 
      />
      
      <input 
        name="email" 
        placeholder="Email" 
        type="email" 
        value={form.email} 
        onChange={handleChange} 
        required 
      />
      
      <input 
        name="phone" 
        placeholder="Phone" 
        value={form.phone} 
        onChange={handleChange} 
        required 
      />
      
      <select 
        name="partySize" 
        value={form.partySize} 
        onChange={handleChange} 
        required
      >
        {[...Array(12)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1} {i + 1 === 1 ? 'person' : 'people'}
          </option>
        ))}
      </select>
      
      <select 
        name="date" 
        value={form.date} 
        onChange={handleChange} 
        required
      >
        <option value="">Select a date</option>
        {availableDates.map(date => (
          <option key={date} value={date}>
            {formatDateDisplay(date)}
          </option>
        ))}
      </select>
      
      <select 
        name="time" 
        value={form.time} 
        onChange={handleChange} 
        required
        disabled={!form.date}
      >
        <option value="">Select a time</option>
        {timeSlots.map(time => (
          <option key={time} value={time}>
            {formatTimeDisplay(time)}
          </option>
        ))}
      </select>
      
      <button type="submit" disabled={!form.date || !form.time}>
        Book Table
      </button>
      
      {status && <p>{status}</p>}
    </form>
  )
}