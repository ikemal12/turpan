import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('=== ROUTE HIT ===');
  return NextResponse.json({ message: 'Route working!' });
}