'use client'

import {useState, useEffect, useRef } from 'react';
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

  var rand_str = () => {
		return	Math.random().toString(36).substr(2);
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
          <li>to create new objects click inside the canvas and drag to setup velocity</li>
          <li>click and drag on the side panel to move it</li>
          <li>objects themselves and their initial settings are stored in the database and updated upon editing, creation and deleting (does not get updated per frame).</li>
        </ul>
      </div>
      <div>
        <Terrain
          objs={objects}
          create={(x: number, y: number) => {
            addObject(rand_str(), 10, 0, x, y, 0, 0, 0, 0);
          }}
          read={fetchObjects}
          update={updateObject}
          remove={deleteObjects}
        />
      </div>

    </main>
  );
}
/*    <input placeholder='name' onChange={e => setS_name(e.target.value)}/>
      <input type='number' placeholder='radius' onChange={e => setS_radius(Number(e.target.value))}/>
      <input type='number' placeholder='mass' onChange={e => setS_mass(Number(e.target.value))}/>
      <input type='number' placeholder='x' onChange={e => setS_x(Number(e.target.value))}/>
      <input type='number' placeholder='y' onChange={e => setS_y(Number(e.target.value))}/>
      <input type='number' placeholder='vx' onChange={e => setS_vx(Number(e.target.value))}/>
      <input type='number' placeholder='vy' onChange={e => setS_vy(Number(e.target.value))}/>
      <input type='number' placeholder='ax' onChange={e => setS_ax(Number(e.target.value))}/>
      <input type='number' placeholder='ay' onChange={e => setS_ay(Number(e.target.value))}/>

      <button onClick={() => addObject(s_name, s_radius, s_mass, s_x, s_y, s_vx, s_vy, s_ax, s_ay)} >add</button>
      <button onClick={() => {
        let     target = objects.find((({name}) => name == s_name));

        updateObject(target.id, s_name, s_radius, s_mass, s_x, s_y, s_vx, s_vy, s_ax, s_ay);
      }} >update</button>
      {
        objects.map((object) => (
          <div key={object.id} >
            <p>{object.id}</p>
            <p>{object.name}</p> 
            <p>{object.mass}</p>
            <p>{object.radius}</p>
            <p>{object.x}</p>
            <p>{object.y}</p>
            <p>{object.vx}</p>
            <p>{object.vy}</p>
            <p>{object.ax}</p>
            <p>{object.ay}</p>
            <button onClick={ () => deleteObjects(object.id) } >delete</button>
          </div>
        ))
      }*/