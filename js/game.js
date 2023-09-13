var maximumBoxes = 70; // the maximum number of boxes.
var toBeRemoved = []; // one round, to remove strawberries
var remainingStrawberries = 0; // currently, the remaining strawberries.
var isCatTurn = true; 

var init = function(strawberries) {
    
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
        var catRecordStr = "<div>" // construct history records.

        for(var i=0; i<toBeRemoved.length; i++) {
            e = toBeRemoved[i];
            e.empty();
            e.css("background-color", "#e4c1f9");

            catRecordStr += "<img src='imgs/strawberry.png'/>"
        }
        catRecordStr += "</div>"
        $("#catRecords").append(catRecordStr);

        remainingStrawberries -= toBeRemoved.length; // update the remaining strawberries.
        $("#remainStraw").html("Remaining Strawberries: <Strong>" + remainingStrawberries +"</strong>");

        toBeRemoved.length = 0; // empty the toBeRemoved list, go to next round

        isCatTurn = false; // switch to AI's turn.
        $("#whoesTurn").css("text-align", "right");
        aiMoves();
    });
}

var aiMoves = function() {
    var possibleResults = [];
    var results = []
    
    for (var move=1; move<=3; move++) {
        if(remainingStrawberries - move >= 0) {
            minimax(remainingStrawberries - move, true);
            var result = possibleResults;
            results.push({
                move: move,
                possibleResults: possibleResults.slice()
            });
            possibleResults.length = 0;
        }
    }
    var bestOption = evaluation(results);
    alert("bestMoves = " + bestOption.bestMoves + ", bestWinRate = " + bestOption.winRate);

    /**
     * evaluate the move which can maximize the win rate of AI
     * @param {*} results 
     * @returns a JSON object, which includes the best move and corresponding win rate.
     */
    function evaluation(results) {
        var bestMoves = 0;
        var bestWinRate = 0;
        for(var i=0; i<results.length; i++) {
            var move = results[i].move;
            var result = results[i].possibleResults;

            var winCount = 0;
            for(var j=0; j<result.length; j++) {
                if(result[j] == 1) {
                    winCount ++;
                }
            }
            var winRate = winCount/result.length;
            if (winRate > bestWinRate) {
                bestWinRate = winRate;
                bestMoves = move;
            }
        }
        return {bestMoves: bestMoves, winRate: bestWinRate};
    }

    /**
     * calculate the tree nodes, AI win if return 1, cat win if return -1.
     * @param {*} strawberries remaining strawberries.
     * @param {*} isCatTurn 
     * @returns 
     */
    function minimax(strawberries, isCatTurn) {
        if (strawberries <= 3) {
            if (isCatTurn) { // if the remaining strawberries are between 1 and 3 in the cat's turn, then cat win, AI defeat.
                //possibleResults.push(-1);
                return -1;
            } else { // in contrast, if the remaining strawberries are between 1 and 3 in the AI's turn, then AI win, cat defeat.
                //possibleResults.push(1);
                return 1;
            }
        }
        if (strawberries <=0 && isCatTurn) { // if the current round is the cat's turn, but no strawberries remains, the AI win.
            //possibleResults.push(1);
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