//------------------------------------------------------------------
//
// Defines a SpaceShip component.  A Spaceship contains a sprite.
// The spec is defined as:
//  {
//      image: ,                        // image to use for rendering
//      size: { width: , height: },     // In world coordinates
//      center: { x: , y: }             // In world coordinates
//      direction:                      // In Radians
//  }
//
//------------------------------------------------------------------
Demo.components.SpaceShip = function(spec) {
    'use strict';
    let that = {};

    //
    // Get our sprite model
    let sprite = Demo.components.Sprite({
        image: spec.image,
        spriteSize: spec.size,          // Maintain the size on the sprite
        spriteCenter: spec.center       // Maintain the center on the sprite
    });

    Object.defineProperty(that, 'direction', {
        get: () => spec.direction,
        set: (value) => { spec.direction = value }
    });

    Object.defineProperty(that, 'center', {
        get: () => sprite.center
    });

    Object.defineProperty(that, 'size', {
        get: () => spec.size
    });

    Object.defineProperty(that, 'sprite', {
        get: () => sprite
    });

    return that;
};
