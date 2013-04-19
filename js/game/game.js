define(["game/sound","lib/jquery"],function(Sound,$) {

    // Manages the whole game ("God Object")
    function Game(mapConfig) {
        this.running = true;
        this.pause = false;
        this.score = new Score();
        this.soundfx = 0;
        this.mapConfig = mapConfig;
        this.map;
        this.pillCount;	// # of pills
        this.monsters;
        this.level = 1;
        this.canvas = $("#myCanvas").get(0);
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    };
    
    // Functions
	Game.prototype.toggleSound = function() { 
		this.soundfx == 0 ? this.soundfx = 1 : this.soundfx = 0; 
		$('#mute').toggle();
		};
	Game.prototype.reset = function() {
		};
	Game.prototype.nextLevel = function() {
		this.level++;
		this.init(1);
	};
	Game.prototype.init = function (state) {
		console.log("init game");
		
		// get Level Map
		$.ajax({
			url: this.mapConfig,
			async: false,
			 beforeSend: function(xhr){
				if (xhr.overrideMimeType) xhr.overrideMimeType("application/json"); 
			},
			dataType: "json",
			success: function (data) {
				map = data; // something's fucking wrong here and it ain't my code
			}
		});
	
		var temp = 0;
		$.each(this.map.posY, function(i, item) {
		   $.each(this.posX, function() { 
			   if (this.type == "pill") {
				temp++;
				//console.log("Pill Count++. temp="+temp+". PillCount="+this.pillCount+".");
				}
			});
		});
		
		this.pillCount = temp;
		$(".lives").html("Lives: "+pacman.lives);	
		/*var text = "Insert Coin to Play!";
		context.fillStyle = "#FFF";
		context.font = "20px 'Press Start 2P'";
		context.fillText(text, this.canvas.width/2-200, this.canvas.height/2-10);
		*/
		
		if (state == 0) {
			this.score.set(0);
			this.score.refresh(".score");
			pacman.lives = 3;
			}
		pacman.reset();
		
		// initalize Ghosts, avoid memory flooding
		if (pinky == null) {
			pinky = new Ghost(14*pacman.radius,10*pacman.radius,'img/pinky.svg');
			inky = new Ghost(16*pacman.radius,10*pacman.radius,'img/inky.svg');
			blinky = new Ghost(18*pacman.radius,10*pacman.radius,'img/blinky.svg');
			clyde = new Ghost(20*pacman.radius,10*pacman.radius,'img/clyde.svg');
		}
		else {
			//console.log("ghosts reset");
			pinky.setPosition(14*pacman.radius,10*pacman.radius);
			pinky.dazzle = false;
			inky.setPosition(16*pacman.radius,10*pacman.radius);
			inky.dazzle = false;
			blinky.setPosition(18*pacman.radius,10*pacman.radius);
			blinky.dazzle = false;
			clyde.setPosition(20*pacman.radius,10*pacman.radius);
			clyde.dazzle = false;
		}
	
	};
	Game.prototype.check = function() {
	if ((this.pillCount == 0) && game.running) {
			alert("Level "+game.level+" complete!\nScore: "+game.score.score+"\nRemaining Lives: "+pacman.lives+"\nClick OK to proceed to start the next level.");
			this.nextLevel();
		}
	};
	Game.prototype.win = function () {};
	Game.prototype.gameover = function () {};
	Game.prototype.toPixelPos = function (gridPos) {
		return gridPos*30;
	};
	Game.prototype.toGridPos = function (pixelPos) {
		return ((pixelPos % 30)/30);
	};
    
    return Game;

});