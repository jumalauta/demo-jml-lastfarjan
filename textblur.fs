in vec4 instanceFragmentColor;
out vec4 fragColor;

uniform vec4 color; // this will be automatically binded to color animation variable, defaults to 1,1,1,1

void main() {
    fragColor = instanceFragmentColor * color;
    vec2 fragCoord = gl_FragCoord.xy;
    fragColor.a = ((sin(fragCoord.s*0.04)+1.0)/2.0+(cos(fragCoord.t*0.03)+1.0)/2.0)/4.0 + 0.5;
    fragColor.rgb *= fragColor.a;
}