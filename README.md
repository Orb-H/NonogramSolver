<script src="./solver.js"></script>
<script src="./board.js"></script>
<link rel="stylesheet" href="./style.css" />

# Nonogram Solver(WIP)

### Size

|                    Row                     |                 Max Row Number                 |                   Column                   |                 Max Col Number                 |
| :----------------------------------------: | :--------------------------------------------: | :----------------------------------------: | :--------------------------------------------: |
| <input id="num_row" style="width:100px" /> | <input id="num_row_max" style="width:100px" /> | <input id="num_col" style="width:100px" /> | <input id="num_col_max" style="width:100px" /> |

<button id="create" onclick="create_board()">Create</button>

### Board

<table id="game_board"></table>
<button id="solve_i" onclick="solve_board(show)">Solve Immediately</button><br /><button id="solve_v" onclick="solve_board(visualize)">Solve Cell-by-cell</button><br /><button id="clear" onclick="clear()">Clear</button>
