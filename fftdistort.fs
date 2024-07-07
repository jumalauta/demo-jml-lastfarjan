#define float2 vec2
#define float3 vec3
#define float4 vec4

in float2 texCoord;
out float4 fragColor;
uniform sampler2D texture0;
uniform sampler2D texture1;
uniform float4 color; // = float4(0,0,0,1);
uniform float time; // = 1.0;
uniform float timePercent; // = 1.0;


vec2 pixelate(vec2 coord)
{
    vec2 d = vec2(1.0,1.0)/(vec2(1920.0,1080.0*0.1));
    coord.s = floor(coord.s/d.s)*d.s;
    coord.t = floor(coord.t/d.t)*d.t;
    return coord;    
}

	  
void main()
{


	
vec4 outColor = vec4(0.);

	float2 fftuv=texCoord;
	float x = texCoord.x*1.0;
	float y = texCoord.y*1.0;




	vec2 fftCoord = vec2(timePercent, y);
	//fftCoord.y = (fftCoord.y*0.1 + fftCoord.x*0.9)/2.;
	  fftCoord = pixelate(fftCoord);
	vec4 fftColor = texture(texture1,fftCoord.yx);

	//fragColor = fftColor; return;

	//vec4 dv = texture(texture1, fftCoord);

	float distAmount=sin(.5*fftColor.r);
	
	float2 uv=texCoord;

	uv.x=uv.x*(1.0-distAmount);
	vec4 distColor = texture(texture0, uv);
	
	float2 uv2=texCoord;
	uv2.x=uv2.x*(1.0+distAmount);
	vec4 distColor2 = texture(texture0, uv2);

	vec4 color = texture(texture0, texCoord);
	
    fragColor = color*.66+.25*distColor+.25*distColor2;

}
