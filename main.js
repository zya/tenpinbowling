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

			//its the last frame which in any case will be calculated by adding the three - if all are not strikes will be added by 0
			that.frames[i].score = that.frames[i].ball1 + that.frames[i].ball2 + that.frames[i].ball3;
			that.score += that.frames[i].score;
			
		}
		

	}

};


//Ball Class
function Ball(){

	this.score = 0;

}

//Frame Class
function Frame(){

	this.ball1 = 0;
	this.ball2 = 0;
	this.score = 0;
	this.isStrike = false;
	this.isSpare = false;
	this.isLastFrame = false;

}

Frame.prototype.lastFrame = function(){

	this.isLastFrame = true;
	this.ball3 = 0;

};


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