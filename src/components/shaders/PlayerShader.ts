export const vertexShader = `
    varying vec3 vUv; 

    void main() {
      vUv = position; 

      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition; 
    }
`

export const fragmentShader = `
      varying vec3 vUv;

      void main() {
        gl_FragColor = vec4(1.0, 0.5, 1.0, 1.0);
      }
`
