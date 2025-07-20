import * as THREE from 'three';

const minSpeed = 1;
const maxSpeed = 4;

const limitVector = (vector, max) => {
  if (vector.lengthSq() > max * max) {
    vector.setLength(max);
  }
};

const steerTowards = (target, currentVelocity, maxForce = 0.1) => {
  const desired = target.clone().normalize().multiplyScalar(maxSpeed);
  const steer = desired.sub(currentVelocity);
  limitVector(steer, maxForce);
  return steer;
};

export default class Boid {
  constructor(position, velocity, bounds = { x: 5, y: 5, z: 3 }) {
    this.position = position.clone();
    this.velocity = velocity.clone();
    this.bounds = bounds;
  }

  update(delta, neighbors = []) {
    const acceleration = new THREE.Vector3();

    const sep = this.separation(neighbors).multiplyScalar(2);
    const ali = this.alignment(neighbors).multiplyScalar(3);
    const coh = this.cohesion(neighbors).multiplyScalar(3.5);
    const wander = this.wander().multiplyScalar(2);

    acceleration.add(sep).add(ali).add(coh).add(wander);
    this.velocity.add(acceleration.multiplyScalar(delta));
    limitVector(this.velocity, maxSpeed);

    this.position.addScaledVector(this.velocity, delta);
    this.avoidEdges();
    this.limitSpeed(minSpeed, maxSpeed);
  }

  avoidEdges() {
  const margin = 1.0; // Distance from edge to start avoiding
  const turnFactor = 1.0; // How strongly to turn away

  ['x', 'y', 'z'].forEach(axis => {
    const limit = this.bounds[axis];
    const pos = this.position[axis];

    if (pos > limit - margin) {
      this.velocity[axis] -= turnFactor * (pos - (limit - margin));
    } else if (pos < -limit + margin) {
      this.velocity[axis] += turnFactor * ((-limit + margin) - pos);
    }
  });
}

  limitSpeed(min = 1, max = 5) {
    const speed = this.velocity.length();
    if (speed < min) {
      this.velocity.setLength(min);
    } else if (speed > max) {
      this.velocity.setLength(max);
    }
  }
  separation(neighbors) {
    const desiredSeparation = 1;
    const steer = new THREE.Vector3();
    let count = 0;

    neighbors.forEach(other => {
      const d = this.position.distanceTo(other.position);
      if (d > 0 && d < desiredSeparation) {
        const diff = this.position.clone().sub(other.position).normalize().divideScalar(d);
        steer.add(diff);
        count++;
      }
    });

    if (count > 0) {
      steer.divideScalar(count);
      return steerTowards(steer, this.velocity);
    }

    return new THREE.Vector3();
  }

  alignment(neighbors) {
    const neighborDist = 1.5;
    const sum = new THREE.Vector3();
    let count = 0;

    neighbors.forEach(other => {
      const d = this.position.distanceTo(other.position);
      if (d > 0 && d < neighborDist) {
        sum.add(other.velocity);
        count++;
      }
    });

    if (count > 0) {
      sum.divideScalar(count);
      return steerTowards(sum, this.velocity);
    }

    return new THREE.Vector3();
  }

  cohesion(neighbors) {
    const neighborDist = 3;
    const center = new THREE.Vector3();
    let count = 0;

    neighbors.forEach(other => {
      const d = this.position.distanceTo(other.position);
      if (d > 0 && d < neighborDist) {
        center.add(other.position);
        count++;
      }
    });

    if (count > 0) {
      center.divideScalar(count);
      const desired = center.sub(this.position);
      return steerTowards(desired, this.velocity);
    }

    return new THREE.Vector3();
  }

  wander() {
    const wanderStrength = 0.2;
    return new THREE.Vector3(
      (Math.random() - 0.5) * wanderStrength,
      (Math.random() - 0.5) * wanderStrength,
      (Math.random() - 0.5) * wanderStrength
    );
  }
}
