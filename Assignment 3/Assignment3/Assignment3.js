
var gl;
var points;
var R = 0;
var G = 0;
var B = 0;
var color = vec3(R, G, B);
var colorLoc;


var rotationAngle = 0.0;
var translationX = 0.0;
var translationY = 0.0;
var matrixLoc;
var scaleX = 1;
var scaleY = 1;
var combinedMatrix;

//Mert Altekin 21050111065
window.onload = function init()
{

    var canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //Initialize all the sliders
    var rotationSlider = document.getElementById("rotationSlider");
    rotationSlider.addEventListener("input", updateRotation);
    
    var translationXslider = document.getElementById("translationX");
    translationXslider.addEventListener("input", translateX);

    var translationYslider = document.getElementById("translationY");
    translationYslider.addEventListener("input", translateY);

    var scaleXslider = document.getElementById("scaleX");
    scaleXslider.addEventListener("input", scalingX);

    var scaleYslider = document.getElementById("scaleY");
    scaleYslider.addEventListener("input", scalingY);

    var Rslider = document.getElementById("colorR");
    Rslider.addEventListener("input", colorR);

    var Gslider = document.getElementById("colorG");
    Gslider.addEventListener("input", colorG);

    var Bslider = document.getElementById("colorB");
    Bslider.addEventListener("input", colorB);


    //Drawing Shapes
    var vertices = new Float32Array([
        // Below is for A
        0,   0,
        0.02, 0,
        0.04 , 0.08 ,
        0.06 , 0.08 ,
        //
        0.08 ,0 ,
        0.1 ,0 ,
        0.04 , 0.08 ,
        0.06 ,0.08 ,
        //
        0.03 , 0.02 ,
        0.07 , 0.02 ,
        0.04 , 0.04 ,
        0.06 , 0.04 ,

        //Below is for B

        -0.02 ,  0 ,
        -0.04 ,  0 ,
        -0.02 ,  0.08 ,
        -0.04 ,  0.08 ,
        //
        -0.07 ,  0.03 ,
        -0.09 ,  0.03 ,
        -0.02  ,0.08 ,
        -0.04 ,0.08 ,
        //
        -0.07 ,  0.03 ,
        -0.09 ,  0.03 ,
        -0.12 ,  0.08 ,
        -0.14 ,  0.08 ,
        //
        -0.12 ,  0 ,
        -0.14 ,  0 ,
        -0.12 ,  0.08 ,
        -0.14 ,  0.08 ,

    ]);
    for (var i = 0; i < vertices.length; i++) {
        vertices[i] *= 5;
    }
    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );
    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    //Set uniforms
    colorLoc = gl.getUniformLocation(program, "yourColorUniform");
    matrixLoc = gl.getUniformLocation(program, "yourMatrixUniform");

    //set a default matrixes instead of null matrix otherwise we couldn't render shapes
    rotationMatrix = rotateZ(rotationAngle);
    translationMatrix = translate(translationX, translationY, 0.0);
    scaleMatrix = scalem(scaleX,scaleY,1);
    combinedMatrix= mult(mult(translationMatrix, rotationMatrix),scaleMatrix);
    render();
};
    function updateRotation(event) {
        rotationAngle = parseFloat(event.target.value);
        rotationMatrix = rotateZ(rotationAngle);
        combinedMatrix = mult(mult(translationMatrix,rotationMatrix),scaleMatrix);
        render();
    }
    function translateX(event) {
        translationX = parseFloat(event.target.value);
        translationMatrix = translate(translationX, translationY , 0.0);
        combinedMatrix = mult(mult(translationMatrix,rotationMatrix),scaleMatrix);
        render();
    }
    function translateY(event) {
        translationY = parseFloat(event.target.value);
        translationMatrix = translate(translationX,translationY ,0.0);
        combinedMatrix = mult(mult(translationMatrix,rotationMatrix),scaleMatrix);
        render();
    }
    function scalingX(event) {
        scaleX = parseFloat(event.target.value);
        scaleMatrix=scalem(scaleX,scaleY,1);
        combinedMatrix = mult(mult(translationMatrix,rotationMatrix),scaleMatrix);
        render();
    }
    function scalingY(event) {
        scaleY = parseFloat(event.target.value);
        scaleMatrix=scalem(scaleX,scaleY,1);
        combinedMatrix = mult(mult(translationMatrix,rotationMatrix),scaleMatrix);
        render();
    }
    function colorR(event) {
        R = parseFloat(event.target.value);
        color = vec3(R, G, B);
        render();
    }
    function colorG(event) {
        G = parseFloat(event.target.value);
        color = vec3(R, G, B);
        render();
    }
    function colorB(event) {
        B = parseFloat(event.target.value);
        color = vec3(R, G, B);
        render();
    }
function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.uniformMatrix4fv(matrixLoc, false, flatten(combinedMatrix));
    gl.uniform3fv(colorLoc, flatten(color));
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    gl.drawArrays(gl.TRIANGLE_STRIP, 4, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 8, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 12, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 16, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 20, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 24, 4);
}