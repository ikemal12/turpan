import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from '../../../../lib/supabaseClient';
import { sendBookingEmails } from '../../../../lib/emailService';

const RESTAURANT_CONFIG = {
  OPENING_TIME: '12:00',
  CLOSING_TIME: '21:00',
  LAST_BOOKING_TIME: '20:30',
  MIN_PARTY_SIZE: 1,
  MAX_PARTY_SIZE: 12,
  BOOKING_INTERVAL_MINUTES: 15,
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const internationalPhoneRegex = /^\+\d{1,4}[\s\-\.\(\)]*\d[\d\s\-\.\(\)]{3,18}$/;
  const cleanPhone = phone.replace(/[\s\-\.\(\)]/g, '');
  return internationalPhoneRegex.test(phone) && cleanPhone.length >= 8 && cleanPhone.length <= 20;
};

const validateDate = (dateString: string): { isValid: boolean; error?: string } => {
  const inputDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (isNaN(inputDate.getTime())) {
    return { isValid: false, error: 'Invalid date format' };
  }
  
  if (inputDate < today) {
    return { isValid: false, error: 'Cannot book for past dates' };
  }
  
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 60);
  if (inputDate > maxDate) {
    return { isValid: false, error: 'Cannot book more than 60 days in advance' };
  }
  
  return { isValid: true };
};

const validateTime = (timeString: string): { isValid: boolean; error?: string } => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  
  if (!timeRegex.test(timeString)) {
    return { isValid: false, error: 'Invalid time format (use HH:MM)' };
  }
  
  const [hours, minutes] = timeString.split(':').map(Number);
  const timeInMinutes = hours * 60 + minutes;
  const openingTime = 12 * 60; 
  const lastBookingTime = 20 * 60 + 30; 
  
  if (timeInMinutes < openingTime) {
    return { isValid: false, error: `Restaurant opens at ${RESTAURANT_CONFIG.OPENING_TIME}` };
  }
  
  if (timeInMinutes > lastBookingTime) {
    return { isValid: false, error: `Last booking time is ${RESTAURANT_CONFIG.LAST_BOOKING_TIME}` };
  }
  
  if (minutes % RESTAURANT_CONFIG.BOOKING_INTERVAL_MINUTES !== 0) {
    return { isValid: false, error: `Bookings must be on ${RESTAURANT_CONFIG.BOOKING_INTERVAL_MINUTES}-minute intervals (e.g., 12:00, 12:15, 12:30, 12:45)` };
  }
  
  return { isValid: true };
};

const validatePartySize = (partySize: number): { isValid: boolean; error?: string } => {
  if (!Number.isInteger(partySize) || partySize < RESTAURANT_CONFIG.MIN_PARTY_SIZE) {
    return { isValid: false, error: `Party size must be at least ${RESTAURANT_CONFIG.MIN_PARTY_SIZE}` };
  }
  
  if (partySize > RESTAURANT_CONFIG.MAX_PARTY_SIZE) {
    return { isValid: false, error: `Party size cannot exceed ${RESTAURANT_CONFIG.MAX_PARTY_SIZE}. Please call us for larger groups.` };
  }
  
  return { isValid: true };
};

const checkForDoubleBooking = async (email: string, phone: string, date: string, time: string) => {
  try {
    const normalizedPhone = phone.replace(/[\s\-\.\(\)]/g, '');
    
    const { data: existingBookings, error } = await supabaseAdmin
      .from('Reservations')
      .select('*')
      .eq('date', date)
      .eq('time', time);
    
    if (error) {
      console.error('Error checking for double booking:', error);
      throw new Error('Database error while checking for existing bookings');
    }
    
    if (existingBookings && existingBookings.length > 0) {
      const hasConflict = existingBookings.some(booking => 
        booking.email === email || 
        booking.phone.replace(/[\s\-\.\(\)]/g, '') === normalizedPhone
      );
      
      if (hasConflict) {
        return { 
          hasConflict: true, 
          error: 'You already have a booking at this time, or this time slot may be unavailable' 
        };
      }
    }
    
    return { hasConflict: false };
  } catch (error) {
    throw error;
  }
};

const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, ''); 
};

export async function POST(request: NextRequest) {
  console.log('=== DEBUG: Request received ===');
  
  try {
    const body = await request.json();
    console.log('Request body:', body);

    const { name, email, phone, partySize, date, time } = body;

    if (!name || !email || !phone || !partySize || !date || !time) {
      console.log('Missing fields:', { name: !!name, email: !!email, phone: !!phone, partySize: !!partySize, date: !!date, time: !!time });
      return NextResponse.json({ 
        message: 'Missing required fields',
        errors: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          phone: !phone ? 'Phone number is required' : null,
          partySize: !partySize ? 'Party size is required' : null,
          date: !date ? 'Date is required' : null,
          time: !time ? 'Time is required' : null,
        }
      }, { status: 400 });
    }

    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email.toLowerCase());
    const sanitizedPhone = sanitizeInput(phone);

    const validationErrors: { [key: string]: string } = {};

    if (sanitizedName.length < 2 || sanitizedName.length > 50) {
      validationErrors.name = 'Name must be between 2 and 50 characters';
    }

    if (!validateEmail(sanitizedEmail)) {
      validationErrors.email = 'Please enter a valid email address';
    }

    if (!validatePhone(sanitizedPhone)) {
      validationErrors.phone = 'Please enter a valid international phone number (e.g., +44 1234567890)';
    }

    const partySizeNum = parseInt(partySize);
    const partySizeValidation = validatePartySize(partySizeNum);
    if (!partySizeValidation.isValid) {
      validationErrors.partySize = partySizeValidation.error!;
    }

    const dateValidation = validateDate(date);
    if (!dateValidation.isValid) {
      validationErrors.date = dateValidation.error!;
    }

    const timeValidation = validateTime(time);
    if (!timeValidation.isValid) {
      validationErrors.time = timeValidation.error!;
    }

    if (Object.keys(validationErrors).length > 0) {
      console.log('Validation errors:', validationErrors);
      return NextResponse.json({
        message: 'Validation failed',
        errors: validationErrors
      }, { status: 400 });
    }

    try {
      const doubleBookingCheck = await checkForDoubleBooking(sanitizedEmail, sanitizedPhone, date, time);
      if (doubleBookingCheck.hasConflict) {
        return NextResponse.json({
          message: 'Booking conflict',
          errors: { booking: doubleBookingCheck.error }
        }, { status: 409 });
      }
    } catch (error) {
      console.error('Error during double booking check:', error);
      return NextResponse.json({
        message: 'Unable to verify booking availability. Please try again.',
      }, { status: 500 });
    }

    const insertData = {
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      party_size: partySizeNum,
      date,
      time,
      status: 'pending', 
      created_at: new Date().toISOString()
    };

    console.log('Inserting validated data:', insertData);

    const { data, error } = await supabaseAdmin
      .from('Reservations')
      .insert([insertData])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({
        message: 'Failed to create reservation. Please try again.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      }, { status: 500 });
    }

    if (!data || data.length === 0) {
      console.log('No data returned from insert');
      return NextResponse.json({ 
        message: 'Reservation creation failed. Please try again.' 
      }, { status: 500 });
    }

    const createdBooking = data[0];
    console.log('Success! Reservation created:', createdBooking);
    
    console.log('Sending email notifications...');
    try {
      const emailResults = await sendBookingEmails(createdBooking);
      
      if (emailResults.errors.length > 0) {
        console.warn('Some emails failed to send:', emailResults.errors);
      }
      
      console.log('Email results:', {
        customer: emailResults.customerSuccess ? 'sent' : 'failed',
        restaurant: emailResults.restaurantSuccess ? 'sent' : 'failed'
      });
      
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
    }
    
    return NextResponse.json({
      message: 'Reservation created successfully! We will confirm your booking shortly.',
      reservation: {
        id: createdBooking.id,
        name: createdBooking.name,
        email: createdBooking.email,
        party_size: createdBooking.party_size,
        date: createdBooking.date,
        time: createdBooking.time,
        status: createdBooking.status
      }
    }, { status: 201 });

  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({
      message: 'Internal server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? (err instanceof Error ? err.message : 'Unknown error') : undefined
    }, { status: 500 });
  }
}