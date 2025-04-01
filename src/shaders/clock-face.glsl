// Uniforms (provided by your rendering code)
uniform float uTime; // Time in seconds
uniform vec2 uResolution; // Canvas resolution (width, height)

void applyBaseColor(vec3 color) {
  gl_FragColor = vec4(color, 1.0); // Set the fragment color
}

void drawBubbles() {
  vec3 c;
  float l;
  float z = uTime * 0.2;
  vec2 r = uResolution.xy;

  for (int i = 0; i < 3; i++) {
    vec2 p = gl_FragCoord.xy / r;
    vec2 uv = p;
    p -= 0.5;
    p.x *= r.x / r.y;
    z += 0.07;
    l = length(p);
    uv += p / l * (sin(z) + 1.0) * abs(sin(l * 9.0 - z - z));
    c[i] = 0.01 / length(mod(uv, 1.0) - 0.5);
  }

  gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0) * vec4(c / l, uTime) + gl_FragColor;
}

void clampColor() {
  gl_FragColor = clamp(gl_FragColor, vec4(0.0), vec4(1.0)); // Clamp color values to [0, 1]
}

void main() {
  applyBaseColor(vec3(0.0, 0.6, 1.0)); // Set the base color
  drawBubbles();
  clampColor();
}
