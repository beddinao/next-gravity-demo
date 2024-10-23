
import { useEffect, useRef, useState } from 'react';

export default function  Terrain(props: { objs: any, create: () => void, read: () => void,
  update: () => void, remove: () => void
}) {
  
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

    var reset_events = (canvas: any) => {
      canvas.onmousedown = () => {};
      canvas.onmousemove = () => {};
      canvas.onmouseup = () => {};
    }

    var   setup_events = (canvas: any, drag: boolean) => {
      canvas.onmousedown = (e: any) => {
        console.log("mousedown e.x: ", e.clientX, "; e.y: ", e.clientY);
        reset_events(canvas);
        setup_events(canvas, true);
      };
      canvas.onmousemove = (e: any) => {
        if (drag) {
          console.log("mousemove e.x: ", e.clientX, "; e.y: ", e.clientY);
        }
      };
      canvas.onmouseup = (e: any) => {
        console.log("mouseup e.x: ", e.clientX, "; e.y: ", e.clientY)
        reset_events(canvas);
        setup_events(canvas, false);
      };
    }
  
    ///////////////////////// ANIMATE ///////////////////////////

    var animate = (ctx: any) => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "#343434";
      draw_background(ctx);
      ctx.strokeStyle = "#ffffff";
  
      for (let i = 0; i < props.objs.length; i++) {
        ctx.beginPath();
        ctx.arc(props.objs[i].x, props.objs[i].y, props.objs[i].radius, 0, 2 * Math.PI);
        ctx.stroke();
      }

      requestAnimationFrame(() => animate(ctx))
    }

    ////////////////////////////////////////////////////

    useEffect(() => {
      var     canvas = document.getElementById("canvas");
      var     terrain = document.getElementById("terrain");
  
      ctx = canvas.getContext("2d");
      w = canvas.width = terrain?.offsetWidth;
      h = canvas.height = terrain?.offsetHeight;
      ctx.lineWidth = 1;
      
      setup_events(canvas, false);
      animate(ctx);
  
    }, [])
  
    return (
      <div id="terrain">
        <canvas id="canvas">something went wrong!</canvas>
      </div>
    )
  }