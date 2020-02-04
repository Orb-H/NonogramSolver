var created = false;

function create_board() {
    var col_cond = document.getElementById('col_cond');
    var row_cond = document.getElementById('row_cond');
    var board = document.getElementById('board');
    if (created) {
        created = false;

        // Initialize board
        col_cond.innerHTML = "";
        row_cond.innerHTML = "";
        board.innerHTML = "";
    }

    var row = parseInt(document.getElementById('num_row').value, 10);
    var row_max = parseInt(document.getElementById('num_row_max').value, 10);
    var col = parseInt(document.getElementById('num_col').value, 10);
    var col_max = parseInt(document.getElementById('num_col_max').value, 10);
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
    for (i = 0; i < row; i++) {
        var new_row = board.insertRow(-1);
        for (j = 0; j < col; j++) {
            var new_cell = new_row.insertCell(-1);
            new_cell.width = 20;
            new_cell.height = 20;
        }
    }

    created = true;
}