import { NextRequest, NextResponse } from 'next/server';
import { mockUsers } from '@/lib/data';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // In a real app, you'd generate a JWT token here
    const token = `mock-token-${user.id}`;
    
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email
      },
      token
    });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
