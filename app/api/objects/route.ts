import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const objects = await prisma.object.findMany();
    return NextResponse.json(objects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch objects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, radius, mass, x, y, vx, vy, ax, ay } = await request.json();
    const newObject = await prisma.object.create({
      data: { name, radius, mass, x, y, vx, vy, ax, ay },
    });
    return NextResponse.json(newObject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create object' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, name, radius, mass, x, y, vx, vy, ax, ay } = await request.json();
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
    const updatedObject = await prisma.object.update({
      where: { id: parsedId },
      data: { name, radius, mass, x, y, vx, vy, ax, ay },
    });
    return NextResponse.json(updatedObject, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update object' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
    await prisma.object.delete({
      where: { id: parsedId },
    });

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to delete object' }, { status: 500 });
  }
}
