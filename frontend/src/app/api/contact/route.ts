import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Contact form payload received:", body);
    return NextResponse.json({ success: true, message: "Contact recorded successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Bad Request" }, { status: 400 });
  }
}
