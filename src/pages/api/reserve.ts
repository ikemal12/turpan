import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { name, email, phone, partySize, date, time } = req.body

  if (!name || !email || !phone || !partySize || !date || !time) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const { error } = await supabase.from('reservations').insert([
      {
        name,
        email,
        phone,
        party_size: partySize,
        date,
        time,
      },
    ])

    if (error) {
      console.error('Supabase insert error:', error)
      return res.status(500).json({ message: 'Failed to create reservation' })
    }

    return res.status(200).json({ message: 'Reservation created successfully' })
  } catch (err) {
    console.error('Unexpected error:', err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
