import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle GET requests - Fetch all objects
export async function GET() {
  try {
    const objects = await prisma.object.findMany(); // Fetch all objects
    return NextResponse.json(objects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch objects' }, { status: 500 });
  }
}

// Handle POST requests - Create a new object
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

// Handle PUT requests - Update an existing object
export async function PUT(request: Request) {
  try {
    const { id, name, radius, mass, x, y, vx, vy, ax, ay } = await request.json();
    const updatedObject = await prisma.object.update({
      where: { id: parseInt(id, 10) },
      data: { name, radius, mass, x, y, vx, vy, ax, ay },
    });
    return NextResponse.json(updatedObject, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update object' }, { status: 500 });
  }
}

// Handle DELETE requests - Delete an object by id
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.object.delete({
      where: { id: parseInt(id, 10) },
    });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete object' }, { status: 500 });
  }
}


/*To calculate the next x and y positions for each object in your gravity simulator, you can use the following equations:

```
x_next = x_current + vx_current * dt + 0.5 * ax_current * dt^2
y_next = y_current + vy_current * dt + 0.5 * ay_current * dt^2
```

Where:

* `x_next` and `y_next` are the new x and y positions of the object.
* `x_current` and `y_current` are the current x and y positions of the object.
* `vx_current` and `vy_current` are the current x and y velocities of the object.
* `ax_current` and `ay_current` are the current x and y accelerations of the object.
* `dt` is the time step.

Here's how you can incorporate these equations into your rendering loop:

```javascript
function render() {
  // ... other rendering code

  for (const object of objects) {
    // Calculate next x and y positions
    const x_next = object.x + object.vx * dt + 0.5 * object.ax * dt * dt;
    const y_next = object.y + object.vy * dt + 0.5 * object.ay * dt * dt;

    // Update object's position
    object.x = x_next;
    object.y = y_next;

    // Render the object at its new position
    renderObject(object);
  }

  // ... other rendering code
}
```

Remember to update the object's velocity and acceleration in your simulation loop before calling the rendering function. This will ensure that the calculations are accurate.
*/



/*
The answer you received is solid and technically correct. It outlines how to update the position of each object based on its current velocity and acceleration using basic physics equations. The equations provided are derived from the kinematic equation for uniformly accelerated motion, which is appropriate for a simple gravity simulation. Here’s a breakdown:
Pros:

    Correct Physics: The formula uses x = x_0 + v * t + 0.5 * a * t^2, which is correct for uniformly accelerated motion.
    Time Step (dt): Including dt helps account for the time increment in each step of the simulation.
    Integration into Rendering Loop: The implementation inside the rendering loop ensures the object's position gets updated before being rendered, which makes the approach practical for real-time simulations.

Possible Improvements:

    Velocity Update: The answer mentions updating the velocity, but the actual velocity update isn’t shown in the code. After updating the position, you should also update the velocity:

    javascript

    object.vx = object.vx + object.ax * dt;
    object.vy = object.vy + object.ay * dt;

    Error Accumulation: In many simulations, this method is fine, but in high-precision scenarios or longer simulations, simple numerical integration (like this one) can lead to error accumulation. You might want to consider more advanced techniques like Verlet Integration if precision is important.

    Collision Detection: If your simulation has multiple objects interacting or if they might collide, you would need additional logic to handle that, but that might not be within the scope of your original question.

Overall, it's a good and straightforward answer for a basic physics simulation!
*/