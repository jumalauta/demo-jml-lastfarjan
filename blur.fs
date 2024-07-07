#define float2 vec2
#define float3 vec3
#define float4 vec4
in float2 texCoord;
out float4 fragColor;
uniform sampler2D texture0;

void main()
{
   vec2 xy=texCoord;
   float blursize=20.;
   float range=floor(blursize/2.);
    vec4 color=vec4(0.);
    
    for(float a=-range;a<=range;++a)
    for(float b=-range;b<=range;++b)
      color+=texture(texture0,xy+vec2(a*.0025,b*.0025));
      //color=0.0001*color*pow(blursize,2.);
      color=color/pow(blursize,1.4);
      vec4 color2=texture(texture0,xy);

	  fragColor=(color2*.9+color*.15);  

}

