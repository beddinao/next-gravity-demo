import { Object } from '@prisma/client';
import { useState, useEffect, useRef } from 'react';

export default function Panel (props: { objs: any, create: (name: string, radius: number, mass: number, x: number, y: number, vx: number, vy: number, ax: number, ay: number) => Promise<void>,
  read: () => void,
  update: (id: number, name: string, radius: number, mass: number, x: number, y: number, vx: number, vy: number, ax: number, ay: number) => Promise<void>,
  remove: (id: number) => Promise<void>
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
  var parentRect = useRef<DOMRect>();

  var drop_d_dis = () => {
    setDrop_down_droped_down(drop_down_droped_down ? false : true);
  }

  var   setSelected = (object: Object) => {
    setS_id(object.id);
    setS_name(object.name);
    setS_mass(object.mass);
    setS_radius(object.radius);
    setS_x(object.x);
    setS_y(object.y);
    setS_vx(object.vx);
    setS_vy(object.vy);
    setS_ax(object.ax);
    setS_ay(object.ay);
  }

  useEffect(() => {
    if (props.objs.length) {
      setSelected(props.objs[0]);
      console.log("selected: ", props.objs[0]);
    }
  }, [props.objs]);

  useEffect(() => {
    var elem = document.getElementById("drop_down");
    if (elem) {
      parentRect.current = elem.getBoundingClientRect();
    }
  }, []);

  var validate_input = (value:any, name:string) => {
    let n = Number(value);
    if (n > 0 && n < 100)
        return  true;
    console.log(name, " must be 0> & <100");
    return  false;
  }

  return (
    <div id="panel">
      <div>
        <p>INSPECT - EDIT - DELETE</p>
      </div>
      <div>
        <div id="drop_down" onClick={() => {
          if (props.objs.length)
            drop_d_dis();
        }} ><p>{ s_name.length ? s_name : "empty" }</p></div>
        {
          drop_down_droped_down ?
            <div id="drop_down_content" style={{ top: parentRect.current ? (parentRect.current.top + parentRect.current.height).toString() + "px" : 0, left: parentRect.current ? parentRect.current.left.toString() + "px" : 0 }} >
              {
                props.objs.map((object: Object) => (
                      object.id != s_id ?
                        <p key={object.id} onClick={() => {
                          setSelected(object);
                          drop_d_dis();
                        }}>{object.name}</p>
                      : null
                ))
              }
            </div>
          : []
        }
      </div>
      <div>
        <div><p>name</p><input value={s_name} onChange={e => {
          if (e.target.value.length > 0 && e.target.value.length < 20)
            setS_name(e.target.value)
          else console.log("name length must be 0> & <20");
        }} /></div>
        <div><p>solar_mass</p><input value={s_mass} onChange={e => {
         if (validate_input(e.target.value, "mass"))
              setS_mass(Number(e.target.value));
        }} /></div>
        <div><p>radius</p><input value={s_radius} onChange={e => validate_input(e.target.value, "radius") ? setS_radius(Number(e.target.value)) : []} /></div>
        <div><p>x</p><input value={s_x} onChange={e => validate_input(e.target.value, "x") ? setS_x(Number(e.target.value)) : []} /></div>
        <div><p>y</p><input value={s_y} onChange={e => validate_input(e.target.value, "y") ? setS_y(Number(e.target.value)) : []} /></div>
        <div><p>vx</p><input value={s_vx} onChange={e => validate_input(e.target.value, "vx") ? setS_vx(Number(e.target.value)) : []} /></div>
        <div><p>vy</p><input value={s_vy} onChange={e => validate_input(e.target.value, "vy") ? setS_vy(Number(e.target.value)): []} /></div>
        <div><p>ax</p><input value={s_ax} onChange={e => validate_input(e.target.value, "ax") ? setS_ax(Number(e.target.value)) : []} /></div>
        <div><p>ay</p><input value={s_ay} onChange={e => validate_input(e.target.value, "ay") ? setS_ay(Number(e.target.value)) : []} /></div>
      </div>
      <div>
        <button onClick={() => {
          let target = props.objs.find((obj: Object) => (obj as Object).id == s_id);
          if (target != undefined) {
            props.update(s_id, s_name, s_radius, s_mass, s_x, s_y, s_vx, s_vy, s_ax, s_ay);
            props.read();
          }
        }} >SAVE</button>
        <button onClick={() => {
          let target = props.objs.find((obj: Object) => (obj as Object).id == s_id);
          console.log("called delete");
          if (target != undefined) {
            props.remove(target.id);
            props.read();
          }
          }} >DELETE</button>
      </div>
    </div>
  );
}