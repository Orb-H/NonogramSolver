function solve(size, rows, columns) {
    var size_row = size[0];
    var size_col = size[1];

    // init board
    var board = [];
    for (var i = 0; i < size_row; i++) {
        var arr = [];
        for (j = 0; j < size_col; j++) {
            arr.push(0);
        }
        board.push(arr);
    }
    // console.log("board(init): " + JSON.stringify(board));

    // check empty horizontal line(exception for number 0)
    for (var i = 0; i < size_row; i++) {
        if (rows[i].length === 1 && rows[i][0] === 0) {
            for (j = 0; j < size_col; j++) {
                board[i][j] = -1;
                // console.log("row " + i + " is empty.");
            }
        }
    }

    // check empty vertical line(exception for number 0)
    for (var i = 0; i < size_col; i++) {
        if (columns[i].length === 1 && columns[i][0] === 0) {
            for (j = 0; j < size_row; j++) {
                board[j][i] = -1;
                // console.log("column " + i + " is empty.");
            }
        }
    }

    // TEST board state
    // console.log("board(empty): " + JSON.stringify(board));

    // iterate for all horizontal/vertical lines
    var change = -1;
    var result = [];
    while (change !== 0) {
        change = 0;

        // iterate through horizontal lines
        for (var i = 0; i < size_row; i++) {
            // console.log("Row " + i);
            var res = check_line(rows[i], board[i]);
            change = change + res.length;
            for (r = 0; r < res.length; r++) {
                result.push([
                    [i, res[r][0]], res[r][1]
                ]);
                // console.log("Set (" + i + ", " + res[r][0] + ") as " + res[r][1]);
                board[i][res[r][0]] = res[r][1];
            }
        }

        // iterate through vertical lines
        for (var i = 0; i < size_col; i++) {
            var arr = [];
            for (j = 0; j < size_row; j++) {
                arr.push(board[j][i]);
            }
            // console.log("Column " + i);
            var res = check_line(columns[i], arr);
            change = change + res.length;
            for (r = 0; r < res.length; r++) {
                result.push([
                    [res[r][0], i], res[r][1]
                ]);
                board[res[r][0]][i] = res[r][1];
            }
        }

        // console.log("temp result: " + JSON.stringify(result));
        // prompt(''); // DEBUG
    }
    return result;
}

function check_line(line_nums, line_onboard) {
    var indices = []; // starting index of each block
    var limit = []; // right limit of each block
    var length = line_onboard.length; // length of one line
    for (var i = 0; i < line_nums.length; i++) {
        indices.push(0);
        limit.push(0);
    }

    // set indices
    indices[0] = 0;
    for (i = 1; i < line_nums.length; i++) {
        indices[i] = indices[i - 1] + line_nums[i - 1] + 1;
    }
    // console.log("index: " + JSON.stringify(indices));

    // set limit of indices
    limit[line_nums.length - 1] = length - line_nums[line_nums.length - 1];
    for (i = line_nums.length - 2; i >= 0; i--) {
        limit[i] = limit[i + 1] - line_nums[i] - 1;
    }
    // console.log("limit: " + JSON.stringify(limit));

    // array for result
    var line_res = [];
    var flag = true;
    for (var i = 0; i < length; i++) {
        line_res.push(-2);
    }
    while (flag) {
        // set flag as false if current state is last possible state
        if (indices[0] >= limit[0]) {
            flag = false;
        }

        // temporary array for checking condition
        var temp_line = [];
        for (var i = 0; i < line_onboard.length; i++) {
            temp_line.push(-1);
        }

        // fill temporary array
        for (var i = 0; i < indices.length; i++) {
            for (j = 0; j < line_nums[i]; j++) {
                temp_line[indices[i] + j] = 1;
            }
        }
        // console.log("1: " + JSON.stringify(temp_line));

        // check if there is conflict with current board state
        var valid = true;
        for (var i = 0; i < length; i++) {
            if ((temp_line[i] * line_onboard[i]) === -1) {
                valid = false;
                break;
            }
        }
        // console.log("2: " + valid);

        // if no conflict, mark as available case
        if (valid) {
            for (var i = 0; i < length; i++) {
                if (line_res[i] === -2) {
                    line_res[i] = temp_line[i];
                } else {
                    if ((line_res[i] + temp_line[i]) === 0) {
                        line_res[i] = 0;
                    }
                }
            }
        }
        // console.log("3: " + JSON.stringify(line_res));

        // change indices to next state
        for (i = line_nums.length - 1; i >= 0; i--) {
            if (indices[i] < limit[i]) {
                indices[i] = indices[i] + 1;
                for (j = i + 1; j < line_nums.length; j++) {
                    indices[j] = indices[j - 1] + line_nums[j - 1] + 1;
                }
                break;
            }
        }
        // console.log("4: " + JSON.stringify(indices));
        // prompt('');
    }

    // return position to fill or erase or throw error
    var result = [];
    for (var i = 0; i < length; i++) {
        if (line_onboard[i] === 0 && line_res[i] !== 0 && line_res[i] !== -2) {
            result.push([i, line_res[i]]);
        }
    }
    // console.log("res: " + JSON.stringify(result));
    return result;
}