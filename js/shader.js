const fs = `
precision highp float;

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform float timeScaling;

// Define the base-color, a lovely shade of blue
vec4 color = vec4((100.0 / 255.0), (153.0 / 255.0), (233.0 / 255.0), 1.0);

// Function to generate random numbers, based on:
// http://web.archive.org/web/20080211204527/http://lumina.sourceforge.net/Tutorials/Noise.html
float rand(vec2 uv) { 
  return fract(sin(dot(uv.xy ,vec2(12.9898, 78.233))) * 43758.5453);
}

// Fractal Brownian Motion implementation, similar to:
// https://godotshaders.com/snippet/fractal-brownian-motion-fbm/
// Function to generate noise using rand()
float noise(vec2 uv){
  vec2 uv_index = floor(uv);
  vec2 uv_fract = fract(uv);

  // Grab the corners of the "tile" to be displayed
  float a = rand(uv_index);
  float b = rand(uv_index + vec2(1.0, 0.0));
  float c = rand(uv_index + vec2(0.0, 1.0));
  float d = rand(uv_index + vec2(1.0, 1.0));

  vec2 blur = smoothstep(0.0, 1.0, uv_fract);

  return mix(a, b, blur.x) + (c - a) * blur.y * (1.0 - blur.x) + (d - b) * blur.x * blur.y;
}

// Brownian Motion
float fbm( vec2 p )
{
  float amplitude = 0.5;
  float frequency = 2.0;
  float value = 0.0;

  for(int i = 0; i < 6; i++) {
    value += amplitude * noise(frequency * p + iTime);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}

// The "fractal" part
float pattern( in vec2 p )
{
  return fbm( p + fbm( p + fbm( p ) ) ) * 1.5;
}

// Generate Fractal Brownian Motion:
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
  vec2 uv = fragCoord/iResolution.x;
  float shade = pattern(uv);
  fragColor = vec4(color.rgb, clamp(shade, 0.25, 1.0));
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

const vs = `
attribute vec4 a_position;

void main() {
  gl_Position = a_position;
}
`;

export {fs, vs};