import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
	try {
		const objects = await prisma.object.findMany();
		return NextResponse.json(objects);
	} catch (error) {
		console.log("GET: ", error);
		return NextResponse.json({ error: 'Failed to fetch objects' }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		var contentType = request.headers.get('content-type');
		if (!contentType || contentType === undefined)
			contentType = request.headers.get('Content-Type');
		if (!contentType || contentType === undefined || contentType !== 'application/json')
			return	NextResponse.json({error: 'Invalid request'}, {status: 400});

		const { name, radius, mass, x, y, vx, vy, ax, ay } = await request.json();
		
		if (!name || name.length > 20 || !name.length || radius < 0 || radius > 400
		   || mass < 0 || mass > 10000 || x > 10000 || y > 10000 || vx > 10000
		   || ax > 10000 || ay > 10000) {
			   return NextResponse.json({error: 'Invaild input'}, {status: 400});
		   }

		const newObject = await prisma.object.create({
			data: { name, radius, mass, x, y, vx, vy, ax, ay },
		});
		return NextResponse.json(newObject, { status: 201 });
	} catch (error) {
		console.log("POST:", error);
		return NextResponse.json({ error: 'Failed to create object' }, { status: 500 });
	}
}

export async function PUT(request: Request) {
	try {
		var	contentType = request.headers.get('content-type');
		if (!contentType || contentType === undefined) contentType = request.headers.get('Content-Type');
		if (!contentType || contentType === undefined || contentType !== 'application/json')
			return	NextResponse.json({error: 'Invalid request'}, {status: 400});

		const { id, name, radius, mass, x, y, vx, vy, ax, ay } = await request.json();
		const parsedId = parseInt(id, 10);

		if (isNaN(parsedId) || id < 0 || id > 10000 || !name || name.length > 20 || !name.length || radius < 0 || radius > 400
		   || mass < 0 || mass > 10000 || x < 0 || x > 10000 || y < 0 || y > 10000 || vx > 10000
		   || ax > 10000 || ay > 10000) {
			return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
		}
		const updatedObject = await prisma.object.update({
			where: { id: parsedId },
			data: { name, radius, mass, x, y, vx, vy, ax, ay },
		});
		return NextResponse.json(updatedObject, { status: 200 });
	} catch (error) {
		console.log("PUT:", error);
		return NextResponse.json({ error: 'Failed to update object' }, { status: 500 });
	}
}

export async function DELETE(request: Request) {
	try {
		var	contentType = request.headers.get('content-type');
		if (!contentType || contentType === undefined) contentType = request.headers.get('Content-Type');
		if (!contentType || contentType === undefined || contentType !== 'application/json')
			return	NextResponse.json({error: 'Invalid request'}, {status: 400});

		const { id } = await request.json();
		const parsedId = parseInt(id, 10);

		if (isNaN(parsedId) || id < 0 || id > 10000) {
			return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
		}
		await prisma.object.delete({
			where: { id: parsedId },
		});

		return NextResponse.json(null, { status: 200 });
	} catch (error) {	
		console.log("DELETE: ", error);
		return NextResponse.json({ error: 'Failed to delete object' }, { status: 500 });
	}
}
