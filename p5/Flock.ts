import { Boid } from "./Boid";

export class Flock {
  boids: Boid[];

  constructor() {
    this.boids = [];
  }

  run() {
    for (const boid of this.boids) {
      boid.run(this.boids);
    }
  }

  addBoid(b: Boid) {
    this.boids.push(b);
  }
}
