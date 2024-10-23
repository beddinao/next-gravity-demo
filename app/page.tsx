'use client'

import Image from "next/image";
import {useState, useEffect, AwaitedReactNode, JSXElementConstructor, ReactElement, ReactNode, ReactPortal} from 'react';

function Panel (props: { objs: any; }) {
  const [selected_obj, setSlected_obj] = useState([]);
  const [local_objs, setLocal_objs] = useState(props.objs);

  return (
    <div id="panel">
      <div>
        <p>INSPECT - EDIT - DELETE</p>
      </div>
      <div>
        <div id="drop_down" >obj_1</div>
        {
          local_objs.length > 0 ?
            <div id="drop_down_content">
              {
                local_objs.map((item: { name: string  }) => (
                  <p>{item.name}</p>
                ))
              }
            </div>
          : []
        }
      </div>
      <div>
        <ul></ul>
      </div>
      <div><button>SAVE</button><button>DELETE</button></div>
    </div>
  );
}

function  Terrain() {
  return (
    <div id="terrain">
      <canvas id="canvas">something went wrong!</canvas>
    </div>
  )
}

export default function Home() {
  var initial_objs = [
    {
      name: "obj_1"
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
        <Terrain />
      </div>
    </main>
  );
}
