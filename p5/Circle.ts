import p5, { Color } from "p5";

export class Circle {
  p: p5;

  pos: p5.Vector;
  vel: p5.Vector;
  radius: number;

  ctx: CanvasRenderingContext2D;
  c: string | Color | number[];

  width: number;
  height: number;

  constructor(
    p: p5,
    x: number,
    y: number,
    radius: number,
    width: number,
    height: number,
  ) {
    this.p = p;
    this.pos = p.createVector(x, y);
    this.vel = p5.Vector.random2D().mult(p.random(2, 4));
    this.radius = radius;
    this.width = width;
    this.height = height;

    this.ctx = p.drawingContext;
    this.c = this.getPastelColor();
  }

  update() {
    this.pos.add(this.vel);

    if (this.pos.x > this.width) {
      this.vel.x *= -1;
      this.pos.x = this.width;
    } else if (this.pos.x < 0) {
      this.vel.x *= -1;
      this.pos.x = 0;
    }
    if (this.pos.y > this.height) {
      this.vel.y *= -1;
      this.pos.y = this.height;
    } else if (this.pos.y < 0) {
      this.vel.y *= -1;
      this.pos.y = 0;
    }
  }

  display() {
    let gradient = this.ctx.createRadialGradient(
      this.pos.x,
      this.pos.y,
      0,
      this.pos.x,
      this.pos.y,
      this.radius,
    );

    let r = this.p.red(this.c);
    let g = this.p.green(this.c);
    let b = this.p.blue(this.c);

    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

    this.ctx.save();
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  getPastelColor() {
    // const palette = [
    //   this.p.color(10, 34, 199), // #0A22C7
    //   this.p.color(51, 76, 211), // #334CD3
    //   this.p.color(98, 117, 222), // #6275DE
    //   this.p.color(142, 155, 233), // #8E9BE9
    //   this.p.color(185, 194, 244), // #B9C2F4
    //   this.p.color(231, 235, 253), // #E7EBFD
    // ];

    const palette = [
      this.p.color(37, 73, 42), // deep shade
      this.p.color(74, 130, 82), // mid shade
      this.p.color(124, 175, 131), // light shade
      this.p.color(186, 215, 191), // base
      this.p.color(209, 229, 213), // light tint
      this.p.color(232, 243, 234), // pale tint
      this.p.color(245, 250, 246), // near white tint
    ];

    return this.p.random(palette);
  }
}
