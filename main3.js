//Player Class
function Player(name){

	this.name = name;
	this.balls = [];
	this.frames = [];
	this.finalScore = 0;

}

Player.prototype.calculateScore = function(){

	var that = this;
	that.finalScore = 0;
	for(var i = 0; i < this.frames.length; i++){

		that.finalScore += this.frames[i].score;
		
	}

	console.log(this.finalScore);

};
//Ball Class
function Ball(score){
	
	this.score = score;
	this.indexNumber = 0;

}

//Frame Class
function Frame(indexNumber){
	
	this.indexNumber = 0;
	this.isSpare = false;
	this.isStrike = false;
	this.score = 0;
}

//Game Class
function Game(players){

	this.players = players; //array that holds player objects
	this.currentFrame = 0;

}

Game.prototype.start = function(){

	this.nextFrame();

}

Game.prototype.nextFrame = function(){
	
	var that = this;
	

	//loop through the players and get scores
	for(var i = 0; i < this.players.length; i++){

		var frame = new Frame(that.currentFrame); // create a new Frame
		var ball1 = new Ball(); //create a new ball
		var message = that.players[i].name + "'s turn - Frame " + (that.currentFrame + 1) + " - Ball 1"; //prepare the message
		ball1.score = parseInt(prompt(message)); // get the score for ball 1
		frame.balls[0] = ball1; //set the first ball in frame
		
		//check the score for strike - spare or normal
		if(ball1.score === 10){

			console.log('STRIKE');
			frame.isStrike = true;

		}else{

			var ball2 = new Ball();
			var message = that.players[i].name + "'s turn - Frame " + (that.currentFrame + 1) + " - Ball 2";
			ball2.score = parseInt(prompt(message));
			frame.balls[1] = ball2;
			that.players[i].balls.push(ball1,ball2);

			if( (ball1.score + ball2.score) === 10 ){

				console.log('SPARE');
				frame.isSpare = true;

			
			}else{

				frame.score = ball1.score + ball2.score;
				that.players[i].finalScore += frame.score; //set the score
				
				
			}

		}
		
		that.players[i].frames.push(frame); // push the frame to the frames array in the player object
		that.players[i].calculateScore();

	}
	

	//runs 10 times
	if(this.currentFrame < 1){

		that.currentFrame++;
		that.nextFrame();

	}

	
}

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