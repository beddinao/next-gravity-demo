import {useState, useEffect} from 'react';


export default function Panel (props: { objs: any; create: Function; read: Function;
  update: Function; remove: Function;
}) {
  const [s_id, setS_id] = useState<number>(0);
  const [s_name, setS_name] = useState<string>('');
  const [s_mass, setS_mass] = useState<number>(0);
  const [s_radius, setS_radius] = useState<number>(0);
  const [s_x, setS_x] = useState<number>(0);
  const [s_y, setS_y] = useState<number>(0);
  const [s_vx, setS_vx] = useState<number>(0);
  const [s_vy, setS_vy] = useState<number>(0);
  const [s_ax, setS_ax] = useState<number>(0);
  const [s_ay, setS_ay] = useState<number>(0);
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
        <div id="drop_down" onClick={() => drop_d_dis()} ><p>{s_name}</p></div>
        {
          drop_down_droped_down ?
            <div id="drop_down_content" >
              {
                props.objs.map((item) => (
                  <p>{item.name}</p>
                ))
              }
            </div>
          : []
        }
      </div>
      <div>
        <div><p>id</p><p>{s_id}</p></div>
        <div><p>name</p><p>{s_name}</p></div>
        <div><p>solar_mass</p><p>{s_mass}</p></div>
        <div><p>radius</p><p>{s_radius}</p></div>
        <div><p>x</p><p>{s_x}</p></div>
        <div><p>y</p><p>{s_y}</p></div>
        <div><p>vx</p><p>{s_vx}</p></div>
        <div><p>vy</p><p>{s_vy}</p></div>
        <div><p>ax</p><p>{s_ax}</p></div>
        <div><p>ay</p><p>{s_ay}</p></div>

      </div>
      <div>
        <button onClick={() => create(s_name, s_radius, s_mass, s_x, s_y, s_vx, s_vy, s_ax, s_ay)} >SAVE</button>
        <button onClick={() => remove(s_id)} >DELETE</button>
      </div>
    </div>
  );
}