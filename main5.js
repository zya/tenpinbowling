function Player(name){

	this.currentBall = 0;
	this.name = name;
	this.balls = [];
	this.frames = [];
	this.score = 0;

}

Player.prototype.play = function(currentFrame){

	var that = this;
	var frame = new Frame();
	var ball1 = new Ball();
	
	var message = this.name + "'s turn - Frame " + (currentFrame + 1) + " - Ball 1"; //prepare the message
	ball1.score = parseInt(prompt(message));
	this.balls[this.currentBall] = ball1;
	frame.balls[0] = ball1;

	if(ball1.score === 10){

		frame.isStrike = true;

	}else{

		var ball2 = new Ball();
		message = this.name + "'s turn - Frame " + (currentFrame + 1) + " - Ball 2"; //prepare the message
		ball2.score = parseInt(prompt(message));

		if( (ball1.score + ball2.score) === 10 ){

			frame.isSpare = true;

		}else{

			frame.score = ball1.score + ball2.score;

		}

		that.balls[1] = ball2;
		frame.balls[1] = ball2;

	}


	this.frames[currentFrame] = frame;
	this.currentBall++;

};

Player.prototype.calculateScore = function(){

	var that = this;
	
	this.score = 0;

	for(var i = 0; i < this.frames.length; i++){

		that.score += this.frames[i].score;

	}

	console.log(this.score);

};

function Ball(){

	this.score = 0;

}

function Frame(){

	this.balls = [];
	this.score = 0;
	this.isSpare = false;
	this.isStrike = false;

}

function Game(players){

	this.players = players;
	this.currentFrame = 0;

}

Game.prototype.start = function(){

	var that = this;
	for(var i = 0; i < this.players.length; i++){

		that.players[i].play(that.currentFrame);
		
		if(that.currentFrame > 0 && that.players[i].frames[that.currentFrame - 1].isSpare){

			//that.players[i].frames[that.currentFrame - 1].score = 

		}
		
		that.players[i].calculateScore();

	}
	
	//iterate the current frame
	this.currentFrame++
	if(this.currentFrame < 2){
		that.start();
	}

};

window.onload = function(){

	var players = [];
	var numberOfPlayers = prompt('Please Enter the Number Players');

	for(var i = 0; i < numberOfPlayers; i++){

		var name = prompt('Enter Player '+ (i+1) + "'s Name:");
		players[i] = new Player(name);

	}

	var game = new Game(players);
	game.start();
};