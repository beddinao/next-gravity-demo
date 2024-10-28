'use client'

import {useState, useEffect, useRef } from 'react';
import Panel from './panel';
import Terrain from './terrain'
import '@fontsource/open-sans'

interface Item {
  id: number;
  name: string;
  radius: number;
  mass: number;
  red: number;
  green: number;
  blue: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
}

export default function Home() {
  
  const [objects, setObjects] = useState<Object[]>([]);

  useEffect(() => {
    fetchObjects();
  }, []);

  var fetchObjects = async () => {
    const res = await fetch('/api/objects');
    const data: Object[] = await res.json();
    if (!Object.hasOwn(data, "error"))
	    setObjects(data);
  };  

  var addObject = async (name: string,
    radius: number, mass: number,
    red: number, green: number, blue: number,
    x: number, y: number,
    vx: number, vy: number,
    ax : number, ay: number
   ) => {
    const res = await fetch('/api/objects', {
      method: 'POST',
      headers: { 'Content-Type':  'application/json'},
      body: JSON.stringify({ name, radius, mass, red, green, blue, x, y, vx, vy, ax, ay })
    })
    const newObject: Object = await res.json();
    if (objects !== undefined && !Object.hasOwn(newObject, "error"))
	setObjects([...objects, newObject]);
  }

  var updateObject = async (id: number, name: string,
    radius: number, mass: number,
    red: number, green: number, blue: number,
    x: number, y: number,
    vx: number, vy: number,
    ax: number, ay: number
  ) => {
    await fetch ('/api/objects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, radius, mass, red, green, blue, x, y, vx, vy, ax, ay })
    })
    fetchObjects();
  }

  var deleteObjects = async (id: number) => {
    await fetch('/api/objects', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    fetchObjects();
  }

  var rand_str = () => {
		return	Math.random().toString(36).substr(2);
	}

  var rand_num = (min:number, max:number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <main>

      <div>
        <Panel objs={objects} 
            create={addObject}
            read={fetchObjects}
            update={updateObject}
            remove={deleteObjects}
          />
        <ul>
          <li>to create new objects click on the canvas</li>
          <li>use the side panel to edit an object properties (make sure to click save) or remove them</li>
          <li>objects themselves and their initial settings are stored in the database and updated upon editing, creation and deleting (does not get updated per frame).</li>
          <li>used Next.js, TypeScript, SQLite, and Prisma</li>
        </ul>
      </div>
      <div>
        <Terrain
          objs={objects}
          create={(x: number, y: number) => {
            addObject(rand_str(), rand_num(20, 100), rand_num(3, 30), rand_num(100, 255), rand_num(100, 255), rand_num(100, 255), x, y, 0, 0, 0, 0);
          }}
        />
      </div>

    </main>
  );
}
