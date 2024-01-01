# GAME_21CHIPS
(Cat Human vs AI) A Game and Strategy of Taking Away 21 Strawberries with Minimax and Alpha-Beta Pruning Algorithm.

### Programming Languages Used for This Game
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>Javascript (jQuery Framework)</li>
</ul>

### what is this game?</b><br/>
21 chips take away game, also called "A Take-Away Game", Consider the following game: there are 21 chips on the table. You are challenged by your
arch-enemy to play the following game: you both have to alternate moves, where in each move, you can take away either 1, 2, or 3 chips from the table. The person who has no more
chips to remove from the table chips loses.

## Minimax Algorithm
The Minimax search algorithm was first introduced by Shannon in 1950 [1], which has become the foundation of computer game theory [2]. In a board game, the basic idea is to abstract all possible positions of placing chess pieces into a search tree, and then search all the possible positions that could be made from the current position, calculate the best position to maximize its benefits to win the game and minimize the opponent's benefits to fail the game. Another perspective in the Gobang game to define the Minimax algorithm is that assume there are two players A and B, and A is running the Minimax algorithm. The state value of player A is associated with each possible position of moves, and this state value is computed by an evaluation function that indicates how good it would be for player A to win the game. The player A then makes the next move which can maximize the minimum value of the position resulting from player B's possible following moves. If it is A's turn to move, then player A gives a state value to each of its possible moves [3].

From the tree root node to the end leaf nodes, the algorithm search tree sets the Max layer and the Min layer in turn. The maximin value in the root of the search tree is the highest value that player A can be sure to get without knowing the actions of player B; equivalently, it is the lowest value for player B to receive when player A's action is known by the algorithm. Mathematically, its formal formula definition can be expressed as:

<img width="521" alt="image" src="https://github.com/WeichunAuto/GAME_21CHIPS/assets/39370733/4c4edd1b-cdd0-4c8d-ae0c-abf8321791cd">
<br />

where, $i$ is the index of the player A's possible moves in the Max layers, $V(A)_i$ is the maximum state value of Player A, and $j$ is the index of the player B's possible moves in the Min layers, $V(B)_j$ is the minimum state value of Player B, $state \,\,values$ are all the values of possible moves of player A and B.

<img width="554" alt="image" src="https://github.com/WeichunAuto/GAME_21CHIPS/assets/39370733/e1a1167d-8c53-4ea9-b9bd-78dad4453e90">
<br />

The Minimax search algorithm generates the tree, shown in Figure 1, where the circles, in the Max layer, represent the moves of player A who is running the Minimax algorithm to maximize its own benefits and minimize the opponent's benefits. Squares, in the Min layer, represent the moves of the opponent player B, the number of each node represents the state value, and the red line arrow represents the maximum and minimum result, corresponding $V(A)$ and $V(B)$ in the formula (1), in each possible moves which are calculated by an evaluation function. 


## Alpha-Beta Pruning Algorithm

The advantage of the Minimax search algorithm is its simplicity, as its main idea is to calculate all possible moves from the current position, and then choose the best move based on the evaluation function. However, the time cost of performing all the calculations of possible moves is enormous and requires huge computational resources. Assuming that branching factor (b) is the number of all possible states (moves) from the current position, and game length (d) is the value of search depth. For a normal 15 x 15 Gobang chess board, we can get that $b = 15 \times 15 = 225$.
Then, the time complexity is approximately equal to:

$$t = 225^d$$

Suppose, the value of search depth (d) is 3, then the time complexity will be $113,906,25$. This is not such a huge number that we cannot calculate it, but it could be an alarm since Gobang is such a simple game and the value of search depth is nearly very small.

The Alpha-Beta algorithm is the best-known pruning method [4]. In essence, the Alpha-Beta algorithm is equivalent to the Minimax algorithm, both of them aim to find the best move from the current position to the next position and both will assign the state value to all possible nodes (moves) [5]. However, the Alpha-beta algorithm is faster than the Minimax algorithm since it does not explore some branches of the tree that will not affect the value of the parent node in the previous layer [5]. Assuming that the search techniques proceed depth-first search (DFS) from left to right and that the root node is a Max node (which means player A is running the algorithm). In the search process, the maximum value in the Max layer is assigned as $Alpha$, and the minimum value in the Min layer is assigned as $Beta$. The child nodes connected by dashed lines in the Min layer are shown in Figure \ref{fig: alpha beta}, if the state value of a child node is less than the $Alpha$ value, which can result in $Alhpa \geq Beta$, then the subsequent child nodes will be pruned [6].

<img width="575" alt="image" src="https://github.com/WeichunAuto/GAME_21CHIPS/assets/39370733/beaf71da-de3c-4561-9315-7fade02dacd9">
<br /><br />
It is worth noting that the benefit of the Alpha–Beta pruning algorithm is that branches of the search tree can be reduced. It was proved that if nodes are evaluated in the optimal or near-optimal order, take the same 15 x 15 Gobang chess board as an example, the time complexity will drop to:

$$t = 225^{\frac{d}{2}}$$

which means the search performance will be improved by much more than half in comparison to the simple Minimax algorithm.


## Reference
<ol>
  <li>C. E. Shannon, “Xxii. programming a computer for
playing chess,” The London, Edinburgh, and Dublin
Philosophical Magazine and Journal of Science, vol. 41,
no. 314, pp. 256–275, 1950.</li>
  <li>
    Y. Cheng and X.-F. Lei, “Research and improvement
of alpha-beta search algorithm in gobang,” Jisuanji
Gongcheng/ Computer Engineering, vol. 38, no. 17,
2012.
  </li>
  <li>
    Wikipedia contributors. “Minimax.” (Accessed 2023-
10-06), [Online]. Available: https://en.wikipedia.org/
wiki/Minimax.
  </li>
  <li>
    A. Saffidine, H. Finnsson, and M. Buro, “Alpha-beta
pruning for games with simultaneous moves,” in Pro-
ceedings of the AAAI Conference on Artificial Intelli-
gence, vol. 26, 2012, pp. 556–562.
  </li>
  <li>
    S. H. Fuller, J. G. Gaschnig, J. Gillogly, et al., Analysis
of the alpha-beta pruning algorithm. Department of
Computer Science, Carnegie-Mellon University, 1973.
  </li>
  <li>
    Y. Cheng and X.-F. Lei, “Research and improvement
of alpha-beta search algorithm in gobang,” Jisuanji
Gongcheng/ Computer Engineering, vol. 38, no. 17,
2012.
  </li>
</ol>
