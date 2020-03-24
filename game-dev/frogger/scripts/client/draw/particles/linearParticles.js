function ParticleSystemLinear(colors, graphics, spec) {
  let that = {};
  let particles = [];

  const random = FroggerGame.utilities.random
  function create(spec) {
      let that = {};

      spec.fill = colors.fill;
      spec.stroke = colors.stroke;
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
      };

      return that;
  }

  that.update = function(elapsedTime, direction, ranges) {
      let keepMe = [];
      for (let particle = 0; particle < particles.length; particle++) {
          if (particles[particle].update(elapsedTime)) {
              keepMe.push(particles[particle]);
          }
      }
      particles = keepMe;

      for (let particle = 0; particle < 2; particle++) {
          let size = Math.abs(random.nextGaussian(spec.size.mean, spec.size.stdev));
          let center = {x: random.nextRange(ranges.x.start, ranges.x.end), y: random.nextRange(ranges.y.start, ranges.y.end)}//{ x: random.nextRange(0, spec.width), y: 0 }
          let p = create({
              center: center,
              size: {x: size, y: size},
              rotation: 0,
              speed: 0.05,// + Math.abs(random.nextGaussian(spec.speed.mean, spec.speed.stdev)),
              direction: direction,
              lifetime: 100// random.nextGaussian(100, 1)
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
