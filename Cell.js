export default class Cell {
    constructor(x,y,w) {
    	this.x = x;
    	this.y = y;
    	this.w = w;
    	this.visible = false;
    	this.bomb = false;
    	this.distance = 0;
    }

    show (context) {

		context.fillStyle = '#666';
		context.fillRect( (this.x*this.w)+1, (this.y*this.w)+1, this.w-1, this.w-1); // couse is a square =P

    	if(this.visible){

			context.fillStyle = (this.bomb)? '#900' : '#ddd';
			context.fillRect( (this.x*this.w)+1, (this.y*this.w)+1, this.w-1, this.w-1); // couse is a square =P

			if(!this.bomb && this.distance > 0 ){
				context.font = "30px Arial";
				context.fillStyle = "#000";
				context.textAlign  = "center";
				context.textBaseline   = "middle";
		    	context.fillText(this.distance,(this.x*this.w)+(this.w/2), (this.y*this.w) + (this.w/2) );
	    	}
    	}
    }

    reval()
    {
    	this.visible = true;
    }


    calculateProximity(grid)
    {
    	let counter = 0;
    	for(let x = this.x-1; x <= this.x+1; ++x)
    	{
    		for(let y = this.y-1; y <= this.y+1; ++y)
    		{
    			if( x >= 0 && y >= 0 && x < grid.length && y < grid[0].length )
    			{
	    			if( grid[x][y].bomb )
	    			{
	    				counter++;
	    			}
    			}
    		}
    	}
    	this.distance = counter;
    }
}