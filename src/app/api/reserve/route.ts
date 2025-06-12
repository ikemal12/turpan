import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from '../../../../lib/supabaseClient';

export async function POST(request: NextRequest) {
  console.log('=== DEBUG: Request received ===');
  
  try {
    const body = await request.json();
    console.log('Request body:', body);

    const { name, email, phone, partySize, date, time } = body;

    if (!name || !email || !phone || !partySize || !date || !time) {
      console.log('Missing fields:', { name: !!name, email: !!email, phone: !!phone, partySize: !!partySize, date: !!date, time: !!time });
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Test connection first
    console.log('Testing Supabase connection...');
    const { data: testData, error: testError } = await supabaseAdmin
      .from('reservations')
      .select('*')
      .limit(1);
    
    console.log('Connection test result:', { testData, testError });

    const insertData = {
      name,
      email,
      phone,
      party_size: parseInt(partySize), 
      date,
      time,
      created_at: new Date().toISOString()
    };

    console.log('Inserting data:', insertData);

    const { data, error } = await supabaseAdmin
      .from('reservations')
      .insert([insertData])
      .select(); 

    console.log('Insert result:', { data, error });
    console.log('Error details:', JSON.stringify(error, null, 2));

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ 
        message: 'Failed to create reservation',
        error: error.message,
        details: error
      }, { status: 500 });
    }

    if (!data || data.length === 0) {
      console.log('No data returned from insert');
      return NextResponse.json({ message: 'Insert may have failed - no data returned' }, { status: 500 });
    }

    console.log('Success! Reservation created:', data[0]);
    return NextResponse.json({ 
      message: 'Reservation created successfully',
      reservation: data[0]
    }, { status: 200 });

  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ 
      message: 'Internal Server Error',
      error: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 });
  }
}