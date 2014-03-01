//PLAYER CLASS
function Player(name){

	this.name = name;
	this.finalScore = 0;
	this.scoresForEachFrame = [];

}

//FRAME CLASS
function Frame(indexNumber){

	this.indexNumber = indexNumber;
	this.ball1Score = 0;
	this.ball2Score = 0;
	this.isSpare = false;
	this.isStrike = false;
	this.score;

}

Frame.prototype.start = function(players){
	
	var that = this;
	
	for(var i = 0; i < players.length; i++){

		that.ball1Score = parseInt(prompt(players[i].name + ' frame  ' + (that.indexNumber + 1) + ', ball1 score:' ), 10);

		//check if it is a strike
		if(that.ball1Score === 10){

			that.isStrike = true;
			that.score = that.ball1Score + that.ball2Score;
			alert('STRIKE');

		}else{

			that.ball2Score = parseInt(prompt(players[i].name + ' frame ' + (that.indexNumber + 1) + 'ball2 score:' ),10);
			
			//if it is not a strike nor a spare
			if( (that.ball1Score + that.ball2Score) > 10 ){

				that.score = that.ball1Score + that.ball2Score;
				alert(that.score);

			//if it is a spare
			}else if( (that.ball1Score + that.ball2Score) === 10){

				that.isSpare = true;
				that.score = that.ball1Score + that.ball2Score;
				alert('SPARE');

			}

		}

	}
}

//GAME CLASS
function Game(players){

	this.players = players;
	this.frames = []; //array to keep the frame objects
	this.currentFrame = 0; //initialze the frame count

}

Game.prototype.start = function(){

	this.nextFrame();
	
};

Game.prototype.nextFrame = function(){
	
	var that = this;
	var frame = new Frame(this.currentFrame);
	frame.start(this.players);
	
	//check if the past frame was a strike
	if(this.currentFrame > 0 && this.frames[this.currentFrame - 1].isStrike){

		that.frames[this.currentFrame - 1].score += frame.score; // add the new score to last frame's score

	//check if the past frame was a spare
	}else if(this.currentFrame > 0 && this.frames[this.currentFrame - 1].isSpare){ 

		that.frames[this.currentFrame - 1].score += frame.ball1Score; // add the new ball1score to last frame's score

	//when the past frame is neither a strike nor a spare
	}else{


	}
	
	this.frames.push(frame);
	

	if(this.currentFrame < 10){
		that.currentFrame++;
		that.nextFrame();
		
	}
	
	

};


window.onload = function(){
	
	var numberOfPlayers = 0;
	var players = []; // an array to keep the player objects

	//get the number of players
	numberOfPlayers = prompt('Please Enter the Number Players');
	
	//check if the input is a number and it is not bigger than 6
	if(isNaN(numberOfPlayers) || numberOfPlayers > 6){

		numberOfPlayers = prompt('Invalid Number of Players - Max Number is 6');

	}

	//get the names for the players
	for(var i = 0; i < numberOfPlayers; i++){
		
		var name = prompt('Enter Player '+ (i+1) + "'s Name:");
		players[i] = new Player(name);

	}

	// create a new game and start it
	var game = new Game(players);
	game.start();
	
};