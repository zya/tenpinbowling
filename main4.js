function Player(name){

	this.name = name;
	//this.balls = [];
	this.frames = [];
	this.score = 0;

}



Player.prototype.getScore = function(frameNumber){

	var that = this;
	var frame = new Frame();
	var message = this.name + "'s turn - Frame " + (frameNumber + 1) + " - Ball 1"; //prepare the message
	var ball1 =  parseInt(prompt(message));
	
	
	if(ball1 === 10){

		frame.isStrike = true;

	}else{

		message = this.name + "'s turn - Frame " + (frameNumber + 1) + " - Ball 2"; //prepare the message
		ball2 = parseInt(prompt(message));

		if( (ball1 + ball2) === 10 ){

			frame.isSpare = true;

		}else{

			frame.score = ball1 + ball2;

		}

	}

	this.frames.push(frame);

};

function Frame(){

	this.balls = [];
	this.isSpare = false;
	this.isStrike = false;
	this.score = 0;

}


function Game(players){

	this.players = players;
	this.currentFrame = 0;

}

Game.prototype.start = function(){
	var that = this;

	for(var i = 0; i < this.players.length; i++){

		



		this.players[i].calculateScore();

	};


	//iterate the current frame
	this.currentFrame++
	if(this.currentFrame < 10){

		that.start();
	}
};




//ONLOAD EVENT
window.onload = function(){
	
	//global variables
	var numberOfPlayers = 0;
	var players = []; // array that holds the player objects

	//get the number of players
	numberOfPlayers = prompt('Please Enter the Number Players');
	
	//check if the input is a number and it is not bigger than 6
	if(isNaN(numberOfPlayers) || numberOfPlayers > 6){

		numberOfPlayers = prompt('Invalid Number of Players - Max Number is 6');

	}
	//create players with names
	for(var i = 0; i < numberOfPlayers; i++){
		
		var name = prompt('Enter Player '+ (i+1) + "'s Name:");
		players[i] = new Player(name);

	}

	//create a new game and start the game
	var game = new Game(players);
	game.start();


};