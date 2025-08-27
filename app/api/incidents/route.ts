import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import Papa from 'papaparse';

export async function GET() {
  try {
    const csvPath = path.join(process.cwd(), 'Data', 'news_alert_sample_dataset_extended.csv');
    const csvContent = await fs.readFile(csvPath, 'utf-8');
    
    const { data } = Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading CSV file:', error);
    return NextResponse.json({ error: 'Failed to load incidents' }, { status: 500 });
  }
}
