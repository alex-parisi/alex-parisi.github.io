const defaultShaderType = [
    'VERTEX_SHADER',
    'FRAGMENT_SHADER',
];

/**
 * [Resizes the canvas to the display size.]
 * @return [Success boolean.]
 * @param canvas
 * @param multiplier
 */
function resizeCanvasToDisplaySize(canvas, multiplier) {
    multiplier = multiplier || 1;
    const width = canvas.clientWidth * multiplier | 0;
    const height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
    }
    return false;
}

/**
 * [Shows an error message to the console.]
 * @param msg
 */
function error(msg) {
    if (topWindow.console) {
        if (topWindow.console.error) {
            topWindow.console.error(msg);
        } else if (topWindow.console.log) {
            topWindow.console.log(msg);
        }
    }
}

/**
 * [Creates a WebGL program to run the vertex and fragment shaders.]
 * @return [WebGL program object.]
 * @param gl
 * @param shaders
 */
function createProgram(gl, shaders) {
    const errFn = error;
    const program = gl.createProgram();
    shaders.forEach(function (shader) {
        gl.attachShader(program, shader);
    });
    gl.linkProgram(program);
    // Check the link status
    const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        const lastError = gl.getProgramInfoLog(program);
        errFn('Error in program linking: ' + lastError);
        gl.deleteProgram(program);
        return null;
    }
    return program;
}

/**
 * [Loads a shader and compiles it.]
 * @return [WebGL program object.]
 * @param gl
 * @param shaderSource
 * @param shaderType
 */
function loadShader(gl, shaderSource, shaderType) {
    const errFn = error;
    // Create the shader object
    const shader = gl.createShader(shaderType);
    // Load the shader source
    gl.shaderSource(shader, shaderSource);
    // Compile the shader
    gl.compileShader(shader);
    // Check the compile status
    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        const lastError = gl.getShaderInfoLog(shader);
        errFn('Error compiling shader \'' + shader + '\':' + lastError + `\n` + shaderSource.split('\n').map((l, i) => `${i + 1}: ${l}`).join('\n'));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

/**
 * [Loads a set of shaders, compiles them, and creates a WebGL program.]
 * @return [WebGL program object.]
 * @param gl
 * @param shaderSources
 */
function createProgramFromSources(gl, shaderSources) {
    const shaders = [];
    for (let ii = 0; ii < shaderSources.length; ++ii) {
        shaders.push(loadShader(gl, shaderSources[ii], gl[defaultShaderType[ii]]));
    }
    return createProgram(gl, shaders);
}

export { createProgramFromSources, resizeCanvasToDisplaySize }