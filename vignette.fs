#define float2 vec2
#define float3 vec3
#define float4 vec4

in float2 texCoord;
out float4 fragColor;
uniform sampler2D texture0;
uniform float4 color;// = float4(0,0,0,1);

void main()
{
    float2 coord = texCoord;
    float2 screenCoords = coord;
    float fade = 0.2;

    float fadeStart = 0.2;
    float fadeEnd = 0.9;
    fade = smoothstep(fadeStart, fadeEnd, distance(screenCoords,float2(0.5, 0.5)));
    //fade *= max((sin(screenCoords.y * 1000.0)+1.0)/2.0, 0.8);

    float4 color1 = color;
    color1 *= float4(0.,0.,0.,fade);


    //color1.a = 1.0;
    fragColor = color1;
}
