import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  party_size: number;
  date: string;
  time: string;
  created_at: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':');
  const hour24 = parseInt(hours);
  const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
  const ampm = hour24 >= 12 ? 'PM' : 'AM';
  return `${hour12}:${minutes} ${ampm}`;
};

const getCustomerEmailTemplate = (booking: BookingDetails): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
        .booking-details { background-color: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #27ae60; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .label { font-weight: bold; color: #2c3e50; }
        .value { color: #34495e; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #7f8c8d; font-size: 14px; }
        .contact-info { background-color: #ecf0f1; padding: 15px; border-radius: 6px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🍽️ Your Table is Reserved!</h1>
      </div>
      
      <div class="content">
        <p>Dear ${booking.name},</p>
        
        <p>Thank you for choosing our restaurant! We're delighted to confirm your reservation.</p>
        
        <div class="booking-details">
          <h3 style="margin-top: 0; color: #2c3e50;">Reservation Details</h3>
          
          <div class="detail-row">
            <span class="label">Confirmation ID:</span>
            <span class="value">#${booking.id}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Name:</span>
            <span class="value">${booking.name}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Date:</span>
            <span class="value">${formatDate(booking.date)}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Time:</span>
            <span class="value">${formatTime(booking.time)}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Party Size:</span>
            <span class="value">${booking.party_size} ${booking.party_size === 1 ? 'person' : 'people'}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Phone:</span>
            <span class="value">${booking.phone}</span>
          </div>
        </div>
        
        <div class="contact-info">
          <h4 style="margin-top: 0; color: #2c3e50;">Important Information</h4>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Please arrive on time - we hold tables for 15 minutes past your reservation time</li>
            <li>If you need to cancel or modify your booking, please call us at least 2 hours in advance</li>
            <li>Please speak with our staff if you have any dietary requirements or allergies</li>
            <li>We look forward to serving you!</li>
          </ul>
        </div>
        
        <p style="margin-top: 25px;">We can't wait to welcome you to our restaurant. If you have any questions or special dietary requirements, please don't hesitate to contact us.</p>
        
        <p>See you soon!</p>
        <p><strong>Turpan Restaurant Team</strong></p>
      </div>
      
      <div class="footer">
        <p>📧 Email: booking@turpanuyghur.com | 📞 Phone: (020) 7636 9949</p>
        <p>📍 108 Great Russell St, London WC1B 3NA </p>
        <p style="font-size: 12px; margin-top: 15px;">
          This is an automated confirmation email. Please do not reply directly to this message.
        </p>
      </div>
    </body>
    </html>
  `;
};

const getRestaurantEmailTemplate = (booking: BookingDetails): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Booking Received</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #e74c3c; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
        .booking-details { background-color: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #e74c3c; }
        .detail-row { margin: 10px 0; }
        .label { font-weight: bold; color: #2c3e50; display: inline-block; width: 120px; }
        .value { color: #34495e; }
        .urgent { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🔔 New Booking Alert</h1>
      </div>
      
      <div class="content">
        <p><strong>A new table reservation has been received!</strong></p>
        
        <div class="booking-details">
          <h3 style="margin-top: 0; color: #2c3e50;">Booking Details</h3>
          
          <div class="detail-row">
            <span class="label">Booking ID:</span>
            <span class="value">#${booking.id}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Customer:</span>
            <span class="value">${booking.name}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Email:</span>
            <span class="value">${booking.email}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Phone:</span>
            <span class="value">${booking.phone}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Date:</span>
            <span class="value">${formatDate(booking.date)}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Time:</span>
            <span class="value">${formatTime(booking.time)}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Party Size:</span>
            <span class="value">${booking.party_size} ${booking.party_size === 1 ? 'person' : 'people'}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Received:</span>
            <span class="value">${new Date(booking.created_at).toLocaleString('en-GB')}</span>
          </div>
        </div>
        
        <div class="urgent">
          <strong>⚡ Action Required:</strong>
          <ul>
            <li>Check table availability and confirm the booking</li>
            <li>Update your reservation system</li>
            <li>Contact customer if there are any issues</li>
          </ul>
        </div>
        
        <p style="margin-top: 25px;"><em>This booking is currently marked as "pending" and requires confirmation.</em></p>
      </div>
    </body>
    </html>
  `;
};

const getReminderEmailTemplate = (booking: BookingDetails): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Reminder</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f39c12; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
        .booking-details { background-color: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #f39c12; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .label { font-weight: bold; color: #2c3e50; }
        .value { color: #34495e; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #7f8c8d; font-size: 14px; }
        .reminder-notice { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0; }
        .cancel-info { background-color: #ecf0f1; padding: 15px; border-radius: 6px; margin-top: 20px; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>⏰ Booking Reminder</h1>
      </div>
      
      <div class="content">
        <p>Dear ${booking.name},</p>
        
        <div class="reminder-notice">
          <p><strong>🍽️ Don't forget about your reservation tomorrow!</strong></p>
        </div>
        
        <p>This is a friendly reminder about your upcoming table reservation at our restaurant.</p>
        
        <div class="booking-details">
          <h3 style="margin-top: 0; color: #2c3e50;">Your Reservation Details</h3>
          
          <div class="detail-row">
            <span class="label">Confirmation ID:</span>
            <span class="value">#${booking.id}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Date:</span>
            <span class="value">${formatDate(booking.date)}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Time:</span>
            <span class="value">${formatTime(booking.time)}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Party Size:</span>
            <span class="value">${booking.party_size} ${booking.party_size === 1 ? 'person' : 'people'}</span>
          </div>
        </div>
        
        <div class="cancel-info">
          <p><strong>Need to cancel or modify?</strong></p>
          <p>Please call us at (020) 7636 9949 at least 2 hours before your reservation time.</p>
        </div>
        
        <p style="margin-top: 25px;">We're looking forward to welcoming you tomorrow! If you have any special dietary requirements or requests, please let us know when you arrive.</p>
        
        <p>See you soon!</p>
        <p><strong>Turpan Restaurant Team</strong></p>
      </div>
      
      <div class="footer">
        <p>📧 Email: booking@turpanuyghur.com | 📞 Phone: (020) 7636 9949</p>
        <p>📍 108 Great Russell St, London WC1B 3NA </p>
        <p style="font-size: 12px; margin-top: 15px;">
          This is an automated reminder email. Please do not reply directly to this message.
        </p>
      </div>
    </body>
    </html>
  `;
};

export const sendCustomerConfirmation = async (booking: BookingDetails): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Turpan Restaurant <onboarding@resend.dev>',
      to: [booking.email],
      subject: `Booking Confirmation - ${formatDate(booking.date)} at ${formatTime(booking.time)}`,
      html: getCustomerEmailTemplate(booking),
    });

    if (error) {
      console.error('Error sending customer confirmation:', error);
      return { success: false, error: error.message };
    }

    console.log('Customer confirmation sent:', data);
    return { success: true };
  } catch (error) {
    console.error('Unexpected error sending customer email:', error);
    return { success: false, error: 'Failed to send confirmation email' };
  }
};

export const sendRestaurantNotification = async (booking: BookingDetails): Promise<{ success: boolean; error?: string }> => {
  try {
    const restaurantEmail = process.env.RESTAURANT_EMAIL;
    if (!restaurantEmail) {
      console.error('RESTAURANT_EMAIL not configured');
      return { success: false, error: 'Restaurant email not configured' };
    }

    const { data, error } = await resend.emails.send({
      from: 'Turpan Restaurant Bookings <onboarding@resend.dev>', 
      to: [restaurantEmail],
      subject: `🔔 New Booking: ${booking.name} - ${formatDate(booking.date)} ${formatTime(booking.time)}`,
      html: getRestaurantEmailTemplate(booking),
    });

    if (error) {
      console.error('Error sending restaurant notification:', error);
      return { success: false, error: error.message };
    }

    console.log('Restaurant notification sent:', data);
    return { success: true };
  } catch (error) {
    console.error('Unexpected error sending restaurant email:', error);
    return { success: false, error: 'Failed to send notification email' };
  }
};

export const sendReminderEmail = async (booking: BookingDetails): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Restaurant <onboarding@resend.dev>',
      to: [booking.email],
      subject: `⏰ Reminder: Your table tomorrow at ${formatTime(booking.time)}`,
      html: getReminderEmailTemplate(booking),
    });

    if (error) {
      console.error('Error sending reminder email:', error);
      return { success: false, error: error.message };
    }

    console.log('Reminder email sent:', data);
    return { success: true };
  } catch (error) {
    console.error('Unexpected error sending reminder email:', error);
    return { success: false, error: 'Failed to send reminder email' };
  }
};

export const sendBookingEmails = async (booking: BookingDetails): Promise<{ 
  customerSuccess: boolean; 
  restaurantSuccess: boolean; 
  errors: string[] 
}> => {
  const results = {
    customerSuccess: false,
    restaurantSuccess: false,
    errors: [] as string[]
  };

  const customerResult = await sendCustomerConfirmation(booking);
  results.customerSuccess = customerResult.success;
  if (!customerResult.success && customerResult.error) {
    results.errors.push(`Customer email: ${customerResult.error}`);
  }

  const restaurantResult = await sendRestaurantNotification(booking);
  results.restaurantSuccess = restaurantResult.success;
  if (!restaurantResult.success && restaurantResult.error) {
    results.errors.push(`Restaurant email: ${restaurantResult.error}`);
  }

  return results;
};