export const vertexShader = `
    uniform float u_time;
    varying vec2 vUv;
    varying float vNoise; 

    float rand(vec2 co){
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
        float displacement;
        float time = u_time * 1.0;
        float b;
        vNoise = 0.5;
        vUv = uv;
        
        
        // add time to the noise parameters so it's animated
        b = 5.0;
        displacement = - 10. * vNoise + b;
        
        vec3 newPosition = position + normal * displacement;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
        
      //vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      //gl_Position = projectionMatrix * modelViewPosition; 
    }
`

export const fragmentShader = `
      varying vec3 vUv;

      void main() {
        gl_FragColor = vec4(0.0, 1.0, 0, 1.0);
      }
`
