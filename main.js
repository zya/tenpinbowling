//PLAYER CLASS
function Player(name){

	var that = this;
	this.name = name; //set the name
	this.numberOfFrames = 10;
	this.frames = []; // array to store the frame objects
	this.score = 0; // score

	//create the frames array - and populate it with zeros
	for(var i = 0; i < this.numberOfFrames; i++){

		if(i < 9){

			that.frames[i] = new Frame();

		}else{
			
			//lastframe
			that.frames[i] = new Frame();
			that.frames[i].lastFrame();

		}

	}


}

//function that gets the input and sets the frame
Player.prototype.getScore = function(currentFrame){

	var that = this;

	var message = this.name + "'s turn - Frame " + (currentFrame + 1) + " - Ball 1"; //prepare the message
	this.frames[currentFrame].ball1 = parseInt(prompt(message));

	//check if it is strike
	if(this.frames[currentFrame].ball1 === 10){

		that.frames[currentFrame].isStrike = true;
		console.log('STRIKE');

	}else{

		message = this.name + "'s turn - Frame " + (currentFrame + 1) + " - Ball 2"; //prepare the message
		that.frames[currentFrame].ball2 = parseInt(prompt(message));

		//check if its a spare
		if( (that.frames[currentFrame].ball1 + that.frames[currentFrame].ball2) === 10 ){

			that.frames[currentFrame].isSpare = true;
			console.log('SPARE');

		}else{
			//its neighter a spare nor a strike
			//you can check for a miss

		}

	}

};

//a function for the last frame
Player.prototype.getLastFrameScore = function(currentFrame){

	var that = this;

	var message = this.name + "'s turn - Frame " + (currentFrame + 1) + " - Ball 1"; //prepare the message
	this.frames[currentFrame].ball1 = parseInt(prompt(message));

	//check if it is strike
	if(this.frames[currentFrame].ball1 === 10){

		//that.frames[currentFrame].isStrike = true;
		console.log('STRIKE + 2 Bonus Shots');
		//get two bonus balls
		message = this.name + "'s turn - Frame " + (currentFrame + 1) + " - Ball 2 - Bonus"; //prepare the message
		that.frames[currentFrame].ball2 = parseInt(prompt(message));
		message = this.name + "'s turn - Frame " + (currentFrame + 1) + " - Ball 3 - Bonus"; //prepare the message
		that.frames[currentFrame].ball3 = parseInt(prompt(message));

	}else{

		message = this.name + "'s turn - Frame " + (currentFrame + 1) + " - Ball 2"; //prepare the message
		that.frames[currentFrame].ball2 = parseInt(prompt(message));

		//check if its a spare
		if( (that.frames[currentFrame].ball1 + that.frames[currentFrame].ball2) === 10 ){

			//that.frames[currentFrame].isSpare = true;
			console.log('SPARE');

		}else{
			//its neighter a spare nor a strike
			//you can check for a miss

		}

	}

};

//function that calculates the score for each player
Player.prototype.calculateScore = function(){

	this.score = 0; //reset the score
	var that = this;
	for(var i = 0; i < this.frames.length; i++){

		if(!that.frames[i].isLastFrame){

			//checks if current frame is a strike
			if(that.frames[i].isStrike){

				//checks if the next frame is also a strike
				if(that.frames[i+1].isStrike){

					//calculates the score by adding the score of next two balls
					that.frames[i].score = that.frames[i].ball1 + that.frames[i+1].ball1 + that.frames[i+2].ball1;
					that.score += that.frames[i].score;

				}else{
					
					//calculates the score by adding the score of next two balls
					that.frames[i].score = that.frames[i].ball1 + that.frames[i+1].ball1 + that.frames[i+1].ball2;
					that.score += that.frames[i].score;

				}
				
			//check if the current frame is a spare
			}else if(that.frames[i].isSpare){

				//calculate the score by adding the score of the next one ball
				that.frames[i].score = that.frames[i].ball1 + that.frames[i].ball2 + that.frames[i+1].ball1;
				that.score += that.frames[i].score;

			}else{

				//calculate the score by just adding the two balls
				that.frames[i].score = that.frames[i].ball1 + that.frames[i].ball2;
				that.score += that.frames[i].score;

			}

			
		}else{

			console.log('its lat frame in calculation');
			//its the last frame which in any case will be calculated by adding the three - if all are not strikes will be added by 0
			that.frames[i].score = that.frames[i].ball1 + that.frames[i].ball2 + that.frames[i].ball3;
			that.score += that.frames[i].score;
			
		}
		

	}

};


//FRAME CLASS
function Frame(){

	this.ball1 = 0;
	this.ball2 = 0;
	this.score = 0;
	this.isStrike = false;
	this.isSpare = false;
	this.isLastFrame = false;

}

//function that sets the frame as the last frame and adds another ball slot
Frame.prototype.lastFrame = function(){

	this.isLastFrame = true;
	this.ball3 = 0;

};

//GAME CLASS
function Game(players){

	this.players = players;
	this.currentFrame = 0;

}

//start method which repeates itself till the game is over
Game.prototype.start = function(){
	var that = this;
	
	if(this.currentFrame < 9){

		//loop through and get the score for each player and each round
		for(var i = 0; i < this.players.length; i++){

			that.players[i].getScore(that.currentFrame); //get the score
			that.players[i].calculateScore();

		}

		//iterate the current frame
		that.currentFrame++
		that.start(); //loop

	}else{
		//its the last frame
		//run the special getter function
		
		//loop through and get the score for each player and each round
		for(var i = 0; i < this.players.length; i++){

			that.players[i].frames[that.currentFrame].lastFrame(); // sets is Last Frame
			console.log(that.players[i].frames[that.currentFrame]);
			that.players[i].getLastFrameScore(that.currentFrame); //get the score
			that.players[i].calculateScore();

		}
		console.log(that.players);
		that.finish();
	}
};

Game.prototype.finish = function(){

	//game finished - print the score board
	console.log('finished');
};


/*
var player = new Player('Ehsan');

for(var i = 0; i < player.frames.length; i++){

	if(player.frames[i].isLastFrame){
		
		player.frames[i].ball1 = 10;
		player.frames[i].ball2 = 10;
		player.frames[i].ball3 = 10;
		

	}else{

		player.frames[i].ball1 = 10;
		player.frames[i].isStrike = true;

	}
	
}

player.calculateScore();
console.log(player.frames);
console.log(player.score);
*/



window.onload = function(){

	var players = [];
	var numberOfPlayers = parseInt(prompt('Please Enter the Number Players'));

	for(var i = 0; i < numberOfPlayers; i++){

		var name = prompt('Enter Player '+ (i+1) + "'s Name:");
		players[i] = new Player(name);

	}

	var game = new Game(players);
	game.start();
	console.log(players);


};