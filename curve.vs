out vec2 texCoord;


//uniform mat4 mvp;
//uniform mat4 view;
//uniform mat4 model;
//uniform mat4 projection;
//uniform float time = 1.0f;
//uniform float targettime = 10.0;
//uniform vec2 seedx = vec2(0.5,0.4);
//uniform vec2 seedy = vec2(0.25,0.4535);
//uniform vec2 seedz = vec2(0.12,0.72);
//uniform float Sync3 = 0.1;
//float rand(vec2 co){
//    return 0.5-fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
//}

void main(void)
{
//int vertexNumber=gl_VertexID;

	vec4 posWorld=projectionMatrix * modelViewMatrix * vec4(position, 1.0);

	if(posWorld.x>3.)
	{

	posWorld.z=11.0;
	
	gl_Position=posWorld;
	}
	else
	{
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}
    texCoord = uv;
} 
