import Image from "next/image";

function Panel (){
  return (
    <div id="panel">
      <div>
        <p>INSPECT - EDIT - DELETE</p>
      </div>
      <div>
        
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
  return (
    <main>
      <div>
        <Panel />
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
