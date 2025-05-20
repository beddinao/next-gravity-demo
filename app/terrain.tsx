import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Object } from "@prisma/client";

export default function Terrain(props: {
  objs: any[];
  create: (x: number, y: number) => void;
}) {
  const [canvasRefresh, setCanvasRefresh] = useState<boolean>(false);
  var internalObjs = useRef<any>([]),
    requestId = useRef<number | null>(null),
    margin_x = useRef<number>(0),
    margin_y = useRef<number>(0),
    canvasRefreshRef = useRef<boolean>(false);

  var ctx,
    w: number | undefined,
    h: number | undefined,
    dt = 0.07,
    g = 39.5,
    soft_c = 0.15;

  var draw_background = (ctx: any) => {
    ctx.strokeStyle = "#a19f9f";
    if (w == undefined || h == undefined) return;
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
  };

  const refRequestAnimationFrame = (ctx: any) => {
    requestId.current = requestAnimationFrame(() => animate(ctx));
  };

  ///////////////////////// ANIMATE ///////////////////////////

  var animate = (ctx: any) => {
    ctx.clearRect(0, 0, w, h);
    draw_background(ctx);
    //ctx.strokeStyle = "#ffffff";
    //ctx.strokeStyle = "#4287f5";

    if (internalObjs.current) {
      for (let i = 0; i < internalObjs.current.length; i++) {
        // P
        internalObjs.current[i].x += internalObjs.current[i].vx * dt;
        internalObjs.current[i].y += internalObjs.current[i].vy * dt;
        // A
        let ax = 0,
          ay = 0;
        for (let j = 0; j < internalObjs.current.length; j++) {
          if (i != j) {
            let d_x = internalObjs.current[j].x - internalObjs.current[i].x,
              d_y = internalObjs.current[j].y - internalObjs.current[i].y;

            let dist_sq = Math.sqrt(d_x * d_x + d_y * d_y);

            let f =
              (g * internalObjs.current[j].mass) /
              (dist_sq * Math.sqrt(dist_sq + soft_c));
            ax += f * d_x;
            ay += f * d_y;

            // probably some collision detection

            //////////////////////////////////////////////
          }
        }

        ///
        internalObjs.current[i].ax = ax;
        internalObjs.current[i].ay = ay;
        // V
        internalObjs.current[i].vx += internalObjs.current[i].ax * dt;
        internalObjs.current[i].vy += internalObjs.current[i].ay * dt;
        // WALL CHECK
        if (w) {
          if (internalObjs.current[i].x < 0 || internalObjs.current[i].x > w) {
            if (!internalObjs.current[i].reversed_x) {
              internalObjs.current[i].vx *= -1;
              internalObjs.current[i].reversed_x = true;
            }
          } else internalObjs.current[i].reversed_x = false;
        }
        if (h) {
          if (internalObjs.current[i].y < 0 || internalObjs.current[i].y > h) {
            if (!internalObjs.current[i].reversed_y) {
              internalObjs.current[i].vy *= -1;
              internalObjs.current[i].reversed_y = true;
            }
          } else internalObjs.current[i].reversed_y = false;
        }

        ///////////////////////////

        /*



nx = (x2 - x1) / distance
ny = (y2 - y1) / distance

For elastic collisions with component velocities (vx, vy):

1. Calculate the relative velocity components:
   ```
   rvx = vx2 - vx1
   rvy = vy2 - vy1
   ```

2. Calculate the dot product of relative velocity and normal:
   ```
   velDotNormal = rvx * nx + rvy * ny
   ```

3. If objects are moving away from each other, no collision response needed:
   ```
   if velDotNormal > 0:
       return  // Objects are separating
   ```

4. Calculate impulse scalar:
   ```
   // For perfectly elastic collisions
   e = 1.0  // coefficient of restitution (1 = elastic, 0 = inelastic)
   
   impulseScalar = -(1 + e) * velDotNormal / (1/mass1 + 1/mass2)
   ```

5. Apply impulse to velocity components:
   ```
   // For circle 1
   vx1 -= (impulseScalar * nx) / mass1
   vy1 -= (impulseScalar * ny) / mass1
   
   // For circle 2
   vx2 += (impulseScalar * nx) / mass2
   vy2 += (impulseScalar * ny) / mass2




   //////////////////::
   1. Calculate the overlap: `overlap = (radius1 + radius2) - distance`
2. Calculate the collision normal direction:
   ```
   nx = (x2 - x1) / distance
   ny = (y2 - y1) / distance
   ```
3. Move each circle away from the other along this normal, proportional to their masses:
   ```
   totalMass = mass1 + mass2
   
   // For circle 1
   moveRatio1 = mass2 / totalMass
   x1 -= overlap * moveRatio1 * nx
   y1 -= overlap * moveRatio1 * ny
   
   // For circle 2
   moveRatio2 = mass1 / totalMass
   x2 += overlap * moveRatio2 * nx
   y2 += overlap * moveRatio2 * ny
   ```
            */

        ////////////////////////////

        // COLORS SETUP
        ctx.strokeStyle = `rgb(${internalObjs.current[i].red}, ${internalObjs.current[i].green}, ${internalObjs.current[i].blue})`;
        ctx.fillStyle = `rgb(${internalObjs.current[i].red}, ${internalObjs.current[i].green}, ${internalObjs.current[i].blue})`;
        // DRAW TEXT
        ctx.globalAlpha = 1;
        ctx.fillText(
          internalObjs.current[i].name,
          internalObjs.current[i].x,
          internalObjs.current[i].y - internalObjs.current[i].radius - 10
        );
        // DRAW CIRCLE BORDERS
        ctx.beginPath();
        ctx.arc(
          internalObjs.current[i].x,
          internalObjs.current[i].y,
          internalObjs.current[i].radius,
          0,
          2 * Math.PI
        );
        ctx.stroke();
        // DRAW CIRCLE BG
        ctx.globalAlpha = 0.2;
        ctx.fill();
      }
      //props.setObjs(internalObjs.current);

      //////////////////////

      for (let i = 0; i < internalObjs.current.length; i++) {
        for (let j = 0; j < internalObjs.current.length; j++) {
          if (j != i) {
            let d_x = Math.pow(
                internalObjs.current[j].x - internalObjs.current[i].x,
                2
              ),
              d_y = Math.pow(
                internalObjs.current[j].y - internalObjs.current[i].y,
                2
              );

            let dist_sq = Math.sqrt(d_x + d_y);

            if (
              dist_sq <=
              internalObjs.current[i].radius + internalObjs.current[j].radius
            ) {
              let overlap =
                internalObjs.current[j].radius +
                internalObjs.current[i].radius -
                dist_sq;
              let nx =
                (internalObjs.current[j].x - internalObjs.current[i].x) /
                dist_sq;
              let ny =
                (internalObjs.current[j].y - internalObjs.current[i].y) /
                dist_sq;

              let totalMass =
                internalObjs.current[i].mass + internalObjs.current[j].mass;
              let moveRatio1 = internalObjs.current[j].mass / totalMass;
              internalObjs.current[i].x -= overlap * moveRatio1 * nx;
              internalObjs.current[i].y -= overlap * moveRatio1 * ny;

              let moveRatio2 = internalObjs.current[i].mass / totalMass;
              internalObjs.current[j].x += overlap * moveRatio2 * nx;
              internalObjs.current[j].y += overlap * moveRatio2 * ny;

              let rvx = internalObjs.current[j].vx - internalObjs.current[i].vx;
              let rvy = internalObjs.current[j].vy - internalObjs.current[i].vy;
              let velDotNormal = rvx * nx + rvy * ny;

              if (velDotNormal <= 0) {
                let e = 1.0;

                let impulseScalar =
                  (-(1 + e) * velDotNormal) /
                  (1 / internalObjs.current[i].mass +
                    1 / internalObjs.current[j].mass);

                internalObjs.current[i].vx -=
                  (impulseScalar * nx) / internalObjs.current[i].mass;
                internalObjs.current[i].vy -=
                  (impulseScalar * ny) / internalObjs.current[i].mass;

                internalObjs.current[j].vx +=
                  (impulseScalar * nx) / internalObjs.current[j].mass;
                internalObjs.current[j].vy +=
                  (impulseScalar * ny) / internalObjs.current[j].mass;
              }
            }
          }
        }
      }

      /////////////////////
    }
    refRequestAnimationFrame(ctx);
  };

  ////////////////////////////////////////////////////

  useEffect(() => {
    if (typeof window !== undefined)
      window.onresize = () => {
        setCanvasRefresh(canvasRefreshRef.current ? false : true);
      };
  }, []);

  useEffect(() => {
    var canvas = document.getElementById("canvas") as HTMLCanvasElement;
    var terrain = document.getElementById("terrain");
    canvasRefreshRef.current = canvasRefresh;

    if (canvas) {
      var rect = canvas.getBoundingClientRect();

      ctx = canvas.getContext("2d");
      if (ctx) {
        w = canvas.width =
          terrain?.offsetWidth !== undefined ? terrain?.offsetWidth : 0;
        h = canvas.height =
          terrain?.offsetHeight !== undefined ? terrain?.offsetHeight : 0;
        margin_x.current = rect.left;
        margin_y.current = rect.top;
        ctx.lineWidth = 1;

        ctx.font = "12px monospace all-small-caps";
        ctx.textAlign = "center";
        (
          ctx as CanvasRenderingContext2D & { fontVariantCaps: string }
        ).fontVariantCaps = "all-small-caps";
        ctx.fillStyle = "#7C7C7C";
        animate(ctx);
      }
    }

    return () => {
      if (requestId.current !== null) cancelAnimationFrame(requestId.current);
    };
  }, [canvasRefresh]);

  useEffect(() => {
    internalObjs.current = props.objs;
  }, [props.objs]);

  return (
    <div id="terrain">
      <canvas
        id="canvas"
        onClick={(e) =>
          props.create(
            e.clientX - (margin_x.current ? margin_x.current : 0),
            e.clientY - (margin_y.current ? margin_y.current : 0)
          )
        }
      >
        something went wrong try{" "}
        <a onClick={() => window.location.reload()}>refreshing</a>!
      </canvas>
    </div>
  );
}
