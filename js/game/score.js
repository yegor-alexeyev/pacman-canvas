function Score() {
	this.score = 0;
	this.set = function(i) {
		this.score = i;
	}
	this.add = function(i) {
		this.score += i;
	}
	this.refresh = function(h) {
		$(h).html("Score: "+this.score);
	}
	
}

