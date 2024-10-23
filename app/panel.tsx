import {useState, useEffect} from 'react';

export default function Panel (props: { objs: any; }) {
  const [selected_obj, setSlected_obj] = useState([]);

  return (
    <div id="panel">
      <div>
        <p>INSPECT - EDIT - DELETE</p>
      </div>
      <div>
        <div id="drop_down" ></div>
        <div id="drop_down_content">
          <p>obj_1</p>
        </div>
      </div>
      <div>
        <ul></ul>
      </div>
      <div><button>SAVE</button><button>DELETE</button></div>
    </div>
  );
}