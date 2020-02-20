var created = false;
var row = NaN;
var row_max = NaN;
var col = NaN;
var col_max = NaN;

function create_board() {
    var board = document.getElementById('game_board');
    if (created) {
        created = false;

        // Initialize board
        board.innerHTML = "";
    }

    row = parseInt(document.getElementById('num_row').value, 10);
    row_max = parseInt(document.getElementById('num_row_max').value, 10);
    col = parseInt(document.getElementById('num_col').value, 10);
    col_max = parseInt(document.getElementById('num_col_max').value, 10);
    if (isNaN(row) || isNaN(row_max) || isNaN(col) || isNaN(col_max)) {
        // error if non-number exist
        alert('format error');
        return;
    }

    alert(row + ' ' + row_max + ' ' + col + ' ' + col_max);

    if (row < (2 * row_max - 1) || col < (2 * col_max - 1)) {
        // error if board creation condition doesn't match
        alert('board cannot be created');
        return;
    }

    // create board
    for (i = 0; i < row + col_max; i++) {
        var new_row = board.insertRow(-1);
        for (j = 0; j < col + row_max; j++) {
            var new_cell = new_row.insertCell(-1);
            new_cell.classList.add('cell');

            if (i < col_max) {
                if (j >= row_max) {
                    new_cell.innerHTML = '<input id="col_cond_' + i + '_' + (j - row_max) + '" style="width:20px" />';
                }
            } else if (j < row_max) {
                new_cell.innerHTML = '<input id="row_cond_' + (i - col_max) + '_' + j + '" style="width:20px" />';
            } else {
                new_cell.id = 'board_' + (i - col_max) + '_' + (j - row_max);
            }
        }
    }

    created = true;
}

function solve_board(handler) {
    if (isNaN(row) || isNaN(row_max) || isNaN(col) || isNaN(col_max)) {
        // error if non-number exist
        alert('format error');
        return;
    }

    // parameter for solve_v1()
    var s = [row, col];
    var r = [];
    var c = [];

    // get row condition
    for (var i = 0; i < row; i++) {
        var arr = [];
        // condition as array
        for (var j = 0; j < row_max; j++) {
            var t = document.getElementById('row_cond_' + i + '_' + j).value;
            if (t.length !== 0) {
                arr.push(parseInt(t, 10));
            }
        }

        // remove 0s and negative numbers
        for (var j = 0; j < arr.length; j++) {
            if (arr[j] <= 0) {
                arr.splice(j, 1);
            }
        }

        // if empty condition, set 0
        if (arr.length === 0) {
            arr.push(0);
        }

        r.push(arr);
    }

    // get column condition
    for (var i = 0; i < col; i++) {
        var arr = [];
        // condition as array
        for (var j = 0; j < col_max; j++) {
            var t = document.getElementById('col_cond_' + j + '_' + i).value;
            if (t.length !== 0) {
                arr.push(parseInt(t, 10));
            }
        }

        // remove 0s and negative numbers
        for (var j = 0; j < arr.length; j++) {
            if (arr[j] <= 0) {
                arr.splice(j, 1);
            }
        }

        // if empty condition, set 0
        if (arr.length === 0) {
            arr.push(0);
        }

        c.push(arr);
    }

    // solve problem
    var result = solve_v1(s, r, c);

    handler(result);
}

function show(res) {
    for (var i = 0; i < res.length; i++) {
        var cell = document.getElementById('board_' + res[i][0][0] + '_' + res[i][0][1]);
        if (res[i][1] === 1) {
            cell.innerHTML = '<img src="./block.png" width=20 height=20 />';
        } else if (res[i][1] === -1) {
            cell.innerHTML = '<img src="./cross.png" width=20 height=20 />';
        }
    }
}

function visualize(res, i = 0) {
    setTimeout(function () {
        var cell = document.getElementById('board_' + res[i][0][0] + '_' + res[i][0][1]);
        if (res[i][1] === 1) {
            cell.innerHTML = '<img src="./block.png" width=20 height=20 />';
        } else if (res[i][1] === -1) {
            cell.innerHTML = '<img src="./cross.png" width=20 height=20 />';
        }
        if (i < res.length - 1) {
            visualize(res, i + 1);
        }
    }, 50);
}

function clear() {
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            var cell = document.getElementById('board_' + i + '_' + j);
            cell.innerHTML = '';
        }
    }
}