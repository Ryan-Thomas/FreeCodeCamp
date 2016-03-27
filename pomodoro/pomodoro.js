(function() {
    "use strict";

    var unripeHeight;
    var sessionTime;
    var breakTime;

    var interval;

    $(window).load(function() {

        // Global Variables
        unripeHeight = 1;
        breakTime = 5 * 60;
        sessionTime = 25 * 60;

        // Default Functions
        setUnripeHeight(unripeHeight);
        setRipeHeight();

        // Event Handlers
        $("#minus-break").on("click", function() {
            if(update("break", -60) > 0) {
                breakTime -= 60;
            }
            reset();
        });
        $("#plus-break").on("click", function() {
            breakTime += 60;
            update("break", +60);
            reset();
        });
        $("#minus-session").on("click", function() {
            if(update("session", -60) > 0) {
                sessionTime -= 60;
            }
            reset();
        });
        $("#plus-session").on("click", function() {
            sessionTime += 60;
            update("session", +60);
            reset();
        });
        $(".tomato").on("click", startTimer);
    });

    $(window).resize(function() {
        setUnripeHeight(unripeHeight);
        setRipeHeight();
    });

    function startTimer() {
        clearInterval(interval);
        interval = null;
        $("#state").html("Session");
        var sessionLeft = sessionTime;
        var breakLeft = breakTime;
        interval = setInterval(function() {
            if(sessionLeft >= 0) {
                updateTimer(sessionLeft);
                setUnripeHeight(sessionLeft / sessionTime);
                sessionLeft--;
            } else if(breakLeft >= 0) {
                $("#state").html("Break!");
                updateTimer(breakLeft);
                setUnripeHeight((breakTime - breakLeft)/ breakTime);
                breakLeft--;
            }
        }, 1000);
    }

    function updateTimer(time) {
        var timer = $("#timer");
        var currentTime = time;
        var remainder = time % 60;
        remainder = remainder > 9 ? "" + remainder: "0" + remainder;
        var displayTime = Math.floor(time / 60) + ":" + remainder;
        timer.html(displayTime);
    }

    // Sets the height of the container for the unripe tomato
    // based on the given number + "%".
    function setUnripeHeight(proportion) {
        var defaultHeight = parseInt($("#unripe").height());
        var stemHeight = 0.22 * defaultHeight;
        var tomatoHeight = defaultHeight - stemHeight;
        var newHeight = proportion * tomatoHeight + stemHeight;
        $("#unripeContainer").height(newHeight);
        unripeHeight = proportion;
    }

    function setRipeHeight() {
        $("#ripe").height($("#unripe").height());
    }

    // Applies the provides update to the DOM element with
    // the specified ID.
    // Resets the timer.
    function update(name, update) {
        var object = $("#" + name);
        var oldValue = parseInt(object.html());
        var newValue = eval(oldValue + update / 60);
        if(newValue > 0) {
            object.html(newValue);
        }
        setUnripeHeight(1);
        return newValue;
    }

    function reset() {
        clearInterval(interval);
        $("#timer").html(sessionTime / 60 + ":00");
    }

})();