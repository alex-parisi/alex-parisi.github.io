const fs = `
precision highp float;

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform float timeScaling;

vec4 colormap(float x) {
  return vec4((100.0 / 255.0), (153.0 / 255.0), (233.0 / 255.0), 1.0);
}

float rand(vec2 n) { 
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u*u*(3.0-2.0*u);

  float res = mix(
      mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
      mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
  return res*res;
}

const mat2 mtx = mat2( 0.80,  0.60, -0.60,  0.80 );

float fbm( vec2 p )
{
  float f = 0.0;

  f += 0.500000*noise( p + iTime  ); p = mtx*p*2.02;
  f += 0.031250*noise( p ); p = mtx*p*2.01;
  f += 0.250000*noise( p ); p = mtx*p*2.03;
  f += 0.125000*noise( p ); p = mtx*p*2.01;
  f += 0.062500*noise( p ); p = mtx*p*2.04;
  f += 0.015625*noise( p + sin(iTime) );

  return f/.96875;
}

float pattern( in vec2 p )
{
  return fbm( p * 0.5 + fbm( p + fbm( p ) ) ) * 2.5;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
  vec2 uv = fragCoord/iResolution.x;
  float shade = pattern(uv);
  fragColor = vec4(colormap(shade).rgb, clamp(shade, 0.75, 1.0));
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