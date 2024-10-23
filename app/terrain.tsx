
import { useEffect, useRef, useState } from 'react';

export default function  Terrain(props: { objs: any, create: () => void, read: () => void,
  update: () => void, remove: () => void
}) {
    var internalObjs = useRef(),
        requestId = useRef(),
        margin_x = useRef(),
        margin_y = useRef();
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
  
    ///////////////////////// ANIMATE ///////////////////////////

    var animate = (ctx: any) => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "#343434";
      draw_background(ctx);
      ctx.strokeStyle = "#ffffff";
      
      if (internalObjs.current)
        for (let i = 0; i < internalObjs.current.length; i++) {
          ctx.beginPath();
          ctx.arc(internalObjs.current[i].x, internalObjs.current[i].y, internalObjs.current[i].radius, 0, 2 * Math.PI);
          ctx.stroke();
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
        <canvas id="canvas" onClick={e => props.create(e.clientX - maring_x.current, e.clientY - margin_y.current)} >something went wrong!</canvas>
      </div>
    )
  }