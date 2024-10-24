import { useEffect, useRef, useState } from 'react';

export default function  Terrain(props: { objs: any, create: () => void, read: () => void,
  update: () => void, remove: () => void, setObjs: () => void
}) {

    var internalObjs = useRef(),
        requestId = useRef(),
        margin_x = useRef(),
        margin_y = useRef();

    var   ctx, w: number, h: number,
          dt = 0.07, g = 39.5, soft_c = 0.15;
  
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
  
    ///////////////////////// ANIMATE ///////////////////////////
    /*
    let   x_next = internalObjs.current[i].x + internalObjs.current[i].vx * dt + 0.5 * internalObjs.current[i].ax * dt * dt;
          let   y_next = internalObjs.current[i].y + internalObjs.current[i].vy * dt + 0.5 * internalObjs.current[i].ay * dt * dt;

          internalObjs.current[i].x = x_next;
          internalObjs.current[i].y = y_next;

          internalObjs.current[i].vx = internalObjs.current[i].vx + internalObjs.current[i].ax * dt;
          internalObjs.current[i].vy = internalObjs.current[i].vy + internalObjs.current[i].ay * dt;

          for (let i = 0; i < internalObjs.current.length; i++) {
  // ... (other calculations)

  for (let j = 0; j < internalObjs.current.length; j++) {
    if (i !== j) {
      // Calculate the distance between the centers of the objects
      const dx = internalObjs.current[j].x - internalObjs.current[i].x;
      const dy = internalObjs.current[j].y - internalObjs.current[i].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Check for collision
      if (distance <= internalObjs.current[i].radius + internalObjs.current[j].radius) {
        // Handle collision
        // ... (collision handling code)
      }
    }
  }
}
    */

    var animate = (ctx: any) => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "#343434";
      draw_background(ctx);
      ctx.strokeStyle = "#ffffff";

      if (internalObjs.current) {
        for (let i = 0; i < internalObjs.current.length; i++) {
          // P
          internalObjs.current[i].x += internalObjs.current[i].vx * dt;
          internalObjs.current[i].y += internalObjs.current[i].vy * dt;
          // A
          let   ax = 0, ay = 0;
          for (let j = 0; j < internalObjs.current.length; j++) {
            if (i != j) {

              let d_x = internalObjs.current[j].x - internalObjs.current[i].x,
                  d_y = internalObjs.current[j].y - internalObjs.current[i].y;

              let dist_sq = Math.sqrt(d_x * d_x + d_y * d_y);

              let f = (g * internalObjs.current[j].mass) / (dist_sq * Math.sqrt( dist_sq + soft_c ));
              ax += f * d_x;
              ay += f * d_y;

              if (dist_sq <= internalObjs.current[i].radius + internalObjs.current[j].radius){
                internalObjs.current[i].vx *= -1;
                internalObjs.current[i].vy *= -1;
              }

            }
          }
          internalObjs.current[i].ax = ax;
          internalObjs.current[i].ay = ay;
          // V
          internalObjs.current[i].vx += internalObjs.current[i].ax * dt;
          internalObjs.current[i].vy += internalObjs.current[i].ay * dt;
          // WALL CHECK
          if (internalObjs.current[i].x < 0 || internalObjs.current[i].x > w) {
            if (!internalObjs.current[i].reversed_x) {
                internalObjs.current[i].vx *= -1;
                internalObjs.current[i].reversed_x = true;
            }
          } 
          else
            internalObjs.current[i].reversed_x = false;

          if (internalObjs.current[i].y < 0 || internalObjs.current[i].y > h) {
            if (!internalObjs.current[i].reversed_y) {
                internalObjs.current[i].vy *= -1;
                internalObjs.current[i].reversed_y = true;
            }
          }
          else
            internalObjs.current[i].reversed_y = false;
          // DRAW
          ctx.beginPath();
          ctx.arc(internalObjs.current[i].x, internalObjs.current[i].y, internalObjs.current[i].radius, 0, 2 * Math.PI);
          ctx.stroke();
        }
        //props.setObjs(internalObjs.current);
      }


      requestId.current = requestAnimationFrame(() => animate(ctx));
    }

    ////////////////////////////////////////////////////

    useEffect(() => {
      var     canvas = document.getElementById("canvas");
      var     terrain = document.getElementById("terrain");
      var     rect = canvas.getBoundingClientRect();
  
      ctx = canvas.getContext("2d");
      w = canvas.width = terrain?.offsetWidth;
      h = canvas.height = terrain?.offsetHeight;
      margin_x.current = rect.left;
      margin_y.current = rect.top;
      ctx.lineWidth = 1;
      
      animate(ctx);

      return () => {
        cancelAnimationFrame(requestId.current);
      }

    }, []);

    useEffect(() => {
      internalObjs.current = props.objs;
    }, [props.objs])

    
    return (
      <div id="terrain">
        <canvas id="canvas" onClick={e => props.create(e.clientX - margin_x.current, e.clientY - margin_y.current)} >something went wrong!</canvas>
      </div>
    )
  }