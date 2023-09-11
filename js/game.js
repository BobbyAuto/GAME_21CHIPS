var init = function(strawberries) {
    var maximumBoxes = 70;
    if (strawberries > maximumBoxes) { // the maximum of strawberries can not exceed the maximum number of boxes.
        strawberries = maximumBoxes;
    }

    var remainingStrawberries = strawberries;
    var toBeRemoved = []; // one round, to remove strawberries

    beginIndice = Math.floor((maximumBoxes - strawberries)/2); // calculate the indice to deploy strawberries.

    var container = $("#mainBox");
    
    for(var i=1; i<=maximumBoxes; i++) {
        (function (index) {
            container.append("<div id='box_" + index + "' selected='0'></div>");
            var e = $("#box_" + index);

            if (i >= beginIndice && i < (beginIndice+strawberries)) { // deploy strawberries.
                e.append("<img src='imgs/strawberry.png'/>");
                var selected = false;
                e.click(function () {
                    if(toBeRemoved.length >= 3) { // only allow to choose maximum 3 strawberries.
                        if(toBeRemoved.indexOf(e) == -1) {
                            return;
                        }
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
                    selected = !selected;
                });
            }
            
        })(i);
    }
}