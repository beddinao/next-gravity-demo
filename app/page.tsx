'use client'

import Image from "next/image";
import {useState, useEffect } from 'react';

function Panel (props: { objs: any; }) {
  const [selected_obj, setSelected_obj] = useState(0);
  const [drop_down_droped_down, setDrop_down_droped_down] = useState(false);

  var drop_d_dis = () => {
    setDrop_down_droped_down(drop_down_droped_down ? false : true);
  }

  return (
    <div id="panel">
      <div>
        <p>INSPECT - EDIT - DELETE</p>
      </div>
      <div>
        <div id="drop_down" onClick={() => drop_d_dis()} ><p>{props.objs[selected_obj].name}</p></div>
        {
          drop_down_droped_down ?
            <div id="drop_down_content" >
              {
                props.objs.map((item: { name: string  }) => (
                  <p>{item.name}</p>
                ))
              }
            </div>
          : []
        }
      </div>
      <div>

        <div><p>name</p><p>{props.objs[selected_obj].name}</p></div>
        <div><p>solar_mass</p><p>{props.objs[selected_obj].mass}</p></div>
        <div><p>radius</p><p>{props.objs[selected_obj].radius}</p></div>
        <div><p>x</p><p>{props.objs[selected_obj].x}</p></div>
        <div><p>y</p><p>{props.objs[selected_obj].y}</p></div>
        <div><p>y</p><p>{props.objs[selected_obj].z}</p></div>
        <div><p>z</p><p>{props.objs[selected_obj].z}</p></div>
        <div><p>vx</p><p>{props.objs[selected_obj].vx}</p></div>
        <div><p>vy</p><p>{props.objs[selected_obj].vy}</p></div>
        <div><p>vz</p><p>{props.objs[selected_obj].vz}</p></div>
        <div><p>ax</p><p>{props.objs[selected_obj].ax}</p></div>
        <div><p>ay</p><p>{props.objs[selected_obj].ay}</p></div>
        <div><p>az</p><p>{props.objs[selected_obj].az}</p></div>

      </div>
      <div><button>SAVE</button><button>DELETE</button></div>
    </div>
  );
}

function  Terrain(props: { objs: any; }) {
  
  var   ctx, w: number, h: number;

  var draw_background = (ctx: any) => {

    for (let i = 0; i < w; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, h);
      ctx.stroke();
    }

    for (let i = 0; i < h; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(w, i);
      ctx.stroke();
    }
  }

  var animate = (ctx: any) => {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "#343434";
    draw_background(ctx);
    ctx.strokeStyle = "#ffffff";

    for (let i = 0; i < props.objs.length; i++) {
      ctx.beginPath();
      ctx.arc(props.objs[i].x, props.objs[i].y, props.objs[i].radius, 0, 2*Math.PI);
      ctx.stroke();
    }

    //requestAnimationFrame(() => animate(ctx))
  }

  useEffect(() => {
    var     canvas = document.getElementById("canvas");
    var     terrain = document.getElementById("terrain");

    ctx = canvas.getContext("2d");
    w = canvas.width = terrain?.offsetWidth;
    h = canvas.height = terrain?.offsetHeight;
    ctx.lineWidth = 1;
    animate(ctx);

  }, [])

  return (
    <div id="terrain">
      <canvas id="canvas">something went wrong!</canvas>
    </div>
  )
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
      <div>
        <Panel objs={initial_objs} />
        <ul>
          <li>to create new objects click inside the canvas and drag to setup velocity</li>
          <li>click and drag on the side panel to move it</li>
          <li>objects themselves and their initial settings are stored in the database and updated upon editing, creation and deleting (does not get updated per frame).</li>
        </ul>
      </div>
      <div>
        <Terrain  objs={initial_objs} />
      </div>
    </main>
  );
}
