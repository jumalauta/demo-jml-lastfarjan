in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
uniform float time;// = 1.0;
uniform float time2;// = 1.0;

#define ITERATIONS 16
#define SPEED 0.1
#define DISPLACEMENT 0.85
#define TIGHTNESS 22.1
#define YOFFSET 0.5
#define YSCALE 0.05
#define FLAMETONE vec3(50.0, 15.0, 1.0)

float noise( in vec3 x ) // iq noise function
{
	vec3 p = floor(x);
    vec3 f = fract(x);
	f = f*f*(3.0-2.0*f);
	vec2 uv = (p.xy+vec2(37.0,17.0)*p.z) + f.xy;
	vec2 rg = texture( texture0, (uv+ 0.5)/256.0, 0.0 ).yx;
	return mix( rg.x, rg.y, f.z ) * 2.0 - 1.0;
}

void main() 
{

	vec2 uv = texCoord.xy;
	float nx = 0.9;
	float ny = 0.8;
	for (int i=1; i<ITERATIONS+1; i++)
	{
		float ii = pow(float(i), 2.0);
		float ifrac = float(i)/float(ITERATIONS);
		float t =  time*3.0;
		float d = (1.0-ifrac) * DISPLACEMENT;
		nx += noise( vec3(uv.x*ii-time*ifrac, uv.y*YSCALE*ii-t, 0.0)) * d * 2.0;
		ny += noise( vec3(uv.x*ii+time*ifrac, uv.y*YSCALE*ii-t, time*ifrac/ii)) * d;
	}
	
	float flame =  clamp(-uv.y*1.+ny,0.0,1.0);
	//vec3 col = pow(flame, TIGHTNESS) * FLAMETONE;
    vec3 col = pow(flame, clamp(30.-time2,1.,100.)) * FLAMETONE;
    // tonemapping
    col = col / (1.0+col);
    col = pow(col, vec3(1.0/2.2));
    col = clamp(col, 0.0, 1.0);
	float alphaCol=5.*(0.21*col.r+0.71*col.g+0.07*col.b);
	alphaCol = alphaCol*clamp(time2*.1,0.0,1.0);
	fragColor = vec4(col*.75,alphaCol );
	

}