in vec2 texCoord;

out vec4 fragColor;
uniform sampler2D texture0;
//uniform sampler2D texture1;
//uniform sampler2D texture2;
//uniform sampler2D texture3;
uniform vec4 color;// = vec4(1.0,1.0,1.0,1.0);

void main(void)
{

    fragColor = color * texture(texture0, texCoord);
} 
