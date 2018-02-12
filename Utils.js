

export function Array2D (rows, cols) {
	let _array = new Array(rows);

	for (var i = 0; i < _array.length; i++) {
		_array[i] = new Array(cols);
	}
	return _array;
}