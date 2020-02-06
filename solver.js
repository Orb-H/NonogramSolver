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
    console.log(JSON.stringify(board));

    // check empty horizontal line(exception for number 0)
    for (i = 0; i < size_row; i++) {
        if (rows[i].length == 1 && rows[i][0] == 0) {
            for (j = 0; j < size_col; j++) {
                board[i][j] = -1;
                console.log("row " + i + " is empty.");
            }
        }
    }

    // check empty vertical line(exception for number 0)
    for (i = 0; i < size_col; i++) {
        if (columns[i].length == 1 && columns[i][0] == 0) {
            for (j = 0; j < size_row; j++) {
                board[j][i] = -1;
                console.log("column " + i + " is empty.");
            }
        }
    }

    // TEST board state
    console.log(JSON.stringify(board));
}