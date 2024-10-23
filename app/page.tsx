'use client'

import {useState, useEffect } from 'react';
import Panel from './panel';
import Terrain from './terrain'

interface Item {
  id: number;
  name: string;
  radius: number;
  mass: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
}

export default function Home() {
  
  const [objects, setObjects] = useState<Object[]>([]);
  const [s_name, setS_name] = useState<string>('');
  const [s_mass, setS_mass] = useState<number>(0);
  const [s_radius, setS_radius] = useState<number>(0);
  const [s_x, setS_x] = useState<number>(0);
  const [s_y, setS_y] = useState<number>(0);
  const [s_vx, setS_vx] = useState<number>(0);
  const [s_vy, setS_vy] = useState<number>(0);
  const [s_ax, setS_ax] = useState<number>(0);
  const [s_ay, setS_ay] = useState<number>(0);

  useEffect(() => {
    fetchObjects();
  }, []);

  var fetchObjects = async () => {
    const res = await fetch('/api/objects');
    const data: Object[] = await res.json();
    setObjects(data);
  };

  var addObject = async (name: string,
    radius: number, mass: number,
    x: number, y: number,
    vx: number, vy: number,
    ax : number, ay: number
   ) => {
    const res = await fetch('/api/objects', {
      method: 'POST',
      headers: { 'Content-Type':  'application/json'},
      body: JSON.stringify({ name, radius, mass, x, y, vx, vy, ax, ay })
    })
    const newObject: Object = await res.json();
    setObjects([...objects, newObject]);
  }

  var updateObject = async (id: number, name: string,
    radius: number, mass: number,
    x: number, y: number,
    vx: number, vy: number,
    ax: number, ay: number
  ) => {
    await fetch ('/api/objects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, radius, mass, x, y, vx, vy, ax, ay })
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

  return (
    <main>
      {/*<Homeee /><div>
        <Panel objs={objects} setObjs={setObjects} />
        <ul>
          <li>to create new objects click inside the canvas and drag to setup velocity</li>
          <li>click and drag on the side panel to move it</li>
          <li>objects themselves and their initial settings are stored in the database and updated upon editing, creation and deleting (does not get updated per frame).</li>
        </ul>
      </div>
      <div>
        <Terrain  objs={objects} setObjs={setObjs} />
      </div>*/}

      
    </main>
  );
}
