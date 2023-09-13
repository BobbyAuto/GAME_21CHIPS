var maximumBoxes = 70; // the maximum number of boxes.
var toBeRemoved = []; // one round, to remove strawberries
var remainingStrawberries = 0; // currently, the remaining strawberries.
var isCatTurn = true;
var strawContainer = [];

var init = function(strawberries, isAITurn) {
    isCatTurn = !isAITurn;
    
    if (strawberries > maximumBoxes) { // the maximum of strawberries can not exceed the maximum number of boxes.
        strawberries = maximumBoxes;
    }

    remainingStrawberries = strawberries; // initial the remaining strawberries.
    $("#remainStraw").html("Remaining Strawberries: <Strong>" + remainingStrawberries +"</strong>");
    if (isCatTurn) {
        $("#whoesTurn").css("text-align", "left");
    }
    
    beginIndice = Math.floor((maximumBoxes - strawberries)/2); // calculate the indice to deploy strawberries.

    var container = $("#mainBox");
    
    for(var i=1; i<=maximumBoxes; i++) {
        (function (index) {
            container.append("<div id='box_" + index + "' selected='0'></div>");
            var e = $("#box_" + index);

            if (i >= beginIndice && i < (beginIndice+strawberries)) { // deploy strawberries.
                strawContainer.push(e);
                e.append("<img src='imgs/strawberry.png'/>");
                var selected = false;
                e.click(function () { // register click event.
                    if(!isCatTurn) {
                        alert("It's not your turn, please wait a moment!");
                        return;
                    }
                    if(toBeRemoved.length >= 3) { // only allow to choose maximum 3 strawberries.
                        if(toBeRemoved.indexOf(e) == -1) {
                            return;
                        }
                    }
                    if(e.children().length == 0) {
                        return;
                    }

                    if(!selected) {
                        e.css("background-color", "#588157");
                        toBeRemoved.push(e);
                    } else {
                        e.css("background-color", "#e4c1f9");
                        var popElement = e;
                        toBeRemoved = toBeRemoved.filter(function(item) {
                            return item !== popElement;
                        });
                    }
                    selected = !selected; //toggle select effect.
                });
            }
        })(i);
    }

    // register the click event of remove button.
    $("#cat").click(function() {
        if(!isCatTurn) {
            alert("It's not your turn, please wait a moment!");
            return;
        }
        if (toBeRemoved.length == 0) {
            alert("You have to choose to remove 1, 2, or 3 strawberries!");
            return;
        }

        var catRecordStr = "<div>" // construct history records.

        for(var i=0; i<toBeRemoved.length; i++) {
            e = toBeRemoved[i];
            e.empty();
            e.css("background-color", "#e4c1f9");

            strawContainer.splice(strawContainer.indexOf(e), 1);

            catRecordStr += "<img src='imgs/strawberry.png'/>"
        }
        catRecordStr += "</div>"
        $("#catRecords").append(catRecordStr);

        remainingStrawberries = strawContainer.length; // update the remaining strawberries.
        $("#remainStraw").html("Remaining Strawberries: <Strong>" + remainingStrawberries +"</strong>");

        if (remainingStrawberries == 0) { // after moving, if the remaining strawberries is 0 then the cat win.
            $("#gameResult").css("color", "yellow");
            $("#gameResult").css("display", "block");
            $("#gameResult").text("Wow, You Win!");
            return;
        }

        toBeRemoved.length = 0; // empty the toBeRemoved list, go to next round

        isCatTurn = false; // switch to AI's turn.
        $("#whoesTurn").css("text-align", "right");
        var bestMoves = aiBestMoves();
        aiDeployMoves(bestMoves.moves);
    });

    // if it's AI's turn at the beginning, then deploy AI's strategy and movement.
    if(!isCatTurn) {
        $("#whoesTurn").css("text-align", "right");
        var bestMoves = aiBestMoves();
        aiDeployMoves(bestMoves.moves);
    }
}

/**
 * deploy the best movements.
 * @param {*} bestMove 
 */
var aiDeployMoves = function(bestMove) {
    var aiRecordStr = "<div>" // construct history records.

    var aiToBeRemoved = [];

    var i=0;
    function loopIteration() { // simulate human's choosing behaviour, give a random time of pause between each choosing.
        if (i<bestMove) {
            var ranPause = Math.random() * 2000;
            setTimeout(function() {
                var e = strawContainer.shift();
                e.css("background-color", "#588157");
                aiToBeRemoved.push(e);
                
                i++;
                loopIteration();
            }, ranPause);
        } else { // after choosing, wait for 1 second, then remove the choosen strawberries.
            setTimeout(function() {
                goMoves();
            }, 1000);
        }
    }
    loopIteration();

    function goMoves() {

        for(var j=0; j<aiToBeRemoved.length; j++) {
            e = aiToBeRemoved[j];
            e.empty();
            e.css("background-color", "#e4c1f9");
    
            aiRecordStr += "<img src='imgs/strawberry.png'/>";
        }
        aiRecordStr += "</div>"
        $("#aiRecords").append(aiRecordStr);
    
        remainingStrawberries = strawContainer.length; // update the remaining strawberries.
        $("#remainStraw").html("Remaining Strawberries: <Strong>" + remainingStrawberries +"</strong>");

        if (remainingStrawberries == 0) { // after moving, if the remaining strawberries is 0 then AI win.
            $("#gameResult").css("color", "red");
            $("#gameResult").css("display", "block");
            $("#gameResult").text("You Failed!");
            return;
        }
    
        isCatTurn = true; // switch to the cat's turn.
        $("#whoesTurn").css("text-align", "left");
    }
    
}

/**
 * calculate the best movement option.
 * @returns a JSON object, which includes the best move and corresponding win rate
 */
var aiBestMoves = function() {
    var possibleResults = [];
    var results = []
    
    for (var move=1; move<=3; move++) {
        if(remainingStrawberries - move >= 0) {
            eval = minimax(remainingStrawberries - move, true);
            possibleResults.push(eval); 
            var result = possibleResults;
            results.push({
                move: move,
                possibleResults: possibleResults.slice()
            });
            possibleResults.length = 0;
        }
    }
    return evaluation(results);
    //alert("bestMoves = " + bestOption.bestMoves + ", bestWinRate = " + bestOption.winRate);

    /**
     * evaluate the move which can maximize the win rate of AI
     * @param {*} results 
     * @returns a JSON object, which includes the best move and corresponding win rate.
     */
    function evaluation(results) {
        var bestMoves = 0;
        var bestWinRate = -1;
        for(var i=0; i<results.length; i++) {
            var move = results[i].move;
            var result = results[i].possibleResults;

            var winCount = 0;
            for(var j=0; j<result.length; j++) {
                if(result[j] == 1) {
                    winCount ++; // accumulate the win time.
                }
            }
            var winRate = winCount/result.length; // calculate the win rate.
            if (winRate > bestWinRate) {
                bestWinRate = winRate;
                bestMoves = move;
            }
        }
        if (bestWinRate == 0) { // if AI has no chance to win, then get a random move among 1 to 3;
            bestMoves = Math.floor(Math.random() * 3) + 1
        }
        return {moves: bestMoves, winRate: bestWinRate};
    }

    /**
     * calculate the tree nodes, AI win if return 1, cat win if return -1.
     * @param {*} strawberries remaining strawberries.
     * @param {*} isCatTurn 
     * @returns 
     */
    function minimax(strawberries, isCatTurn) {
        if (strawberries >=1 && strawberries <= 3) {
            if (isCatTurn) { // if the remaining strawberries are between 1 and 3 in the cat's turn, then cat win, AI fail.
                return -1;
            } else { // in contrast, if the remaining strawberries are between 1 and 3 in the AI's turn, then AI win, cat fail.
                return 1;
            }
        }
        if (strawberries <=0 && isCatTurn) { // if the current round is the cat's turn, but no strawberries remains, then AI win.
            return 1;
        }
        if(isCatTurn) {
            var max_eval = -100;
            for(var move=1; move<=3; move++) {
                if (strawberries - move >= 0) {
                    eval = minimax(strawberries - move, false);
                    max_eval = Math.max(max_eval, eval);
                }
            }
            possibleResults.push(max_eval); 
            return max_eval;
        } else {
            var min_eval = 100;
            for(var move=1; move<=3; move++) {
                if (strawberries - move >= 0) {
                    eval = minimax(strawberries - move, true);
                    min_eval = Math.min(min_eval, eval);
                }
            }
            possibleResults.push(min_eval);
            return min_eval;
        }
    }
}