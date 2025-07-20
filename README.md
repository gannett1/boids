# boids
A 3JS boid animation to be used on my personal site. The animation mimics the behavior of starling murmuration (the birds that make cool patterns in the sky)

What is a Boid?
A boid is a "bird-oid" object, in this case a square shaped particle, that behaves like a bird in a flock. The behavior for the boid comes from the Boids Algorithm developed by Craig Reynolds.

3 Core Behaviors:
Separation: Boids move away from each other when they get to close to avoid collision.
Alignment: Boids steer themselves to move in the average direction of their neighbors.
Cohesion: Boids steer towards the average position of their neighbors

A Quick Note on Alignment Vs. Cohesion:
I know this confused me when I first started looking into it. 
Though similar, alignment and cohesion serve different purposes. Alignment makes it so the boids move in the same direction (if two boids are on opposite sides of the canvas, they would both move in the same direction). Cohesion makes it so the boid in question will move towards its neighbors, always trying to get closer (the two boids will move towards eachother). This is why separation is important, as without it they would all end up in a blob. These three in tandem create the undulating motion that birds exhibit in real life.
