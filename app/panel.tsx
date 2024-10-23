import {useState, useEffect} from 'react';


export default function Panel (props: { objs: any; }) {
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