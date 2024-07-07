in vec2 texCoord;

out vec4 fragColor;


uniform sampler2D texture0;
uniform float tim3;// = 21.0;
#define speedX 0.1
#define speedY 0.3
#define video 0.0
#define value1 1.0
#define value2 0.5
#define value3 2.0
#define value4 2.0
#define contrast 0.025
void main()
{
vec4 colors;
	float t = tim3;
    	vec2 xy = texCoord.xy;
		
xy.x=xy.x*5.;
    xy.x += t;

   

      vec4 color2=texture(texture0,xy);
color2.rgb=color2.rgb*0.0;
	 
	  fragColor=color2;
	  
 
}