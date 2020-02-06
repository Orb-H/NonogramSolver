function solve(size, rows, columns) {
    var size_row = size[0];
    var size_col = size[1];

    // init board
    var board = [];
    for (i = 0; i < size_row; i++) {
        var arr = [];
        for (j = 0; j < size_col; j++) {
            arr.push(0);
        }
        board.push(arr);
    }
    alert(JSON.stringify(board));
}