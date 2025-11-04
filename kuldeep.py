# -------------------------------
# Text-Based Tic Tac Toe Game
# -------------------------------

# The board will be a list of 9 elements (indexes 0–8)
board = [" "] * 9

# Current player
current_player = "X"


def print_board():
    """Display the Tic Tac Toe board."""
    print()
    print(f" {board[0]} | {board[1]} | {board[2]} ")
    print("---+---+---")
    print(f" {board[3]} | {board[4]} | {board[5]} ")
    print("---+---+---")
    print(f" {board[6]} | {board[7]} | {board[8]} ")
    print()


def check_winner():
    """Check all winning combinations."""
    win_combos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  # rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  # columns
        [0, 4, 8], [2, 4, 6]              # diagonals
    ]
    for combo in win_combos:
        a, b, c = combo
        if board[a] == board[b] == board[c] != " ":
            return True
    return False


def is_draw():
    """Return True if the board is full and no winner."""
    return " " not in board


def make_move(position):
    """Place the current player's mark on the board."""
    global current_player
    if board[position] == " ":
        board[position] = current_player
        return True
    else:
        print("That spot is already taken. Try again.")
        return False


def switch_player():
    """Switch turn between X and O."""
    global current_player
    current_player = "O" if current_player == "X" else "X"


# -------------------------------
# Main Game Loop
# -------------------------------
print("Welcome to Tic Tac Toe!")
print("Positions are numbered 1–9 as follows:")
print(" 1 | 2 | 3 ")
print("---+---+---")
print(" 4 | 5 | 6 ")
print("---+---+---")
print(" 7 | 8 | 9 ")

while True:
    print_board()
    try:
        move = int(input(f"Player {current_player}, choose a position (1-9): ")) - 1
        if move < 0 or move > 8:
            print("Invalid input. Choose a number between 1 and 9.")
            continue
    except ValueError:
        print("Please enter a valid number.")
        continue

    if make_move(move):
        if check_winner():
            print_board()
            print(f"🎉 Player {current_player} wins! 🎉")
            break
        elif is_draw():
            print_board()
            print("It's a draw! 🤝")
            break
        else:
            switch_player()

print("Game over.")
