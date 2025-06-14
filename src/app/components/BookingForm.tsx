'use client'
import { useState, useEffect } from 'react'
import { Calendar, Clock, Users, Phone, Mail, User, CheckCircle, AlertCircle } from 'lucide-react'

export default function BookingForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    partySize: '',
    date: '',
    time: '',
  })
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [timeSlots, setTimeSlots] = useState<string[]>([])
  const [selectedDateIndex, setSelectedDateIndex] = useState<number | null>(null)

  useEffect(() => {
    const dates: string[] = []
    const today = new Date()
    
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

  const handleDateSelect = (date: string, index: number) => {
    setForm({ ...form, date, time: '' })
    setSelectedDateIndex(index)
  }

  const handleTimeSelect = (time: string) => {
    setForm({ ...form, time })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus('Sending...')
    
    try {
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const responseData = await res.json()

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', partySize: '', date: '', time: '' })
        setSelectedDateIndex(null)
      } else {
        if (responseData.errors) {
          const errorMessages = Object.values(responseData.errors).filter(Boolean).join(', ')
          setStatus(`Error: ${errorMessages}`)
        } else {
          setStatus(`Error: ${responseData.message}`)
        }
      }
    } catch {
      setStatus('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDateDisplay = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00')
    return {
      weekday: date.toLocaleDateString('en-GB', { weekday: 'short' }),
      day: date.getDate(),
      month: date.toLocaleDateString('en-GB', { month: 'short' })
    }
  }

  const formatTimeDisplay = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    const hour24 = parseInt(hours)
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24
    const ampm = hour24 >= 12 ? 'PM' : 'AM'
    return `${hour12}:${minutes} ${ampm}`
  }

  const isTimeSlotPast = (timeString: string, selectedDate: string) => {
    const today = new Date()
    const selectedDateObj = new Date(selectedDate + 'T00:00:00')
    
    if (selectedDateObj.toDateString() !== today.toDateString()) {
      return false
    }
    
    const [hours, minutes] = timeString.split(':')
    const timeSlot = new Date()
    timeSlot.setHours(parseInt(hours), parseInt(minutes), 0, 0)
    
    const currentTimeWithBuffer = new Date()
    currentTimeWithBuffer.setMinutes(currentTimeWithBuffer.getMinutes() + 15)
    
    return timeSlot <= currentTimeWithBuffer
  }

  const getNextSevenDates = () => {
    return availableDates.slice(0, 7)
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Calendar className="w-6 h-6" />
          Reservation Details
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            Contact Information
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input 
                name="name" 
                placeholder="Full Name" 
                value={form.name} 
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder:text-gray-600 text-gray-800"
                required 
              />
            </div>
            
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input 
                name="phone" 
                placeholder="Phone Number" 
                value={form.phone} 
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder:text-gray-600 text-gray-800"
                required 
              />
            </div>
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              name="email" 
              placeholder="Email Address" 
              type="email" 
              value={form.email} 
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder:text-gray-600 text-gray-800"
              required 
            />
          </div>

          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="number"
              name="partySize"
              min="1"
              max="12"
              placeholder="Number of guests"
              value={form.partySize}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder:text-gray-600 text-gray-800"
              required
            />
          </div>
        </div>

        {/* Date Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Select Date
          </h3>
          
          <div className="grid grid-cols-7 gap-2">
            {getNextSevenDates().map((date, index) => {
              const dateInfo = formatDateDisplay(date)
              const isSelected = selectedDateIndex === index
              const isToday = index === 0
              
              return (
                <button
                  key={date}
                  type="button"
                  onClick={() => handleDateSelect(date, index)}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    isSelected 
                      ? 'bg-orange-500 border-orange-500 text-white shadow-lg' 
                      : 'bg-white border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                  }`}
                >
                  <div className="text-xs font-medium text-gray-600">{dateInfo.weekday}</div>
                  <div className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                    {dateInfo.day}
                  </div>
                  <div className={`text-xs ${isSelected ? 'text-orange-100' : 'text-gray-500'}`}>
                    {dateInfo.month}
                  </div>
                  {isToday && (
                    <div className={`text-xs mt-1 ${isSelected ? 'text-orange-100' : 'text-orange-500'}`}>
                      Today
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Time Selection */}
        {form.date && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Select Time
            </h3>
            
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
              {timeSlots.map(time => {
                const isPast = isTimeSlotPast(time, form.date)
                const isSelected = form.time === time
                
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => !isPast && handleTimeSelect(time)}
                    disabled={isPast}
                    className={`p-3 rounded-lg border-2 transition-all text-center font-medium relative ${
                      isPast
                        ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                        : isSelected
                        ? 'bg-orange-500 border-orange-500 text-white shadow-lg'
                        : 'bg-white border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-gray-700'
                    }`}
                  >
                    <span className={isPast ? 'line-through' : ''}>
                      {formatTimeDisplay(time)}
                    </span>
                    {isPast && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-gray-400 transform rotate-12"></div>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-6">
          <button 
            type="submit" 
            disabled={!form.date || !form.time || isLoading}
            className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Processing...
              </>
            ) : (
              <>
                <Calendar className="w-5 h-5" />
                Confirm Reservation
              </>
            )}
          </button>
        </div>

        {/* Status Messages */}
        {status && (
          <div className={`p-4 rounded-lg flex items-center gap-3 ${
            status === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : status.startsWith('Error') || status === 'Something went wrong. Please try again.'
              ? 'bg-red-50 border border-red-200 text-red-800'
              : 'bg-blue-50 border border-blue-200 text-blue-800'
          }`}>
            {status === 'success' ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-semibold">Booking Confirmed!</p>
                  <p className="text-sm">We will send you a confirmation email shortly.</p>
                </div>
              </>
            ) : status.startsWith('Error') || status === 'Something went wrong. Please try again.' ? (
              <>
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p>{status}</p>
              </>
            ) : (
              <p>{status}</p>
            )}
          </div>
        )}
      </form>
    </div>
  )
}