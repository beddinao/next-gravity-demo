'use client'

import Image from "next/image";
import {useState, useEffect } from 'react';
import Panel from './panel';
import Terrain from './terrain'

interface Item {
  id: number;
  name: string;
}

export default function Home() {
  var initial_objs = [
    {
      name: "obj_1",
      mass: 1,
      radius: 20,
      x: 50,
      y: 100,
      z: 5,
      vx: 2,
      vy: 12,
      vz: 15,
      ax: 20,
      ay: 60,
      az: 3
    }
  ]


  return (
    <main>
      <Homeee />
      { /*<div>
        <Panel objs={initial_objs} />
        <ul>
          <li>to create new objects click inside the canvas and drag to setup velocity</li>
          <li>click and drag on the side panel to move it</li>
          <li>objects themselves and their initial settings are stored in the database and updated upon editing, creation and deleting (does not get updated per frame).</li>
        </ul>
      </div>
      <div>
        <Terrain  objs={initial_objs} />
  </div>*/}
    </main>
  );
}
