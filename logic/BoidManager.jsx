import { Vector3 } from 'three';
import Boid from './Boid';

export default class BoidManager {
  constructor(numBoids = 1, bounds = { x: 5, y: 5, z: 5 }) {
    this.boids = [];
    this.bounds = bounds;

    for (let i = 0; i < numBoids; i++) {
      const position = new Vector3(
        Math.random() * 2 * bounds.x - bounds.x,
        Math.random() * 2 * bounds.y - bounds.y,
        Math.random() * 2 * bounds.z - bounds.z
      );

      const velocity = new Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      );

      const boid = new Boid(position, velocity, bounds);
      this.boids.push(boid);
    }
  }

  update(delta) {
    for (let i = 0; i < this.boids.length; i++) {
      const boid = this.boids[i];
      const neighbors = this.boids.filter((_, j) => i !== j);
      boid.update(delta, neighbors);
    }
  }

  getPositionsArray() {
    const positions = [];
    this.boids.forEach(boid => {
      positions.push(boid.position.x, boid.position.y, boid.position.z);
    });
    return new Float32Array(positions);
  }
}

