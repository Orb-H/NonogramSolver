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

    // alert(row + ' ' + row_max + ' ' + col + ' ' + col_max);

    if (row < (2 * row_max - 1) || col < (2 * col_max - 1)) {
        // error if board creation condition doesn't match
        alert('board cannot be created');
        return;
    }

    // create board
    for (i = 0; i < row + 1; i++) {
        var new_row = board.insertRow(-1);
        for (j = 0; j < col + 1; j++) {
            var new_cell = new_row.insertCell(-1);
            new_cell.classList.add('cell');

            if (i == 0) {
                if (j > 0) {
                    new_cell.innerHTML = '<textarea class="col_cond" id="col_cond_' + (j - 1) + '" style="width:20px" rows="' + col_max + '" />';
                }
            } else if (j == 0) {
                new_cell.innerHTML = '<textarea class="row_cond" id="row_cond_' + (i - 1) + '" style="height:20px" cols="' + row_max + '" />';
            } else {
                new_cell.id = 'board_' + (i - 1) + '_' + (j - 1);
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
        // condition as string + whitespace
        var t = document.getElementById('row_cond_' + i).value;
        var arr = t.split(/\s+/)
        for (var j = 0; j < arr.length; j++) {
            arr[j] = parseInt(arr[j]);
        }

        // remove 0s and negative numbers
        for (var j = 0; j < arr.length; j++) {
            if (isNaN(arr[j])) {
                alert('format error');
                return;
            }
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
        // condition as string + whitespace
        var t = document.getElementById('col_cond_' + i).value;
        var arr = t.split(/\s+/);
        for (var j = 0; j < arr.length; j++) {
            arr[j] = parseInt(arr[j]);
        }

        // remove 0s and negative numbers
        for (var j = 0; j < arr.length; j++) {
            if (isNaN(arr[j])) {
                alert('format error');
                return;
            }
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

function clear_board() {
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            var cell = document.getElementById('board_' + i + '_' + j);
            cell.innerHTML = '';
        }
    }
}