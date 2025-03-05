import {fs, vs} from './shader.js'
import {createProgramFromSources, resizeCanvasToDisplaySize} from './utils.js'

function main() {

    // Get A WebGL context
    /** @type {HTMLCanvasElement} */
    const canvas = document.querySelector("#glcanvas");
    const gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }
    canvas.style.backgroundColor = "white";

    // Setup GLSL program
    const program = createProgramFromSources(gl, [vs, fs]);
    // Get vertex position data
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    // Get uniform locations
    const resolutionLocation = gl.getUniformLocation(program, "iResolution");
    const mouseLocation = gl.getUniformLocation(program, "iMouse");
    const timeLocation = gl.getUniformLocation(program, "iTime");
    const timeScalingLocation = gl.getUniformLocation(program, "timeScaling");
    // Create a buffer to put three 2d clip space points in
    const positionBuffer = gl.createBuffer();
    // Bind it to ARRAY_BUFFER
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // Fill it with 2 triangles
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([// T1
        -1, -1, // v1
        1, -1, // v2
        -1, 1, // v3
        // T2
        -1, 1, // v1
        1, -1, // v2
        1, 1, // v3
    ]), gl.STATIC_DRAW);

    // Create function to request next frame for animation
    let requestId;

    function requestFrame() {
        if (!requestId) {
            requestId = requestAnimationFrame(render);
        }
    }

    // Set this function to be called on load and when the window is resized
    window.onresize = function () {
        requestFrame();
    }

    // Setup a render loop:
    let then = 0;
    let time = Math.random() * 1000;
    let timeScalingVar = 0.25;

    function render(now) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.clearColor(0, 0, 0, 1.0);
        requestId = undefined;
        // Calculate elapsed time since last render
        now *= 0.001; // Convert to seconds
        const elapsedTime = Math.min(now - then, 0.1);
        time += elapsedTime * timeScalingVar;
        then = now;
        // Ensure the canvas is the correct size
        resizeCanvasToDisplaySize(gl.canvas);
        // Establish a viewport
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        // Use the WebGL program
        gl.useProgram(program);
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        gl.vertexAttribPointer(positionAttributeLocation, 2,          // 2 components per iteration
            gl.FLOAT,   // the data is 32bit floats
            false,      // don't normalize the data
            0,          // 0 = move forward size * sizeof(type) each iteration to get the next position
            0,          // start at the beginning of the buffer
        );
        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
        // Bind the mouse location and elapsed time
        // gl.uniform2f(mouseLocation, mouseX, mouseY);
        gl.uniform1f(timeLocation, time);
        gl.uniform1f(timeScalingLocation, timeScalingVar);
        // Draw the scene:
        gl.drawArrays(gl.TRIANGLES, 0,     // offset
            6,     // num vertices to process
        );
        // Continue loop:
        requestFrame();
    }

    // Start render loop:
    requestFrame();
}

main();