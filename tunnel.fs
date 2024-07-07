in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
//uniform sampler2D texture2;
uniform float tim3;// = 21.0;
#define flip 1.0
#define distort .75
void main()
{


vec2 p = texCoord.xy;

  
	vec2 q = p - vec2(0.5, 0.5);

	
	float len = 1.5*length(q);

	float a = atan(q.y, q.x) - .2*sin(sin(tim3)) ;

	float r1 = -1.014 / len - tim3 * 4.5;


	float m = (1.0 + sin(tim3 * 0.5)) / 2.0;

	vec2 uv=vec2(a/3.14 -.01/ len, .09*r1+tim3*.04);
	vec3 col = texture( texture0, uv ).xyz;
        fragColor = vec4(col * len * 4.5, 1.0);

}