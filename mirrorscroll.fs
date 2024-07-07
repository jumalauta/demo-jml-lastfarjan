
in vec2 texCoord;
out vec4 fragColor;


uniform sampler2D texture0;
uniform float tim3;// = 21.0;
#define speedX -0.1
#define speedY 0.3
#define video 0.0
#define value1 1.0
#define value2 0.5
#define value3 2.0
#define value4 2.0
#define contrast 0.025
#define alpha 1.0
uniform vec4 color;// = vec4(1);
void main()
{
vec4 colors;
	float t = tim3;
    	vec2 xy = texCoord.xy;
		xy.y=xy.y+.5;



    xy.y += step(xy.y, .5) * (0.5-xy.y) * 3.0;
    
    xy.x += .5*t;
    xy.y -= sin(t) * speedY; //step(sin(t),0.2);

	xy.x += value1;
	xy.y += value2;
	   float blursize=20.;
   float range=floor(blursize/2.);

      vec4 color2=texture(texture0,xy);

	
	 
	  fragColor=color*color2;
	  
 
}