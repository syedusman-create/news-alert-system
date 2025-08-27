import { NextRequest, NextResponse } from 'next/server';
import { readIncidentsFromCSV } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const incidents = await readIncidentsFromCSV();
    const incident = incidents.find(inc => inc.id === params.id);
    
    if (!incident) {
      return NextResponse.json(
        { error: 'Incident not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(incident);
  } catch (error) {
    console.error('Error fetching incident:', error);
    return NextResponse.json(
      { error: 'Failed to fetch incident' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    
    if (!['New', 'Acknowledged', 'Resolved'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Note: In a real application, you would update the database here
    // For this demo, we'll just return success since we're using CSV
    // In production, you'd want to implement proper data persistence
    
    return NextResponse.json({ 
      success: true, 
      message: 'Status updated successfully',
      newStatus: status
    });
  } catch (error) {
    console.error('Error updating incident status:', error);
    return NextResponse.json(
      { error: 'Failed to update incident status' },
      { status: 500 }
    );
  }
}