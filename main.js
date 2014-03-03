//PLAYER CLASS
function Player(name){

	var that = this; //for handling scope issues
	this.name = name; //set the name
	this.numberOfFrames = 10;
	this.frames = []; // array to store the frame objects
	this.score = 0; // score

	//create the frames array - and populate it with zeros
	for(var i = 0; i < this.numberOfFrames; i++){

		if(i < 9){

			that.frames[i] = new Frame();

		//10th frame is a unique type for frame with one extra slot - for possible bonus shots
		}else{

			//lastframe
			that.frames[i] = new Frame();
			that.frames[i].lastFrame();

		}

	}

}

//function that gets the input and sets the frame
Player.prototype.getScore = function(currentFrame){

	var that = this; //for handling scope issues

	var message = this.name + "'s turn - Frame " + (currentFrame + 1) + " - Ball 1"; //prepare the message
	this.frames[currentFrame].ball1 = parseInt(prompt(message),10); //get the ball1 score

	//check if it is strike
	if(this.frames[currentFrame].ball1 === 10){

		that.frames[currentFrame].isStrike = true; //set strike to true
		console.log('STRIKE');

	}else{

		message = this.name + "'s turn - Frame " + (currentFrame + 1) + " - Ball 2"; //prepare the message
		that.frames[currentFrame].ball2 = parseInt(prompt(message),10);

		//check if its a spare
		if( (that.frames[currentFrame].ball1 + that.frames[currentFrame].ball2) === 10 ){

			that.frames[currentFrame].isSpare = true; //set spare to true
			console.log('SPARE');

		}else{
			
			//its neighter a spare nor a strike
			//you can check for a miss
			if( (that.frames[currentFrame].ball1 + that.frames[currentFrame].ball2) === 0){

				console.log('Missed both balls - OPEN FRAME');

			}

		}

	}

};

//a function for the last frame
Player.prototype.getLastFrameScore = function(currentFrame){

	var that = this;

	var message = this.name + "'s turn - Frame " + (currentFrame + 1) + " - Ball 1"; //prepare the message
	this.frames[currentFrame].ball1 = parseInt(prompt(message),10);

	//check if it is strike
	if(this.frames[currentFrame].ball1 === 10){

		console.log('STRIKE + 2 Bonus Shots');
		//get two bonus balls
		message = this.name + "'s turn - Frame " + (currentFrame + 1) + " - Ball 2 - Bonus"; //prepare the message
		that.frames[currentFrame].ball2 = parseInt(prompt(message),10);
		message = this.name + "'s turn - Frame " + (currentFrame + 1) + " - Ball 3 - Bonus"; //prepare the message
		that.frames[currentFrame].ball3 = parseInt(prompt(message),10);

		//check for striking out condition
		if( that.frames[currentFrame].ball2 === 10 && that.frames[currentFrame].ball1 === 10 ){

			console.log('Striking OUT');

		}

	}else{

		message = this.name + "'s turn - Frame " + (currentFrame + 1) + " - Ball 2"; //prepare the message
		that.frames[currentFrame].ball2 = parseInt(prompt(message),10);

		//check if its a spare
		if( (that.frames[currentFrame].ball1 + that.frames[currentFrame].ball2) === 10 ){

			// if it is spare give a bonus of one extra ball
			console.log('SPARE');
			message = this.name + "'s turn - Frame " + (currentFrame + 1) + " - Ball 3 - Bonus"; //prepare the message
			that.frames[currentFrame].ball3 = parseInt(prompt(message),10);

		}else{
			
			//its neighter a spare nor a strike
			//you can check for a miss
			if( (that.frames[currentFrame].ball1 + that.frames[currentFrame].ball2) === 0){

				console.log('OPEN FRAME');

			}

		}

	}

};

//function that calculates the score for each player
Player.prototype.calculateScore = function(){

	this.score = 0; //reset the score
	var that = this;
	for(var i = 0; i < this.frames.length; i++){

		//check if the current frame is last or not
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

			//its the last frame which in any case will be calculated by adding the three - if all are not strikes will be added by 0
			that.frames[i].score = that.frames[i].ball1 + that.frames[i].ball2 + that.frames[i].ball3;
			that.score += that.frames[i].score;
			
		}
		

	}

};


//FRAME CLASS
function Frame(){

	this.ball1 = 0; //first ball for the frame
	this.ball2 = 0; //second ball for the frame
	this.score = 0; //the final score for each frame
	this.isStrike = false; 
	this.isSpare = false;
	this.isLastFrame = false; //to check if it is the last frame or not

}

//function that sets the frame as the last frame and adds another ball slot
Frame.prototype.lastFrame = function(){

	//adds a third ball to the last frame
	this.isLastFrame = true;
	this.ball3 = 0; //add a third slot for possible bonus

};

//GAME CLASS
function Game(players){

	this.players = players; //an array of players
	this.currentFrame = 0; //to keep track of the current frame
	this.scoreBoard = []; // and array to hold the scoreboard
	
}

//start method which repeates itself till the game is over
Game.prototype.start = function(){
	var that = this;
	
	//if it is not the last frame
	if(this.currentFrame < 9){

		//loop through and get the score for each player and each round
		for(var i = 0; i < this.players.length; i++){

			that.players[i].getScore(that.currentFrame); //get the score
			that.players[i].calculateScore(); //calculate the overall score

		}

		//iterate the current frame
		that.currentFrame++;
		that.start(); //loop

	}else{
		
		//its the last frame
		//run the special getter function
		//loop through and get the score for each player and each round
		for(var j = 0; j < this.players.length; j++){

			that.players[j].frames[that.currentFrame].lastFrame(); // sets is Last Frame
			that.players[j].getLastFrameScore(that.currentFrame); //get the score
			that.players[j].calculateScore(); // calculate the score

			//check for perfect game condition
			if(that.players[j].score === 300){

				console.log('PERFECT GAME');

			}

		}

		that.finish(); //finish the game
	}
};

Game.prototype.finish = function(){

	//game finished - print the score board
	console.log('finished');
	this.printScoreBoard();

};

//generates and pritns a scoreboard
Game.prototype.printScoreBoard = function(){

	var that = this;

	for(var i = 0; i < this.players.length; i++){

		//create the slot in the scoreboard
		//each slot is a an object that has name and scores for each frame and the final score
		that.scoreBoard[i] = {
			name: that.players[i].name,
			frame_1: that.players[i].frames[0].score,
			frame_2: that.players[i].frames[1].score,
			frame_3: that.players[i].frames[2].score,
			frame_4: that.players[i].frames[3].score,
			frame_5: that.players[i].frames[4].score,
			frame_6: that.players[i].frames[5].score,
			frame_7: that.players[i].frames[6].score,
			frame_8: that.players[i].frames[7].score,
			frame_9: that.players[i].frames[8].score,
			frame_10: that.players[i].frames[9].score,
			score: that.players[i].score
		};
	}

	//use console.table for nice presentation of the score board
	console.log(this.scoreBoard);
	console.table(this.scoreBoard);

};


//Onload Event
window.onload = function(){

	var players = []; //array to hold player objects
	var numberOfPlayers = parseInt(prompt('Please Enter the Number Players'),10); //get the number of players

	//check if itsa valid entry
	if(numberOfPlayers > 6 || numberOfPlayers <= 0 || isNaN(numberOfPlayers)){

		numberOfPlayers = parseInt(prompt('Max number of players is 6, Please Enter a Valid Number Between 1 and 6'),10);

	}

	//create new instances of Player class and set the name
	for(var i = 0; i < numberOfPlayers; i++){

		var name = prompt('Enter Player '+ (i+1) + "'s Name:");
		players[i] = new Player(name);

	}

	//create a new Game object 
	var game = new Game(players);
	game.start(); //start the game

};