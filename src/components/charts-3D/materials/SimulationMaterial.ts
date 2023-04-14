
import simulationVertexShader from './simulationVertexShader';
import simulationFragmentShader from './simulationFragmentShader';
import * as THREE from "three";

const vertexShader = /*glsl*/`
varying vec2 vUv;

void main() {
  vUv = uv;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}

`


const fragmentShader = /*glsl*/`
void main() {
  vec3 color = vec3(0.34, 0.53, 0.96);
  gl_FragColor = vec4(color, 1.0);
}
`

const getRandomDataSphere = (width, height) => {
    // we need to create a vec4 since we're passing the positions to the fragment shader
    // data textures need to have 4 components, R, G, B, and A
    const length = width * height * 4
    const data = new Float32Array(length);

    for (let i = 0; i < length; i++) {
        const stride = i * 4;

        const distance = Math.sqrt((Math.random() - 0.5)) * 2.0;
        const theta = THREE.MathUtils.randFloatSpread(360);
        const phi = THREE.MathUtils.randFloatSpread(360);

        data[stride] = distance * Math.sin(theta) * Math.cos(phi)
        data[stride + 1] = distance * Math.sin(theta) * Math.sin(phi);
        data[stride + 2] = distance * Math.cos(theta);
        data[stride + 3] = 1.0; // this value will not have any impact
    }

    return data;
}

const getRandomDataBox = (width, height) => {
    var len = width * height * 4;
    var data = new Float32Array(len);

    for (let i = 0; i < data.length; i++) {
        const stride = i * 4;

        data[stride] = (Math.random() - 0.5) * 2.0;
        data[stride + 1] = (Math.random() - 0.5) * 2.0;
        data[stride + 2] = (Math.random() - 0.5) * 2.0;
        data[stride + 3] = 1.0;
    }
    return data;
};

class SimulationMaterial extends THREE.ShaderMaterial {
    constructor(size) {
        const positionsTextureA = new THREE.DataTexture(
            getRandomDataSphere(size, size),
            size,
            size,
            THREE.RGBAFormat,
            THREE.FloatType
        );
        positionsTextureA.needsUpdate = true;

        const positionsTextureB = new THREE.DataTexture(
            getRandomDataBox(size, size),
            size,
            size,
            THREE.RGBAFormat,
            THREE.FloatType
        );
        positionsTextureB.needsUpdate = true;

        const simulationUniforms = {
            positionsA: { value: positionsTextureA },
            positionsB: { value: positionsTextureB },
            uFrequency: { value: 0.25 },
            uTime: { value: 0 },
        };

        super({
            uniforms: simulationUniforms,
            vertexShader: simulationVertexShader,
            fragmentShader: simulationFragmentShader,
        });
    }
}

export { SimulationMaterial, vertexShader, fragmentShader };
