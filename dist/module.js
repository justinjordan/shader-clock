import {Engine as $doaur$Engine, State as $doaur$State} from "rattler";
import {TextureLoader as $doaur$TextureLoader, PerspectiveCamera as $doaur$PerspectiveCamera, WebGLRenderer as $doaur$WebGLRenderer, Uniform as $doaur$Uniform, Vector2 as $doaur$Vector2, CircleGeometry as $doaur$CircleGeometry, ShaderMaterial as $doaur$ShaderMaterial, Mesh as $doaur$Mesh, BoxGeometry as $doaur$BoxGeometry, MeshBasicMaterial as $doaur$MeshBasicMaterial, Vector3 as $doaur$Vector3, Scene as $doaur$Scene, Clock as $doaur$Clock} from "three";


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}



var $02da6e2faf2df8fe$exports = {};
$02da6e2faf2df8fe$exports = new URL("background.6b7eaf99.png", import.meta.url).toString();


var $7db2b8dc922b901a$exports = {};
$7db2b8dc922b901a$exports = "#define GLSLIFY 1\n// Uniforms (provided by your rendering code)\nuniform float uTime; // Time in seconds\nuniform vec2 uResolution; // Canvas resolution (width, height)\n\nvoid applyBaseColor(vec3 color) {\n  gl_FragColor = vec4(color, 1.0); // Set the fragment color\n}\n\nvoid drawBubbles() {\n  vec3 c;\n  float l;\n  float z = uTime * 0.2;\n  vec2 r = uResolution.xy;\n\n  for (int i = 0; i < 3; i++) {\n    vec2 p = gl_FragCoord.xy / r;\n    vec2 uv = p;\n    p -= 0.5;\n    p.x *= r.x / r.y;\n    z += 0.07;\n    l = length(p);\n    uv += p / l * (sin(z) + 1.0) * abs(sin(l * 9.0 - z - z));\n    c[i] = 0.01 / length(mod(uv, 1.0) - 0.5);\n  }\n\n  gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0) * vec4(c / l, uTime) + gl_FragColor;\n}\n\nvoid clampColor() {\n  gl_FragColor = clamp(gl_FragColor, vec4(0.0), vec4(1.0)); // Clamp color values to [0, 1]\n}\n\nvoid main() {\n  applyBaseColor(vec3(0.0, 0.6, 1.0)); // Set the base color\n  drawBubbles();\n  clampColor();\n}\n";


class $d9ef00f545d9d1ce$export$2e2bcd8739ae039 extends (0, $doaur$State) {
    onInit() {
        this.scene.background = new $doaur$TextureLoader().load((0, (/*@__PURE__*/$parcel$interopDefault($02da6e2faf2df8fe$exports))));
        this.camera = new $doaur$PerspectiveCamera(75, this.canvas.width / this.canvas.height, 0.1, 1000);
        this.renderer = new $doaur$WebGLRenderer({
            canvas: this.engine.canvas,
            antialias: true
        });
        this.uniforms = {
            uTime: new $doaur$Uniform({
                type: "f",
                value: 0
            }),
            uResolution: new $doaur$Uniform({
                value: new $doaur$Vector2(this.renderer.domElement.width, this.renderer.domElement.height)
            })
        };
        // Draw clock border
        const geometry = new $doaur$CircleGeometry(3, 64);
        const material = new $doaur$ShaderMaterial({
            fragmentShader: (0, (/*@__PURE__*/$parcel$interopDefault($7db2b8dc922b901a$exports))),
            uniforms: this.uniforms
        });
        const circle = new $doaur$Mesh(geometry, material);
        circle.position.set(0, 0, 0);
        this.scene.add(circle);
        this.clockFace = circle;
        // Draw clock hands
        const hourGeometry = new $doaur$BoxGeometry(0.1, 1.5, 0.1);
        hourGeometry.translate(0, 0.75, 0);
        const hourMaterial = new $doaur$MeshBasicMaterial({
            color: 0x000000
        });
        const hourHand = new $doaur$Mesh(hourGeometry, hourMaterial);
        hourHand.position.set(0, 0, 0);
        hourHand.rotation.z = 0;
        this.scene.add(hourHand);
        this.hourHand = hourHand;
        const minuteGeometry = new $doaur$BoxGeometry(0.05, 2, 0.05);
        minuteGeometry.translate(0, 1, 0);
        const minuteMaterial = new $doaur$MeshBasicMaterial({
            color: 0x000000
        });
        const minuteHand = new $doaur$Mesh(minuteGeometry, minuteMaterial);
        minuteHand.position.set(0, 0, 0);
        minuteHand.rotation.z = 0;
        this.scene.add(minuteHand);
        this.minuteHand = minuteHand;
        const secondGeometry = new $doaur$BoxGeometry(0.02, 2.5, 0.02);
        secondGeometry.translate(0, 1.25, 0);
        const secondMaterial = new $doaur$MeshBasicMaterial({
            color: 0x000000
        });
        const secondHand = new $doaur$Mesh(secondGeometry, secondMaterial);
        secondHand.position.set(0, 0, 0);
        secondHand.rotation.z = 0;
        this.scene.add(secondHand);
        this.secondHand = secondHand;
        // Make background blue
        this.renderer.setClearColor(0x002233); // Set the clear color to black
        this.renderer.setSize(this.canvas.width, this.canvas.height); // Set the size of the renderer
        this.renderer.setPixelRatio(window.devicePixelRatio); // Set pixel ratio for better quality on high DPI screens
        this.camera.position.z = 5; // Set camera position
        this.camera.position.y = 0; // Set camera y position
        this.camera.position.x = 0; // Set camera x position
        this.camera.lookAt(new $doaur$Vector3(0, 0, 0)); // Make the camera look at the origin (0, 0, 0)
    }
    onUpdate(deltaTime) {
        const date = new Date();
        this.uniforms.uTime.value = this.clock.getElapsedTime();
        this.uniforms.uResolution.value = new $doaur$Vector2(this.renderer.domElement.width, this.renderer.domElement.height);
        this.hourHand.rotation.z = -(date.getHours() % 12 + date.getMinutes() / 60) * (Math.PI / 6);
        this.minuteHand.rotation.z = -((date.getMinutes() + date.getSeconds() / 60) * (Math.PI / 30));
        this.secondHand.rotation.z = -(date.getSeconds() + date.getMilliseconds() / 1000) * (Math.PI / 30);
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 5;
        this.camera.lookAt(new $doaur$Vector3(0, 0, 0));
    }
    onRender(canvas) {
        this.renderer.setSize(this.canvas.width, this.canvas.height);
        this.renderer.setPixelRatio(window.devicePixelRatio); // Set pixel ratio for better quality on high DPI screens
        this.renderer.render(this.scene, this.camera);
        // Copy the rendered image from the WebGL renderer to the main canvas
        canvas.getContext("2d")?.drawImage(this.canvas, 0, 0);
    }
    constructor(...args){
        super(...args), this.scene = new $doaur$Scene(), this.clock = new $doaur$Clock();
    }
}


class $b013a5dd6d18443e$export$2e2bcd8739ae039 extends (0, $doaur$Engine) {
    init() {
        this.loadState((0, $d9ef00f545d9d1ce$export$2e2bcd8739ae039));
    }
}


export {$b013a5dd6d18443e$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=module.js.map
