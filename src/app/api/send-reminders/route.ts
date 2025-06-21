import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabaseClient';
import { Resend } from 'resend';

interface Booking {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  party_size: number;
  phone_number?: string;
  special_requests?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    console.log('=== REMINDER EMAIL ROUTE HIT ===');

    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 24);
    
    const targetDateStr = targetDate.toISOString().split('T')[0];
    
    console.log('Looking for bookings on:', targetDateStr);

    // Query bookings that:
    // 1. Are scheduled for tomorrow (24 hours from now)
    // 2. Haven't had reminder emails sent yet
    // 3. Are confirmed/active
    const { data: bookings, error: queryError } = await supabaseAdmin
      .from('Reservations')
      .select('*')
      .eq('date', targetDateStr)
      .eq('reminder_sent', false)
      .in('status', ['confirmed', 'pending']);

    if (queryError) {
      console.error('Database query error:', queryError);
      return NextResponse.json(
        { error: 'Failed to fetch bookings' },
        { status: 500 }
      );
    }

    if (!bookings || bookings.length === 0) {
      console.log('No bookings found requiring reminders');
      return NextResponse.json({
        message: 'No bookings found requiring reminders',
        count: 0
      });
    }

    console.log(`Found ${bookings.length} bookings requiring reminders`);

    const emailResults = [];
    
    for (const booking of bookings) {
      try {
        const emailResult = await resend.emails.send({
          from: 'Turpan Restaurant <booking@turpanuyghur.com>', 
          to: booking.email,
          subject: `Reminder: Your reservation tomorrow at Turpan Restaurant`,
          html: generateReminderEmailHTML(booking),
        });

        console.log(`Reminder sent to ${booking.email}:`, emailResult);

        const { error: updateError } = await supabaseAdmin
          .from('Reservations')
          .update({ 
            reminder_sent: true,
            reminder_sent_at: new Date().toISOString()
          })
          .eq('id', booking.id);

        if (updateError) {
          console.error(`Failed to update booking ${booking.id}:`, updateError);
          emailResults.push({
            booking_id: booking.id,
            email: booking.email,
            status: 'email_sent_but_update_failed',
            error: updateError.message
          });
        } else {
          emailResults.push({
            booking_id: booking.id,
            email: booking.email,
            status: 'success',
            email_id: emailResult.data?.id
          });
        }

      } catch (emailError) {
        console.error(`Failed to send reminder to ${booking.email}:`, emailError);
        emailResults.push({
          booking_id: booking.id,
          email: booking.email,
          status: 'failed',
          error: emailError instanceof Error ? emailError.message : 'Unknown error'
        });
      }
    }

    const successful = emailResults.filter(r => r.status === 'success').length;
    const failed = emailResults.filter(r => r.status === 'failed').length;

    return NextResponse.json({
      message: 'Reminder processing completed',
      total_bookings: bookings.length,
      emails_sent: successful,
      emails_failed: failed,
      results: emailResults
    });

  } catch (error) {
    console.error('Reminder route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateReminderEmailHTML(booking: Booking) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reservation Reminder</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #d4a574; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .booking-details { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-label { font-weight: bold; color: #555; }
        .button { background-color: #d4a574; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🍽️ Turpan Restaurant</h1>
        <h2>Reservation Reminder</h2>
      </div>
      
      <div class="content">
        <p>Dear ${booking.name || 'Valued Guest'},</p>
        
        <p>This is a friendly reminder about your reservation at Turpan Restaurant <strong>tomorrow</strong>!</p>
        
        <div class="booking-details">
          <h3>Your Reservation Details:</h3>
          <div class="detail-row">
            <span class="detail-label">Date:</span>
            <span>${new Date(booking.date).toLocaleDateString('en-GB', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Time:</span>
            <span>${booking.time || 'Time not specified'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Party Size:</span>
            <span>${booking.party_size || 'Not specified'} people</span>
          </div>
          ${booking.special_requests ? `
          <div class="detail-row">
            <span class="detail-label">Special Requests:</span>
            <span>${booking.special_requests}</span>
          </div>
          ` : ''}
        </div>
        
        <p>We're excited to welcome you and serve you our authentic Uyghur cuisine! If you need to make any changes to your reservation or have any questions, please don't hesitate to contact us.</p>
        
        <div style="text-align: center;">
          <a href="tel:+442076369949" class="button">Call Restaurant</a>
        </div>
        
        <div class="footer">
          <p><strong>Turpan Restaurant</strong><br>
          📍 108 Great Russell St, London WC1B 3NA<br>
          📞 020 7636 9949<br>
          🌐 www.turpanuyghur.com</p>
          
          <p><em>Experience the authentic taste of Uyghur cuisine in the heart of London</em></p>
        </div>
      </div>
    </body>
    </html>
  `;
}