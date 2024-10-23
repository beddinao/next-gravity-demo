import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle GET requests
export async function GET() {
  try {
    const items = await prisma.item.findMany(); // Fetch all items
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

// Handle POST requests
export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const newItem = await prisma.item.create({ data: { name } });
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}

// Handle PUT requests
export async function PUT(request: Request) {
  try {
    const { id, name } = await request.json();
    const updatedItem = await prisma.item.update({
      where: { id: parseInt(id, 10) },
      data: { name },
    });
    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

// Handle DELETE requests
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.item.delete({ where: { id: parseInt(id, 10) } });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
