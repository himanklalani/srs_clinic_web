import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path');
  
  if (!path) {
    return NextResponse.json({ message: 'Missing path param' }, { status: 400 });
  }

  try {
    revalidatePath(path, 'page');
    return NextResponse.json({ revalidated: true, path, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ revalidated: false, message: 'Error revalidating' }, { status: 500 });
  }
}
