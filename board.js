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
            new_cell.width = 20;
            new_cell.height = 20;

            if (i < col_max) {
                if (j >= row_max) {
                    new_cell.innerHTML = "<input id='col_cond_" + i + "_" + (j - row_max) + "' style='width:20px' />";
                }
            } else {
                if (j < row_max) {
                    new_cell.innerHTML = "<input id='row_cond_" + (i - col_max) + "_" + j + "' style='width:20px' />";
                }
            }
        }
    }

    created = true;
}