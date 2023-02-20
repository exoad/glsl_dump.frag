precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

const float PI = 3.14159265358979323846;

float hash(float n) {
  return fract(sin(n) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i.x + i.y * 57.0);
  float b = hash(i.x + (i.y + 1.0) * 57.0);
  float c = hash((i.x + 1.0) + i.y * 57.0);
  float d = hash((i.x + 1.0) + (i.y + 1.0) * 57.0);
  return mix(mix(a, b, f.y), mix(c, d, f.y), f.x);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  st -= 0.5;

  float time = u_time * 0.5;

  float density = 0.0;

  for (int i = 0; i < 10; i++) {
    float radius1 = hash(float(i) + time) * 0.3 + 0.1;
    float radius2 = hash(float(i + 10) + time) * 0.1 + 0.05;

    float angle1 = st.y * 2.0 * PI + hash(float(i + 20) + time) * 10.0;
    float angle2 = st.x * 2.0 * PI + hash(float(i + 30) + time) * 10.0;

    float x = (radius1 + radius2 * cos(angle1)) * cos(angle2);
    float y = (radius1 + radius2 * cos(angle1)) * sin(angle2);
    float z = radius2 * sin(angle1);

    density += noise(vec2(x, y)) * 0.5;
  }

  gl_FragColor = vec4(density, density, density, 1.0);
}
