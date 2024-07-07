/*
Fixlists:
0:40 tekstit, curvejen värit
0:58 curvet ylös ja gridi piiloon
1:00 - kiväärit ilmestymään myöhemmin

*/
//var gl = new WebGL2RenderingContext(); //enable WebGL 2 partial support

var images = {};
var warPos=[200,-50,-40,-110,-100,-50,200];
var tick= 0.075;
var beat = 6*tick;
var pattern = 8*beat;
var postCreditsTime=47.5*pattern;

Demo.prototype.init = function()
{
  const settings = new Settings();
  settings.demo.compatibility.old2dCoordinates = true; // when true 2d coordinates x: 0 - 1920, y: 0 - 1080; when false 2d coordinates are -0.5 - 0.5 range
  settings.demo.compatibility.oldColors = true; // when true colors are in 0-255 range, when false colors are in 0-1 range
  settings.demo.compatibility.oldMaterials = true;
	settings.demo.compatibility.oldRotation = true;
	//settings.demo.image.texture.minFilter = 'LinearMipmapLinearFilter';
  settings.demo.image.texture.minFilter = 'LinearFilter';
	settings.demo.image.texture.magFilter = 'NearestFilter';
  settings.demo.image.texture.wrapS = 'RepeatWrapping';
  settings.demo.image.texture.wrapT = 'RepeatWrapping';
	settings.demo.fbo.color.texture.minFilter = 'LinearFilter';
	settings.demo.fbo.color.texture.magFilter = 'NearestFilter';
  settings.demo.fbo.color.texture.wrapS = 'RepeatWrapping';
  settings.demo.fbo.color.texture.wrapT = 'RepeatWrapping';
	settings.demo.screen.width = 1280;
	settings.demo.screen.height = 720;

	settings.demo.camera = {
    type: 'Perspective',
    fov: 90,
    // aspectRatio calculated below
    near: 0.1,
    far: 1000,
    position: { x: 0.0, y: 0.0, z: 2 },
    lookAt: { x: 0.0, y: 0.0, z: 0.0 },
    up: { x: 0.0, y: 1.0, z: 0.0 }
  };
  settings.demo.lights = [
    {
      type: 'Ambient',
      color: { r: 1.0, g: 1.0, b: 1.0 },
      intensity: 100.0
    }
  ];

	/*Sync.addSync(
	[
		 { "name":"Sync1", "type":"rocket" },
		 { "name":"Sync2", "type":"rocket" }
	]);*/
    var start = 0;
    var duration = 60*20;
    var layer = 1; 


	//fftImage.load("spectogram.png");
	
	//fbot
	this.createFBO(0,20000,"fbo20k");
	this.createFBO(20003,30000,"fbo30k");
	this.createFBO(30003,40000,"fbo40k");
	//debugPrint(666);
	
	
	this.loader.addAnimation ([
	{
		 "start": 0, "duration": 8888
	,"image": ["fbo20k.color.fbo", "spectogram.png"]
		,"layer": 40107
				,"shader":{"name":["fftdistort.fs"]}
	}]);

   		this.loader.addAnimation ([
	{
		 "start": 15.5*pattern, "duration": 8888
	,"image": ["fbo30k.color.fbo", "spectogram.png"]
		,"scale":[{"uniform2d":4.1}
	
		,{"duration":4*pattern,"uniform2d":1.1}
		,{"duration":4.75*pattern,"uniform2d":1.1}
		 ,{"duration":.25*pattern,"uniform2d":3.6}
		 ,{"duration":.25*pattern,"uniform2d":3.6}]
		,"layer": 51208
			 ,"position":[{"x":1080,"y":3400}
			 ,{"duration":2*pattern,"x":640,"y":370}
]
			 		,"shader":{"name":["fftdistort.fs"]} 
		   }]);	 
	
		this.loader.addAnimation ([
	{
		 "start": 0, "duration": 8888
	,"image": ["fbo40k.color.fbo"]
		,"layer": 50105
			 ,"position":[{"x":640,"y":260}
			 ,{"duration":3.75*pattern,"x":640,"y":260}
			 	,{"duration":.25*pattern,"x":640,"y":360}
				,{"duration":28.5*pattern,"x":640,"y":330}
				
				,{"duration":1*pattern,"x":620,"y":360}
				,{"duration":3.3*pattern,"x":360,"y":160}

				
		
		]
		,"scale":[{"uniform2d":1.1}
		,{"duration":11*pattern,"uniform2d":1.1}
		,{"duration":1*pattern,"uniform2d":1.9}
		,{"duration":3.75*pattern,"uniform2d":1.9}
		,{"duration":1.0*pattern,"uniform2d":5.9}
		,{"duration":7.4*pattern,"uniform2d":5.9}	
		,{"duration":.33*pattern,"uniform2d":1.1}		
		]
		,"angle": [{"degreesZ":()=>Math.sin(getSceneTimeFromStart())}
		,{"duration":12*pattern,"degreesZ":()=>Math.sin(getSceneTimeFromStart())}
		,{"duration":4.0*pattern,"degreesZ":()=>-360+Math.sin(getSceneTimeFromStart())}
		,{"duration":16.5*pattern,"degreesZ":()=>-360+Math.sin(getSceneTimeFromStart())}
		,{"duration":4.0*pattern,"degreesZ":()=>-270+Math.sin(getSceneTimeFromStart())}
		]
				,"shader":{"name":["blur.fs"]}

	}]);
	
	this.createFBO(40005,52000,"fbolut");

		this.loader.addAnimation ([
	{
		 "start": 0, "duration": 8888
	,"image": ["fbolut.color.fbo","2dlut.png"]
		,"layer": 60105
			     ,"shader":{"name":"lut.fs"}

	}]);


var textletters1=["J","U","M","A","L","A","U","T","A"];
var texticks1=   [4  ,6  ,10 ,12 ,16 ,18 ,22 ,24 ,28];
var textletters2=["P","R","E","S","E","N","T" ,"S"];
var texticks2=   [34 ,36 ,40 ,42 ,46 ,48 ,48+4,48+6];
var textletters3=["T","H","E"];
var texticks3 = [48+12 ,48+16 ,48+18];
var textletters4=["L","A","S","T"];
var texticks4 = [48+24 ,48+28 ,48+30,48+34];
var textletters5=["F","Ä","R","J","A","N"];
var texticks5 = [48+40 ,48+42 ,48+46,96,96+4,96+6];
var textletters6=["O","F"];
var texticks6 = [96+12 ,96+16];
var textletters7=["L","A","T","E"];
var texticks7 = [96+22, 96+24, 96+28, 96+30];
var textletters8=["C","A","P","I","T","A","L","I","S","M"];
var texticks8 = [96+36,96+40,96+42,96+46,144,144+4,144+6,144+10,144+12,144+16];
const posX = 90;
const letterWidth = 60;
for(let i=0;i<9;i++)
	this.teksti2(texticks1[i],3*pattern+42*tick,textletters1[i],390+letterWidth*i,600);
for(let i=0;i<8;i++)
	this.teksti2(texticks2[i],3*pattern+42*tick,textletters2[i],425+letterWidth*i,530);
for(let i=0;i<3;i++)
	this.teksti2(texticks3[i],3*pattern+42*tick,textletters3[i],posX+170+letterWidth*i,400);
for(let i=0;i<4;i++)
	this.teksti2(texticks4[i],3*pattern+42*tick,textletters4[i],posX+365+letterWidth*i,400);
for(let i=0;i<6;i++)
	this.teksti2(texticks5[i],3*pattern+42*tick,textletters5[i],posX+620+letterWidth*i,400);
for(let i=0;i<2;i++)
	this.teksti2(texticks6[i],3*pattern+42*tick,textletters6[i],posX+505+letterWidth*i,330);
for(let i=0;i<4;i++)
	this.teksti2(texticks7[i],3*pattern+42*tick,textletters7[i],posX+150+letterWidth*i,260);
for(let i=0;i<10;i++)
	this.teksti2(texticks8[i],3*pattern+42*tick,textletters8[i],posX+410+letterWidth*i,260);
/*
Kapitalistinen järjestelmä romahtaa
Parlamentit kerjäläisten ohjastamia

Kuningas kaatuu viimeisen kerran
Uneksi eugeniikka surman virtaan 

Oletko katsonut ikuisuuteen
Nuokkuu teloitetut koneissa

Syntymätön elämää pelkää
Kylmään lempeään syöttää
*/
	

	this.teksti(4*pattern,5*pattern,"KAPITALISTINEN",640,620 );
	this.teksti(4*pattern+.933,5*pattern,"JÄRJESTELMÄ",640, 520);
	this.teksti(4*pattern+1.5,5*pattern,"ROMAHTAA",640,420);
	
	this.teksti(5*pattern,6*pattern,"PARLAMENTIT",640,620 );
	this.teksti(5*pattern+.78,6*pattern,"KERJÄLÄISTEN",640, 520);
	this.teksti(5*pattern+1.512,6*pattern,"OHJASTAMIA",640,420);
	
	this.teksti(6*pattern,7*pattern,"KUNINGAS",640,620 );
	this.teksti(6*pattern+.52,7*pattern,"KAATUU",640,520);
	this.teksti(6*pattern+1.01,7*pattern,"VIIMEISEN",640,420 );
	this.teksti(6*pattern+1.65,7*pattern,"KERRAN",640,320 );
	
		this.teksti(7*pattern,8*pattern,"UNEKSI",640,620 );
	this.teksti(7*pattern+.44,8*pattern,"EUGENIIKKA",640,520);
	this.teksti(7*pattern+1.352,8*pattern,"SURMAN",640,420 );
	this.teksti(7*pattern+1.94,8*pattern,"VIRTAAN",640,320 );
	
	this.teksti(8*pattern,9*pattern,"OLETKO",640,620 );
	this.teksti(8*pattern+.405,9*pattern,"KATSONUT",640, 520);
	this.teksti(8*pattern+.893,9*pattern,"IKUISUUTEEN",640,420);
	
	this.teksti(9*pattern,10*pattern,"NUOKKUU",640,620 );
	this.teksti(9*pattern+.737,10*pattern,"TELOITETUT",640, 520);
	this.teksti(9*pattern+1.52,10*pattern,"KONEISSA",640,420);	
	
	this.teksti(10*pattern,11*pattern,"SYNTYMÄTÖN",640,620 );
	this.teksti(10*pattern+.754,11*pattern,"ELÄMÄÄ",640, 520);
	this.teksti(10*pattern+1.33,11*pattern,"PELKÄÄ",640,420);	
	
	this.teksti(11*pattern,12*pattern,"KYLMÄÄN",640,620 );
	this.teksti(11*pattern+.822,12*pattern,"LEMPEÄÄN",640, 520);
	this.teksti(11*pattern+1.56,12*pattern,"SYÖTTÄÄ",640,420);	
	
// english
/*
The capitalist system falls
Beggars grasp the reins of parliaments

The king falls for the very last time
Dream eugenics into the slaying tide

Have you gazed into the everlasting
Where the hangman’s tally dozes in machines

An unborn dreads the gift of life
Feeds it to the compassionate chill
*/
	this.teksti(24.5*pattern,25.5*pattern,"The",640,620 );
	this.teksti(24.5*pattern+.15,25.5*pattern,"capitalist",640,520 );
	this.teksti(24.5*pattern+.933,25.5*pattern,"system",640, 420);
	this.teksti(24.5*pattern+1.5,25.5*pattern,"falls",640,320);
	
	this.teksti(25.5*pattern,26.5*pattern,"Beggars",640,620 );
	this.teksti(25.5*pattern+.15,26.5*pattern,"grasp",640,520 );	
	this.teksti(25.5*pattern+.78,26.5*pattern,"the reins",640, 420);
	this.teksti(25.5*pattern+1.512,26.5*pattern,"of parliaments",640,320);
	
	this.teksti(26.5*pattern,27.5*pattern,"The king",640,620 );
	this.teksti(26.5*pattern+.52,27.5*pattern,"falls",640,520);
	this.teksti(26.5*pattern+1.01,27.5*pattern,"for the very",640,420 );
	this.teksti(26.5*pattern+1.65,27.5*pattern,"last time",640,320 );
	
		this.teksti(27.5*pattern,28.5*pattern,"Dream",640,620 );
	this.teksti(27.5*pattern+.44,28.5*pattern,"eugenics",640,520);
	this.teksti(27.5*pattern+1.352,28.5*pattern,"into the",640,420 );
	this.teksti(27.5*pattern+1.94,28.5*pattern,"slaying tide",640,320 );
	
	this.teksti(28.5*pattern,29.5*pattern,"Have you",640,620 );
	this.teksti(28.5*pattern+.405,29.5*pattern,"gazed",640, 520);
	this.teksti(28.5*pattern+.893,29.5*pattern,"into the",640,420);
	this.teksti(28.5*pattern+1.193,29.5*pattern,"everlasting",640,320);
	
	this.teksti(29.5*pattern,30.5*pattern,"Where the ",640,620 );
	this.teksti(29.5*pattern+.36,30.5*pattern,"hangman’s tally",640,520 );
	this.teksti(29.5*pattern+.737,30.5*pattern,"dozes",640,420);	
	this.teksti(29.5*pattern+1.52,30.5*pattern,"in machines",640,320);	
	
	this.teksti(30.5*pattern,31.5*pattern,"An unborn",640,620 );
	this.teksti(30.5*pattern+.754,31.5*pattern,"dreads",640, 520);
	this.teksti(30.5*pattern+1.33,31.5*pattern,"the gift",640,420);	
	this.teksti(30.5*pattern+1.55,31.5*pattern,"of life",640,320);	
	
	this.teksti(31.5*pattern,32.5*pattern,"Feeds it",640,620 );
	this.teksti(31.5*pattern+.322,32.5*pattern,"to the",640, 520);
		this.teksti(31.5*pattern+.822,32.5*pattern,"compassionate",640, 420);
	this.teksti(31.5*pattern+1.66,32.5*pattern,"chill",640,320);		
	/*
	this.loader.addAnimation([{
      "start": 0, "duration": 300,"layer": 10000
      ,"runFunction": "{blendAdd(animation);}"    
	  }]);
	  */


	this.geneRateCity(3.7*pattern,1*pattern,62);
	this.generateWAR(24.3*pattern,1*pattern,41);

	//this.gear(24.5*pattern,4*pattern,-1,0,-2,60,-2);	


	// end
				this.loader.addAnimation([{
         "start": 41.5*pattern, "duration": 5*pattern,"layer": 80000
        ,"image": "end_layer_5.png"
		,"color":[{"r":0,"g":0,"b":0,"a":0}
		,{"duration":1*pattern,"a":255}]
		,"position":[{"x":640,"y":360}]
		,"scale":[{"uniform2d":2.0}]
	   }]);	
	   
	this.creditsTeksti(43*pattern,"Code/GFX/Music",1.9);
	this.creditsTeksti(43*pattern+.1*pattern,"Anteeksi",1.9);	
	this.creditsTeksti(43*pattern+.3*pattern,"Engine",1.9);
	this.creditsTeksti(43*pattern+.4*pattern,"Haluttu Maksullinen Engine",1.9);	
	this.creditsTeksti(43*pattern+.6*pattern,"Translation Services",1.9);
	this.creditsTeksti(43*pattern+.7*pattern,"Paasikivi-Kekkosen Linja",1.9);	
	this.creditsTeksti(43*pattern+.9*pattern,"Executive Producer",1.9);
	this.creditsTeksti(43*pattern+pattern,"Mankeli",1.9);	
	
	
	this.creditsTeksti(43*pattern+1.4*pattern,"Publid Domain Images",1.9);
	this.creditsTeksti(43*pattern+1.5*pattern,"United States Government",1.9);
	this.creditsTeksti(43*pattern+1.6*pattern,"Max Smith",1.9);
	this.creditsTeksti(43*pattern+1.8*pattern,"Wikipedia Commons Images",1.9);
	this.creditsTeksti(43*pattern+2.0*pattern,"Ronald_McDonald_in_Thailand.jpg",1.6);
	this.creditsTeksti(43*pattern+2.1*pattern,"Christopher P. Michel",1.9);
	this.creditsTeksti(43*pattern+2.2*pattern,"Apple_Macintosh_Plus.jpg",1.9);
	this.creditsTeksti(43*pattern+2.3*pattern,"Felix Winkelnkemper",1.9);
	this.creditsTeksti(43*pattern+2.4*pattern,"SpaceX_Falcon_9.jpg",1.9);
	this.creditsTeksti(43*pattern+2.5*pattern,"SpacecoasterVBG",1.9);
	this.creditsTeksti(43*pattern+2.6*pattern,"2019_Tesla_Model_3_Performance_AWD_Front.jpg",1.2);
	this.creditsTeksti(43*pattern+2.7*pattern,"Vauxford",1.9);
	this.creditsTeksti(43*pattern+2.8*pattern,"2013_Moscow_Victory_Day_Parade_(28).jpg",1.5);
	this.creditsTeksti(43*pattern+2.9*pattern,"Vitaly V. Kuzmin",1.9);

	

	
		
		this.loader.addAnimation([{
         "start": postCreditsTime, "duration": 3*pattern,"layer": 21
        ,"image": "end_layer_1.png"
		,"position":[{"x":270,"y":110}
		,{"duration":4*pattern,"x":700}]
		,"scale":[{"uniform2d":.8}]
	   }]);
	
		this.loader.addAnimation([{
         "start": postCreditsTime, "duration": 3*pattern,"layer": 20
        ,"image": "end_layer_2.png"
		,"position":[{"x":630,"y":130}
		,{"duration":3*pattern,"x":800}]
		,"scale":[{"uniform2d":1.0}]
	   }]);

	   	this.loader.addAnimation([{
         "start": postCreditsTime+1.9*pattern, "duration": 3*pattern,"layer": 19
        ,"image": "farjanmirror.png"
		,"scale":[{"uniform2d":0.5}]

		,"color":[{"r":0,"g":0,"b":0,"a":255}]
			,"position":[{"x":1250,"y":318}
		,{"duration":3*pattern,"x":700}]

	   }]);	
		this.loader.addAnimation([{
         "start": postCreditsTime, "duration": 3*pattern,"layer": 17
        ,"image": "end_layer_3.png"
		,"color":[{"r":255,"g":225,"b":255,"a":255}]
		,"position":[{"x":700,"y":340}
		,{"duration":4*pattern,"x":730}]
		,"scale":[{"uniform2d":0.8}]
	   }]);

		this.loader.addAnimation([{
         "start": postCreditsTime, "duration": 3*pattern,"layer": 18
        ,"image": "end_layer_4.png"
		,"position":[{"x":550,"y":260}
		,{"duration":4*pattern,"x":600}]
		,"scale":[{"uniform2d":0.8}]
	   }]);
	
		this.loader.addAnimation([{
         "start": postCreditsTime, "duration": 3*pattern,"layer": 16
        ,"image": "end_layer_5.png"
		,"position":[{"x":640,"y":610}]
		,"scale":[{"uniform2d":1.0}]
	   }]);
	   
	   
			this.loader.addAnimation([{
         "start": postCreditsTime, "duration": 3*pattern,"layer": 25
        ,"image": "end_layer_5.png"
		,"color":[{"r":0,"g":0,"b":0,"a":255}
		,{"duration":2*pattern,"a":0}]
		,"position":[{"x":640,"y":360}]
		,"scale":[{"uniform2d":2.0}]
	   }]);	
	   
		 this.loader.addAnimation([{
         "start": 12.0*pattern, "duration": 12.5*pattern,"layer": 11
        ,"image": "skulls.png"
		,"scale":[{"uniform2d":2.0}]
				 			 	 ,"shader":{
            "name":["tunnel.fs"],
            "variable":[
                  {"name":"tim3","value":[()=>getSceneTimeFromStart()]}
			]
        }
   }]);
// firetest
this.generateShips(32.5*pattern, 1*pattern, 15);
this.generateBombs(36.25*pattern, 1*pattern, 18);
this.explosion(39.5*pattern,200,400);
	  
	  this.loader.addAnimation([{
         "start": 39.5*pattern, "duration": 1*pattern,"layer": 19999
        ,"image": "atombomb.png"
			,"color":[{"a":250}
			,{"duration":.2*pattern,"a":0}]
			,"scale":[{"x":2,"y":2.0}
		,{"duration":.2*pattern,"x":3.500,"y":3.5}]
		   }]);
		   
		this.loader.addAnimation([{
         
	    "start": 32.5*pattern, "duration": 10*pattern,"layer": 19997
        ,"image": "noise.png"
	 ,"position":[{"x":640,"y":640}]
		,"scale":[{"uniform2d":2.5}]
			,"shader":{
            "name":["fire.fs"],
            "variable":[
                  {"name":"tim3","value":[()=>getSceneTimeFromStart()]},
				  {"name":"time2","value":[()=>getSceneTimeFromStart()-32.5*pattern]} 
			]
        }
		
   }]);
   
		this.loader.addAnimation([{
         "start": 0*pattern, "duration": 130*pattern,"layer": 21
        ,"image": "money.png"

			,"color":[{"r":255,"g":255,"b":255,"a":255}
			,{"duration":12*pattern,"a":255}
			,{"duration":1*pattern,"a":0}
			]
			,"shader":{
            "name":["mirrorscroll.fs"],
            "variable":[
                  {"name":"tim3","value":[()=>getSceneTimeFromStart()]}
				  
			]
        }
		
   }]);
 
 		this.loader.addAnimation([{
         "start": 24.0*pattern, "duration": 18*pattern,"layer": 21
        ,"image": "skulls.png"
	,"scale":[{"x":1.78,"y":1.0}]
			,"color":[{"r":110,"g":199,"b":190,"a":0}
			,{"duration":.5*pattern,"a":255}
			,{"duration":11.5*pattern,"a":255}
			,{"duration":1*pattern,"a":0}
			]
			,"shader":{
            "name":["mirrorscroll.fs"],
            "variable":[
                  {"name":"tim3","value":[()=>getSceneTimeFromStart()]}
				  
			]
        }
		
   }]);
       	this.loader.addAnimation([{
         "start": 32.5*pattern, "duration": 7*pattern,"layer": 19998
        ,"image": "baphomet.png"
			,"scale":[{"x":2,"y":2.0}]
			,"color":[{"a":255}]
		,"position":[{"x":640,"y":-730}
		,{"duration":7*pattern,"y":200}]
		   }]);
		   
	       	this.loader.addAnimation([{
         "start": 39.5*pattern, "duration": 3*pattern,"layer": 19998
        ,"image": "trumpbaphomet.png"

			,"scale":[{"x":2,"y":2.0}]
		,"position":[{"x":640,"y":200}]
		   }]);
		   
    		this.loader.addAnimation([{
         "start": 32*pattern, "duration": 14*pattern,"layer": 21
        ,"image": "skulls.png"
	,"scale":[{"x":1.78,"y":2.0}]
		,"angle": [{"degreesZ":90}]
			,"color":[{"r":255,"g":155,"b":150,"a":0}
			,{"duration":4*pattern,"a":255}
			,{"duration":11.5*pattern,"a":255}
			,{"duration":1*pattern,"a":0}
			]
			,"shader":{
            "name":["mirrorscroll.fs"],
            "variable":[
                  {"name":"tim3","value":[()=>getSceneTimeFromStart()]}
				  
			]
        }
		
   }]);
	
   /*
 		this.loader.addAnimation([{
         "start": 24.5*pattern, "duration": 18*pattern,"layer": 21
       	 ,"object":"skullcylinder.obj"
		,"scale":[{"uniform2d":1.2}]
			,"angle": [{"degreesY":()=>125*getSceneTimeFromStart()}"}]
	 ,"position":[{"z":0.0,"x":0,"y":0}]
			,"color":[{"r":255,"g":255,"b":255,"a":255}
			,{"duration":12*pattern,"a":255}
			,{"duration":1*pattern,"a":0}
			]

			,"shader":{
            "name":["mirrorscroll.fs"],
            "variable":[
                  {"name":"tim3","value":[()=>-2*getSceneTimeFromStart()}"]}
				  
			]
        }
		
		
   }]);
*/
   
   		this.loader.addAnimation([{
         "start": 12*pattern, "duration": 8*pattern,"layer": 999
        ,"image": "grid.png"
			 ,"position":[{"x":740,"y":450}]
		,"scale":[{"x":1.1,"y":1.1}]
			,"color":[{"r":255,"g":255,"b":255,"a":0}
			,{"duration":1*pattern,"a":255}
			,{"duration":3.9*pattern,"a":255}
			,{"duration":.2*pattern,"a":0}
			]

   }]);
   
   	this.addFontAnimation([{
		"start": 12*pattern, "duration": 4.0*pattern ,"layer": 40400,			
		"text":
		{
			"string":"DEATH"	
			,"name":"font.ttf"
		}
		,"scale":[{"uniform2d":1.9}]

 ,"position":[{"x":640,"y":30,"z":-4}]
 	,"angle":[{"degreesZ":0}]
 	,"shader":{"name":["textblur.fs"]}
	}]);

   	this.addFontAnimation([{
		"start": 12*pattern, "duration": 4.9*pattern ,"layer": 40400,			
		"text":
		{
			"string":"PROFIT"	
			,"name":"font.ttf"
		}
		,"scale":[{"uniform2d":1.9}]

 ,"position":[{"x":320,"y":390,"z":-4}]
 	,"angle":[{"degreesZ":-90}]
 	,"shader":{"name":["textblur.fs"]}
	}]);
	
       this.loader.addAnimation([{
         "start": 11.5*pattern, "duration": 8*pattern
		 ,"object":"curve.obj"
         ,"layer": 1002
		 ,"position":[{"z":-6.0,"x":0,"y":-3}
		 ,{"duration":6*pattern,"z":-4.0,"x":-40,"y":-21}]
		,"angle": [{"degreesX":-90}
		,{"duration":5.6*pattern,"degreesY":0}
		,{"duration":.5*pattern,"degreesY":-10}]
			    ,"shader":{"name":["curve.vs","curve.fs"]}
    }]);


	
       this.loader.addAnimation([{
         "start": 12*pattern, "duration": 8*pattern
		 ,"object":"curve2.obj"
         ,"layer": 1002
		 ,"position":[{"z":-4.0,"x":0,"y":-3}
		 ,{"duration":6*pattern,"z":-4.0,"x":-40,"y":-18}]
		,"angle": [{"degreesX":-90}
		,{"duration":4.8*pattern,"degreesY":0}
		,{"duration":.5*pattern,"degreesY":-10}]
			    ,"shader":{"name":["curve.vs","curve.fs"]}
    }]);
	
       this.loader.addAnimation([{
         "start": 12.5*pattern, "duration": 8*pattern
		 ,"object":"curve3.obj"
         ,"layer": 1002
		 ,"position":[{"z":-6.0,"x":0,"y":-3}
		 ,{"duration":6*pattern,"z":-4.0,"x":-40,"y":-15}]
		,"angle": [{"degreesX":-90}
		,{"duration":3.75*pattern,"degreesY":0}
		,{"duration":.5*pattern,"degreesY":-10}]
			    ,"shader":{"name":["curve.vs","curve.fs"]}
    }]);
	/*
    this.loader.addAnimation([{
         "start": 0, "duration": 12
		 ,"object":"particlething.obj"
         ,"layer": 10001
		 ,"position":[{"z":-2.55}]
		,"scale":[{"uniform2d":0.2}]

	    ,"shader":{"name":["particles.vs","particles.gs","particles.fs"]}
	    //,"angle": [{"degreesY":()=>getSceneTimeFromStart()*5}","degreesZ":()=>getSceneTimeFromStart()*5}"}]
		,"angle": [{"degreesX":()=>getSceneTimeFromStart()*25}"}]
		
    }]);
	*/
	

	  
	  			    this.loader.addAnimation([{
         "start": 0*pattern, "duration": 39.5*pattern,"layer": 31000
        ,"image": "farjan.png"
		,"scale":[{"uniform2d":0.5}]
		,"color":[{"r":0,"g":0,"b":0,"a":255}]
      		 ,"position":[{"y":255,"x":()=>310+15*Math.sin(6*getSceneTimeFromStart())}
		 		,{"duration":11*pattern,"y":255,"x":()=>310+15*Math.sin(6*getSceneTimeFromStart())}
				,{"duration":1*pattern,"y":255,"x":()=>640+15*Math.sin(6*getSceneTimeFromStart())}
				,{"duration":4.0*pattern,"y":255,"x":()=>640+15*Math.sin(6*getSceneTimeFromStart())}
				,{"duration":1*pattern,"x":()=>640+15*Math.sin(6*getSceneTimeFromStart()),"y":0}
				,{"duration":7.0*pattern,"x":()=>640+15*Math.sin(6*getSceneTimeFromStart()),"y":0}
				,{"duration":.1*pattern,"y":255,"x":()=>310+15*Math.sin(6*getSceneTimeFromStart())}
		]
   }]);
/*
		this.loader.addAnimation([{
      "start": 0, "duration": 300,"layer": 30999
      ,"runFunction": "{blendNormal(animation);}"    
	  }]);
*/
	
	  			    this.loader.addAnimation([{
         "start": 0*pattern, "duration": 43*pattern,"layer": 31000
        ,"image": "bridge.png"
		,"scale":[{"x":1.5,"y":0.3}]
		,"color":[{"r":0,"g":0,"b":0,"a":255}]
        		 ,"position":[{"y":100,"x":640}]   
				 			 	 ,"shader":{
            "name":["scroll.fs"],
            "variable":[
                  {"name":"tim3","value":[()=>1.5*getSceneTimeFromStart()]}
			]
        }
   }]);
   

   
   	  			    this.loader.addAnimation([{
         "start": 16.0*pattern, "duration": 8.5*pattern,"layer": 50107
        ,"image": "hytti.png"
		,"scale":[{"uniform2d":1.7}
		,{"duration":4.5*pattern,"uniform2d":1.7}
		,{"duration":3.75*pattern,"uniform2d":1.7}
		 ,{"duration":.25*pattern,"uniform2d":2.7}
		 ]
		,"color":[{"r":0,"g":0,"b":0,"a":0}
		,{"duration":.5*pattern,"r":255,"g":255,"b":255,"a":255}
		,{"duration":7.75*pattern,"r":255,"g":255,"b":255,"a":255}
		,{"duration":.25*pattern,"r":255,"g":255,"b":255,"a":0}]
			

      		 ,"position":[{"y":()=>340+20*Math.sin(3*getSceneTimeFromStart()),"x":()=>640+20*Math.sin(.5*getSceneTimeFromStart())}]  
   }]);

      	 this.loader.addAnimation([{
         "start": 16.0*pattern, "duration": 8.5*pattern,"layer": 20107
        ,"image": "trumputin.png"
		,"scale":[{"uniform2d":1.2}]
		
      	 ,"position":[{"y":()=>140+10*Math.sin(1.8*getSceneTimeFromStart()),"x":640}]  
		}]);

      	 this.loader.addAnimation([{
         "start": 22.5*pattern, "duration": 4.5*pattern,"layer": 20111
        ,"image": "citypiece8.png"
		,"scale":[{"uniform2d":1.1}]
,"angle": [{"degreesZ":()=>65+6*Math.sin(1.2*getSceneTimeFromStart()+15.4)}]		
      	 ,"position":[{"y":0,"x":-250}
		 ,{"duration":.25*pattern,"y":50,"x":220}]  
		}]);
this.loader.addAnimation([{
         "start": 22.5*pattern, "duration": 2.0*pattern,"layer": 20106
        ,"image": "citypiece8.png"
		,"scale":[{"uniform2d":1.1}]
,"angle": [{"degreesZ":()=>105+6*Math.sin(1.2*getSceneTimeFromStart()+55.7)}]		
      	 ,"position":[{"y":780,"x":-100}
		,{"duration":.25*pattern,"y":590,"x":180}]  
		}]);		
		
		this.loader.addAnimation([{
          "start": 22.5*pattern, "duration": 2.0*pattern,"layer": 20111
        ,"image": "citypiece3.png"
		,"scale":[{"uniform2d":1.1}]
,"angle": [{"degreesZ":()=>-65+6*Math.sin(1.2*getSceneTimeFromStart()+199)}]		
      	 ,"position":[{"y":0,"x":1430}
		 ,{"duration":.25*pattern,"y":50,"x":1000}] 
		}]);
this.loader.addAnimation([{
          "start": 22.5*pattern, "duration": 4.5*pattern,"layer": 20106
        ,"image": "citypiece3.png"
		,"scale":[{"uniform2d":1.1}]
,"angle": [{"degreesZ":()=>-105+6*Math.sin(1.2*getSceneTimeFromStart())}]		
      	 ,"position":[{"y":800,"x":1300}
		 ,{"duration":.25*pattern,"y":590,"x":1000}] 
		}]);		
		
		      	 this.loader.addAnimation([{
         "start": 16.0*pattern, "duration": 8.5*pattern,"layer": 20108
        ,"image": "trumphead.png"
		,"scale":[{"uniform2d":0.45}]
,"angle": [{"degreesZ":()=>5-10*Math.sin(1.2*getSceneTimeFromStart())}]
      	 ,"position":[{"y":()=>500+15*Math.sin(2.1*getSceneTimeFromStart()),"x":320}]  
		}]);

		      	 this.loader.addAnimation([{
         "start": 16.0*pattern, "duration": 8.5*pattern,"layer": 20108
        ,"image": "putinhead.png"
		,"scale":[{"uniform2d":0.45}]
,"angle": [{"degreesZ":()=>5-10*Math.sin(0.8*getSceneTimeFromStart())}]
      	 ,"position":[{"y":()=>460+10*Math.sin(2.3*getSceneTimeFromStart()),"x":980}]  
		}]);
		   
	this.generateHearts(20.5*pattern,1*pattern,35);
		
	  //tämä kaataa!!!
	  /*
	   this.loader.addAnimation({
         "start": 4*pattern, "duration": 120*pattern,"layer": 31000
        ,"image": "f.png"
		,"scale":[{"x":1.5,"y":0.3}]
		,"color":[{"r":0,"g":0,"b":0,"a":255}]
      		 ,"position":[{"y":222,"x":640}]  
			 	 ,"shader":{
            "name":["scroll.fs"],
            "variable":[
                  {"name":"tim3","value":[()=>1.5*getSceneTimeFromStart()}"]}
			]
        }
    });
	*/
	
	
/*
    this.loader.addAnimation({
         "start": start, "duration": duration,"layer": 10000
        ,"image": "spectogram.png"
	
		,"shader":{"name":["singleblockfft.fs"]}

    });
*/
}

Demo.prototype.createFBO = function (startLayer, endLayer, name)
{
	   	this.loader.addAnimation ([
	{
	"start": 0, "duration": 99999
	,"layer": startLayer
	,"fbo":{"name":name,"action":"begin","storeDepth":true}
	}
	]);
	
	this.loader.addAnimation ([
	{
	"start": 0, "duration": 99999
	,"layer": endLayer,"fbo":{"name":name,"action":"unbind"}
	}
	]);
	
}

Demo.prototype.explosion = function (startTime, posx, posy)
{
	for(let i=0;i<54;i++)
	{
			this.loader.addAnimation([{
			 "start": startTime, "duration": 2*pattern,"layer": 9000
			,"image": "explo.png"
					,"color":[{"r":0,"g":0,"b":0,"a":255}
		,{"duration":2*pattern,"a":0}]
			,"scale":[{"uniform2d":Math.random()*.5+.25}
			,{"duration":2*pattern,"uniform2d":0}]
			,"angle":[{"degreesZ":Math.random()*360}
			,{"duration":2*pattern,"degreesZ":Math.random()*360}
			]
			,"position":[{"x":posx+Math.random()*33,"y":posy+Math.random()*300,"z":0}
			,{"duration":2*pattern,"x":Math.random()*1280*2,"y":Math.random()*720*2-222,"z":-1+Math.random()*2}
			]
			}]);
	}
	
		for(let i=0;i<54;i++)
	{
			this.loader.addAnimation([{
			 "start": startTime, "duration": 2*pattern,"layer": 49000
			,"image": "explo.png"
					,"color":[{"r":0,"g":0,"b":0,"a":255}
		,{"duration":2*pattern,"a":0}]
			,"scale":[{"uniform2d":Math.random()*.5+.25}
			,{"duration":2*pattern,"uniform2d":0}]
			,"angle":[{"degreesZ":Math.random()*360}
			,{"duration":2*pattern,"degreesZ":Math.random()*360}
			]
			,"position":[{"x":posx+Math.random()*33,"y":posy+Math.random()*300,"z":0}
			,{"duration":2*pattern,"x":Math.random()*1280*2,"y":Math.random()*720*2-222,"z":-1+Math.random()*2}
			]
			}]);
	}
	
}
Demo.prototype.geneRateCity = function (startTime, duration, amount)
{
	
	for(let i=0;i<amount;i++)
	{

		this.loader.addAnimation([{
			 "start": startTime+i*beat, "duration": duration,"layer": 1002+i%2
			,"image": "citypiece"+Math.floor(1+Math.random()*8)+".png"
			,"scale":[{"uniform2d":1.3}]
			,"color":[{"r":255,"g":255,"b":255,"a":255}]
			,"angle": [{"degreesZ":15-Math.random()*30}
			,{"duration":duration,"degreesZ":15-Math.random()*30}]
			,"position":[{"y":130+Math.random()*140,"x":1480}
				,{"duration":duration,"x":-200}]
	   }]);

	}
}
Demo.prototype.generateBombs = function (startTime, duration, amount)
{
		for(let i=0;i<amount;i++)
	{
			this.loader.addAnimation([{
			 "start": startTime+i*.5, "duration": duration,"layer": 19999
			,"image": "warpiece5.png"
			,"scale":[{"uniform2d":Math.random()*.8}]
			,"color":[{"r":0,"g":0,"b":0,"a":255}]
			,"angle": [{"degreesZ":-90}]
			,"position":[{"y":880,"x":Math.random()*1280}
				,{"duration":duration,"y":Math.random()*100-300}]
	   }]);
	}
}
Demo.prototype.generateShips = function (startTime, duration, amount)
{
	for(let i=0;i<amount;i++)
	{
			this.loader.addAnimation([{
			 "start": startTime+i, "duration": duration,"layer": 19999
			,"image": "warpiece1.png"
			,"scale":[{"uniform2d":Math.random()*1.3}]
			,"color":[{"r":0,"g":0,"b":0,"a":255}]
			,"angle": [{"degreesZ":0}]
			,"position":[{"y":Math.random()*720,"x":1500}
				,{"duration":duration,"x":-200-Math.random()*700,"y":Math.random()*720}]
	   }]);
	}
		for(let i=0;i<amount;i++)
	{
			this.loader.addAnimation([{
			 "start": startTime+i+.5, "duration": duration,"layer": 19999
			,"image": "warpiece7.png"
			,"scale":[{"uniform2d":Math.random()*1.0}]
			,"color":[{"r":0,"g":0,"b":0,"a":255}]
			,"angle": [{"degreesZ":0}]
			,"position":[{"y":Math.random()*360+360,"x":1500}
				,{"duration":duration,"x":-200-Math.random()*700,"y":Math.random()*720}]
	   }]);
	}
}
Demo.prototype.generateWAR = function (startTime, duration, amount)
{
	
	for(let i=0;i<amount;i++)
	{
		var Ran = Math.floor(1+Math.random()*7);
		this.loader.addAnimation([{
			 "start": startTime+i*beat*1.5, "duration": duration,"layer": 1002+i%2
			,"image": "warpiece"+Ran+".png"
			,"scale":[{"uniform2d":1.3}]
			,"color":[{"r":255,"g":255,"b":255,"a":255}]
			,"angle": [{"degreesZ":15-Math.random()*30}
			,{"duration":duration,"degreesZ":15-Math.random()*30}]
			,"position":[{"y":warPos[Ran-1]+330+Math.random()*30,"x":1580}
				,{"duration":duration,"x":-300}]
	   }]);

	}
}

Demo.prototype.addFontAnimation = function(animationDefinition) {
	const originalText = ""+animationDefinition[0].text.string;

	animationDefinition[0].text.string = animationDefinition[0].text.string.replace(/[^\s]/g, "#");
	this.loader.addAnimation(JSON.parse(JSON.stringify(animationDefinition)));
	animationDefinition[0].text.string = originalText.toUpperCase();
	animationDefinition[0].color = [{"r":0,"g":0,"b":0,"a":255}];
	this.loader.addAnimation(animationDefinition);
}

Demo.prototype.teksti = function (startTime, duration,stringi,xpos,ypos)
{
	this.addFontAnimation([{
		"start": startTime, "end": duration ,"layer": 40400,			
		"text":
		{
			"string":stringi	
			,"name":"font.ttf"
		}
		,"scale":[{"uniform2d":2.9}]
	
 ,"position":[{"x":xpos,"y":ypos,"z":-4}
 ,{"duration":1*pattern,"x":xpos-Math.random()*200}]
 	,"angle":[{"degreesZ":5-Math.random()*10}]
 	,"shader":{"name":["textblur.fs"]}
	}]);
}

Demo.prototype.teksti2 = function (startTime, duration,stringi,xpos,ypos)
{
	this.addFontAnimation([{
		"start": startTime*tick, "end": duration ,"layer": 40400,			
		"text":
		{
			"string":stringi	
			,"name":"font.ttf"
		}
		,"scale":[{"uniform2d":2.9}]
	
 ,"position":[{"x":xpos,"y":ypos,"z":-4}
 ,{"duration":4*pattern,"y":ypos+5-Math.random()*5}]
 	,"angle":[{"degreesZ":5-Math.random()*10}]
 	,"shader":{"name":["textblur.fs"]}
	}]);
}

Demo.prototype.creditsTeksti = function (startTime, stringi,scalex)
{
	this.addFontAnimation([{
		"start": startTime, "end": startTime+pattern ,"layer": 90400,			
		"text":
		
		{
			"string":stringi	
			,"name":"font.ttf"
		}
		,"scale":[{"uniform2d":scalex}]
	
 ,"position":[{"x":640,"y":-100,"z":-4}
	,{"duration":1*pattern,"x":600+Math.random()*80,"y":720}]
 	,"angle":[{"degreesZ":5-Math.random()*10}]
 	,"shader":{"name":["textblur.fs"]}
	}]);
}

Demo.prototype.gear = function (startTime, duration, posx, posy, posz, gearAngle,gearDirection)
{
	     this.loader.addAnimation([{
         "start": startTime, "duration": duration
		 
		 ,"object":"gear.obj"
         ,"layer": 900
		 ,"position":[{"x":posx+8,"y":posy,"z":posz}
		 ,{"duration":1*pattern,"x":posx,"y":posy,"z":posz}]
		,"angle": [{"gearAngle":gearAngle,"gearDirection":gearDirection,"degreesX":80+Math.random()*20,"degreesZ":-5+Math.random()*10,"degreesY":(animation)=>animation.gearAngle+animation.gearDirection*10*getSceneTimeFromStart()}]
		}]);
}
Demo.prototype.generateHearts = function (startTime, duration, amount)
{
	
	for(let i=0;i<amount;i++)
	{
		
		this.loader.addAnimation([{
			 "start": startTime+i*beat, "duration": duration,"layer": 25000
			,"image": "usaheart.png"
			,"scale":[{"uniform2d":0.1+Math.random()*.3}]
			,"color":[{"r":255,"g":255,"b":255,"a":255}]
			,"angle": [{"degreesZ":15-Math.random()*30}]
			,"position":[{"y":-100,"x":140+Math.random()*1000}
				,{"duration":duration,"y":800}]
	   }]);
	}
		for(let i=0;i<amount;i++)
	{
		
		this.loader.addAnimation([{
			 "start": startTime+i*beat+beat*.5, "duration": duration,"layer": 25000
			,"image": "rusheart.png"
			,"scale":[{"uniform2d":0.1+Math.random()*.3}]
			,"color":[{"r":255,"g":255,"b":255,"a":255}]
			,"angle": [{"degreesZ":15-Math.random()*30}]
			,"position":[{"y":-100,"x":140+Math.random()*1000}
				,{"duration":duration,"y":800,"x":140+Math.random()*1000}]
	   }]);
	}
	
}