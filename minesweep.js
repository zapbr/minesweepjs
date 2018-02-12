import Cell from './Cell.js';
import {Array2D} from './Utils.js';

const canvas = document.getElementById('board');
const context = canvas.getContext('2d');

let w = 40;
let rows = Math.floor(canvas.height/w);
let cols = Math.floor(canvas.width/w);
let grid;
let bombs = 10;
let cells = [];

function init()
{
	// start the board
	grid = Array2D(rows, cols);

	for( let r = 0; r < grid.length; ++r ){
		for( let c = 0; c < grid[r].length; ++c){
			// grid[r][c] = new Cell((r*w)+1, (c*w)+1, w-1);
			grid[r][c] = new Cell(r, c, w);
			cells.push([r,c]);
		}
	}

	// make the bombs
	let cells_aux = cells.slice(); // DUPLICATE THIS COUSE I NEED IT LATTER
	for (var i = bombs - 1; i >= 0; --i) {
		let pos = Math.floor(Math.random()*cells_aux.length);
		grid[cells_aux[pos][0]][cells_aux[pos][1]].bomb = true;
		cells_aux.splice(pos, 1);
	}

	//calculate the bombs proximity
	cells.forEach( cell => {
		grid[cell[0]][cell[1]].calculateProximity(grid);
	});
	update();
}


function update()
{
	// UPDATE BOARD
	// CLEAN BOARD
	context.fillStyle = '#333';
	context.fillRect(0, 0, canvas.width, canvas.height);

	// DRAW CELL
	grid.forEach( row => {
		row.forEach ( cell => {
			cell.show(context);
		});
	});

	requestAnimationFrame(update); // LOOP
}

canvas.addEventListener('mousedown', event => {

	let x = event.x;
	let y = event.y;
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;

	cells.forEach( cell => {

		let cxi = cell[0] * w;
		let cyi = cell[1] * w;
		let cxe = cxi + w;
		let cye = cyi + w;

		if( x > cxi && x < cxe && y > cyi && y < cye )
		{
			reveal(grid[cell[0]][cell[1]])
		}

	});
}, false);

function reveal (cell) {
	cell.visible = true;
	if( cell.distance === 0 )
	{
		revealcascade(cell);
	}
}

function revealcascade (cell) {
	for (let xoff = -1; xoff <= 1; xoff++)
	{
    	let i = cell.x + xoff;
    	if (i < 0 || i >= grid.length ) continue;
    	for (let yoff = -1; yoff <= 1; yoff++)
    	{
      		let j = cell.y + yoff;
      		if (j < 0 || j >= grid[0].length) continue;
      		let neighbor = grid[i][j];
      		if (!neighbor.visible) {
        		reveal(neighbor);
      		}
    	}
  	}
}


// ---- START
init();