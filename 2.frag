precision mediump float;

uniform vec2 u_resolution;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float fbm(vec2 st) {
  float value = 0.0;
  float amplitude = 0.4;
  float frequency = 1.0;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(st * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}

float cloudShape(vec2 st, float edge) {
  float shape = 1.0 - smoothstep(edge, edge + 0.01, fbm(st));
  shape = smoothstep(0.1, 0.15, shape);
  return shape;
}

vec3 cloud(vec2 st) {
  float edge = 0.5;
  float n = cloudShape(st, edge);
  n = pow(n, 3.0);
  return mix(vec3(1.0), vec3(0.5, 0.7, 0.9), n);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec3 cloudColor = cloud(st);
  vec3 bgColor = vec3(0.6, 0.8, 1.0);
  float cloudAmount = cloudShape(st, 0.5);
  vec3 c = mix(bgColor, cloudColor, cloudAmount);
  gl_FragColor = vec4(c, 1.0);
}
