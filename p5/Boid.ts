import p5 from "p5";
import { generateTints, getCssColor } from "./colorUtils";

export class Boid {
  p: p5;

  acceleration: p5.Vector;
  velocity: p5.Vector;
  position: p5.Vector;

  size: number;
  maxSpeed: number;
  maxForce: number;

  color: p5.Color;

  constructor(p: p5, x: number, y: number) {
    this.p = p;

    this.acceleration = p.createVector(0, 0);
    this.velocity = p.createVector(p.random(-1, 1), p.random(-1, 1));
    this.position = p.createVector(x, y);

    this.size = 3.0;
    this.maxSpeed = 3;
    this.maxForce = 0.05;

    p.colorMode(p.RGB);
    this.color = this.getColor();
  }

  run(boids: Boid[]) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }

  applyForce(force: p5.Vector) {
    this.acceleration.add(force);
  }

  flock(boids: Boid[]) {
    const separation = this.separate(boids);
    const alignment = this.align(boids);
    const cohesion = this.cohesion(boids);

    separation.mult(1.5);
    alignment.mult(1.0);
    cohesion.mult(1.0);

    this.applyForce(separation);
    this.applyForce(alignment);
    this.applyForce(cohesion);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);

    this.acceleration.mult(0);
  }

  seek(target: p5.Vector) {
    const desired = p5.Vector.sub(target, this.position);

    desired.normalize();
    desired.mult(this.maxSpeed);

    const steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);

    return steer;
  }

  getColor() {
    const baseColor = getCssColor("--color-primary");
    const palette = generateTints(this.p, baseColor, 6);

    return this.p.random(palette);
  }

  render() {
    const theta = this.velocity.heading() + this.p.radians(90);

    this.p.fill(this.color);
    this.p.stroke(255);

    this.p.push();
    this.p.translate(this.position.x, this.position.y);
    this.p.rotate(theta);

    this.p.beginShape();
    this.p.vertex(0, -this.size * 2);
    this.p.vertex(-this.size, this.size * 2);
    this.p.vertex(this.size, this.size * 2);
    this.p.endShape(this.p.CLOSE);

    this.p.pop();
  }

  borders() {
    if (this.position.x < -this.size) {
      this.position.x = this.p.width + this.size;
    }

    if (this.position.y < -this.size) {
      this.position.y = this.p.height + this.size;
    }

    if (this.position.x > this.p.width + this.size) {
      this.position.x = -this.size;
    }

    if (this.position.y > this.p.height + this.size) {
      this.position.y = -this.size;
    }
  }

  separate(boids: Boid[]) {
    const desiredSeparation = 25;
    const steer = this.p.createVector(0, 0);
    let count = 0;

    for (const boid of boids) {
      const d = p5.Vector.dist(this.position, boid.position);

      if (d > 0 && d < desiredSeparation) {
        const diff = p5.Vector.sub(this.position, boid.position);
        diff.normalize();
        diff.div(d);

        steer.add(diff);
        count++;
      }
    }

    if (count > 0) steer.div(count);

    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(this.maxSpeed);
      steer.sub(this.velocity);
      steer.limit(this.maxForce);
    }

    return steer;
  }

  align(boids: Boid[]) {
    const neighborDist = 50;
    const sum = this.p.createVector(0, 0);
    let count = 0;

    for (const boid of boids) {
      const d = p5.Vector.dist(this.position, boid.position);

      if (d > 0 && d < neighborDist) {
        sum.add(boid.velocity);
        count++;
      }
    }

    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);

      const steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);

      return steer;
    }

    return this.p.createVector(0, 0);
  }

  cohesion(boids: Boid[]) {
    const neighborDist = 50;
    const sum = this.p.createVector(0, 0);
    let count = 0;

    for (const boid of boids) {
      const d = p5.Vector.dist(this.position, boid.position);

      if (d > 0 && d < neighborDist) {
        sum.add(boid.position);
        count++;
      }
    }

    if (count > 0) {
      sum.div(count);
      return this.seek(sum);
    }

    return this.p.createVector(0, 0);
  }
}
