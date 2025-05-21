import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Object } from "@prisma/client";

export default function Terrain(props: {
  objs: any[];
  create: (x: number, y: number) => void;
  target_mass: number;
}) {
  const [canvasRefresh, setCanvasRefresh] = useState<boolean>(false);
  var internalObjs = useRef<any>([]),
    requestId = useRef<number | null>(null),
    margin_x = useRef<number>(0),
    margin_y = useRef<number>(0),
    canvasRefreshRef = useRef<boolean>(false);

  var target_massRef = useRef<number>(props.target_mass);

  var ctx,
    w: number,
    h: number,
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
    let mass_i = {x: 0, y: 0};

    if (internalObjs.current && internalObjs.current.length) {
      mass_i.x = internalObjs.current[target_massRef.current].x;
      mass_i.y = internalObjs.current[target_massRef.current].y;
    }

    ctx.clearRect(mass_i.x - ( w / 2 )  , mass_i.y - ( h / 2 )  , w  , h  ) ;
    //ctx.clearRect(0, 0, w, h);
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
        /*if (w) {
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
        }*/

        ///////////////////////////

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

              /*let totalMass =
                internalObjs.current[i].mass + internalObjs.current[j].mass;
              let moveRatio1 = internalObjs.current[j].mass / totalMass;
              internalObjs.current[i].x -= overlap * moveRatio1 * nx;
              internalObjs.current[i].y -= overlap * moveRatio1 * ny;

              let moveRatio2 = internalObjs.current[i].mass / totalMass;
              internalObjs.current[j].x += overlap * moveRatio2 * nx;
              internalObjs.current[j].y += overlap * moveRatio2 * ny;*/

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

                if (isNaN(internalObjs.current[i].vx))
                  internalObjs.current[i].vx = 0;
                if (isNaN(internalObjs.current[i].vy))
                  internalObjs.current[i].vy = 0;

                if (isNaN(internalObjs.current[j].vx))
                  internalObjs.current[j].vx = 0;
                if (isNaN(internalObjs.current[j].vy))
                  internalObjs.current[j].vy = 0;
              }
            }
          }
        }
      }

      /////////////////////

      if (internalObjs.current && internalObjs.current.length) {
        ctx.resetTransform();
        ctx.translate(
          - (internalObjs.current[target_massRef.current].x - (w / 2)),
          - (internalObjs.current[target_massRef.current].y - (h / 2))
        );
    }

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

  useEffect(() => {
    target_massRef.current = props.target_mass;
  }, [props.target_mass]);

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
