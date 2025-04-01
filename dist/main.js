var $ePUDy$rattler = require("rattler");
var $ePUDy$three = require("three");


function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $53ffd25df6034fb9$export$2e2bcd8739ae039);



var $d08e264529df7551$exports = {};
$d08e264529df7551$exports = new URL("background.6b7eaf99.png", "file:" + __filename).toString();


var $24adc588f39b2375$exports = {};
$24adc588f39b2375$exports = "#define GLSLIFY 1\n// Uniforms (provided by your rendering code)\nuniform float uTime; // Time in seconds\nuniform vec2 uResolution; // Canvas resolution (width, height)\n\nvoid applyBaseColor(vec3 color) {\n  gl_FragColor = vec4(color, 1.0); // Set the fragment color\n}\n\nvoid drawBubbles() {\n  vec3 c;\n  float l;\n  float z = uTime * 0.2;\n  vec2 r = uResolution.xy;\n\n  for (int i = 0; i < 3; i++) {\n    vec2 p = gl_FragCoord.xy / r;\n    vec2 uv = p;\n    p -= 0.5;\n    p.x *= r.x / r.y;\n    z += 0.07;\n    l = length(p);\n    uv += p / l * (sin(z) + 1.0) * abs(sin(l * 9.0 - z - z));\n    c[i] = 0.01 / length(mod(uv, 1.0) - 0.5);\n  }\n\n  gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0) * vec4(c / l, uTime) + gl_FragColor;\n}\n\nvoid clampColor() {\n  gl_FragColor = clamp(gl_FragColor, vec4(0.0), vec4(1.0)); // Clamp color values to [0, 1]\n}\n\nvoid main() {\n  applyBaseColor(vec3(0.0, 0.6, 1.0)); // Set the base color\n  drawBubbles();\n  clampColor();\n}\n";


class $f399ab8b26251793$export$2e2bcd8739ae039 extends (0, $ePUDy$rattler.State) {
    onInit() {
        this.scene.background = new $ePUDy$three.TextureLoader().load((0, (/*@__PURE__*/$parcel$interopDefault($d08e264529df7551$exports))));
        this.camera = new $ePUDy$three.PerspectiveCamera(75, this.canvas.width / this.canvas.height, 0.1, 1000);
        this.renderer = new $ePUDy$three.WebGLRenderer({
            canvas: this.engine.canvas,
            antialias: true
        });
        this.uniforms = {
            uTime: new $ePUDy$three.Uniform({
                type: "f",
                value: 0
            }),
            uResolution: new $ePUDy$three.Uniform({
                value: new $ePUDy$three.Vector2(this.renderer.domElement.width, this.renderer.domElement.height)
            })
        };
        // Draw clock border
        const geometry = new $ePUDy$three.CircleGeometry(3, 64);
        const material = new $ePUDy$three.ShaderMaterial({
            fragmentShader: (0, (/*@__PURE__*/$parcel$interopDefault($24adc588f39b2375$exports))),
            uniforms: this.uniforms
        });
        const circle = new $ePUDy$three.Mesh(geometry, material);
        circle.position.set(0, 0, 0);
        this.scene.add(circle);
        this.clockFace = circle;
        // Draw clock hands
        const hourGeometry = new $ePUDy$three.BoxGeometry(0.1, 1.5, 0.1);
        hourGeometry.translate(0, 0.75, 0);
        const hourMaterial = new $ePUDy$three.MeshBasicMaterial({
            color: 0x000000
        });
        const hourHand = new $ePUDy$three.Mesh(hourGeometry, hourMaterial);
        hourHand.position.set(0, 0, 0);
        hourHand.rotation.z = 0;
        this.scene.add(hourHand);
        this.hourHand = hourHand;
        const minuteGeometry = new $ePUDy$three.BoxGeometry(0.05, 2, 0.05);
        minuteGeometry.translate(0, 1, 0);
        const minuteMaterial = new $ePUDy$three.MeshBasicMaterial({
            color: 0x000000
        });
        const minuteHand = new $ePUDy$three.Mesh(minuteGeometry, minuteMaterial);
        minuteHand.position.set(0, 0, 0);
        minuteHand.rotation.z = 0;
        this.scene.add(minuteHand);
        this.minuteHand = minuteHand;
        const secondGeometry = new $ePUDy$three.BoxGeometry(0.02, 2.5, 0.02);
        secondGeometry.translate(0, 1.25, 0);
        const secondMaterial = new $ePUDy$three.MeshBasicMaterial({
            color: 0x000000
        });
        const secondHand = new $ePUDy$three.Mesh(secondGeometry, secondMaterial);
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
        this.camera.lookAt(new $ePUDy$three.Vector3(0, 0, 0)); // Make the camera look at the origin (0, 0, 0)
    }
    onUpdate(deltaTime) {
        const date = new Date();
        this.uniforms.uTime.value = this.clock.getElapsedTime();
        this.uniforms.uResolution.value = new $ePUDy$three.Vector2(this.renderer.domElement.width, this.renderer.domElement.height);
        this.hourHand.rotation.z = -(date.getHours() % 12 + date.getMinutes() / 60) * (Math.PI / 6);
        this.minuteHand.rotation.z = -((date.getMinutes() + date.getSeconds() / 60) * (Math.PI / 30));
        this.secondHand.rotation.z = -(date.getSeconds() + date.getMilliseconds() / 1000) * (Math.PI / 30);
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 5;
        this.camera.lookAt(new $ePUDy$three.Vector3(0, 0, 0));
    }
    onRender(canvas) {
        this.renderer.setSize(this.canvas.width, this.canvas.height);
        this.renderer.setPixelRatio(window.devicePixelRatio); // Set pixel ratio for better quality on high DPI screens
        this.renderer.render(this.scene, this.camera);
        // Copy the rendered image from the WebGL renderer to the main canvas
        canvas.getContext("2d")?.drawImage(this.canvas, 0, 0);
    }
    constructor(...args){
        super(...args), this.scene = new $ePUDy$three.Scene(), this.clock = new $ePUDy$three.Clock();
    }
}


class $53ffd25df6034fb9$export$2e2bcd8739ae039 extends (0, $ePUDy$rattler.Engine) {
    init() {
        this.loadState((0, $f399ab8b26251793$export$2e2bcd8739ae039));
    }
}


//# sourceMappingURL=main.js.map
