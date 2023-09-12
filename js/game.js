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
    });
}