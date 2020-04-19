function ParticleSystem(colors, graphics, spec) {
  let that = {};
  let particles = [];
  const random = FroggerGame.utilities.random

  function create(spec) {
      let that = {};

      spec.fill = colors.fill
      spec.stroke = colors.stroke
      spec.alive = 0;

      that.update = function(elapsedTime) {
          spec.center.x += (spec.speed * spec.direction.x * elapsedTime);
          spec.center.y += (spec.speed * spec.direction.y * elapsedTime);
          spec.alive += elapsedTime;

          spec.rotation += spec.speed * 0.5;

          return spec.alive < spec.lifetime;
      };

      that.render = function() {
          graphics.drawRectangle(spec);
          // graphics.renderTexture(spec.image, spec.center, spec.rotation, spec.size);
      };

      return that;
  }

  that.update = function(elapsedTime) {
      let keepMe = [];
      for (let particle = 0; particle < particles.length; particle++) {
          if (particles[particle].update(elapsedTime)) {
              keepMe.push(particles[particle]);
          }
      }
      particles = keepMe;

      for (let particle = 0; particle < 5; particle++) {
          let size = Math.abs(random.nextGaussian(spec.size.mean, spec.size.stdev));
          let p = create({
              center: { x: spec.center.x, y: spec.center.y },
              size: {x: size, y: size},
              rotation: 0,
              speed: .1,//random.nextGaussian(spec.speed.mean, spec.speed.stdev),
              direction: random.nextCircleVector(),
              lifetime: 1000//random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev)
          });
          particles.push(p);
      }
  };

  that.render = function() {
      for (let p = particles.length - 1; p >= 0; p--) {
          particles[p].render();
      }
  };

  return that;
}
