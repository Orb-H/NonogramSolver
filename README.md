<script src="./board.js"></script>

# Nonogram Solver

### Size

|                    Row                     |                 Max Row Number                 |                   Column                   |                 Max Col Number                 |
| :----------------------------------------: | :--------------------------------------------: | :----------------------------------------: | :--------------------------------------------: |
| <input id="num_row" style="width:100px" /> | <input id="num_row_max" style="width:100px" /> | <input id="num_col" style="width:100px" /> | <input id="num_col_max" style="width:100px" /> |

<button id="create" onclick="create_board()">Create</button>

### Board

<table><tr><td></td><td>
<table id="col_cond"></table>
</td></tr><tr><td>
<table id="row_cond"></table>
</td><td>
<table id="game_board"></table>
</td></tr></table>
