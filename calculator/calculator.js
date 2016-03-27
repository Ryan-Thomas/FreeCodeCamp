(function() {
    "use strict";

    // Global Variables
    var clearOnInput = true;
    var ans = 0;

    $(document).ready(function() {
        $(".input").on("click", function() {
            input(this);
        });
        $("#eval").on("click", evaluate);
        $("#ce").on("click", clearInput);
        $("#del").on("click", backspace);
    });

    function backspace() {
        var calculations = $("#input");
        var equation = calculations.text();
        var symbols = ["+", "-", "*", "/", "%", "(", ")"];
        equation = equation.trim();
        var lastChar = equation.charAt(equation.length - 1);
        // Check whether the last character was a symbol
        // If so, remove an extra character
        if(symbols.indexOf(lastChar) !== -1) {
            equation = equation.substring(0, equation.length - 2);
        } else if(lastChar === "s") {
            equation = equation.substring(0, equation.length - 4);
        }else {
            equation = equation.substring(0, equation.length - 1);
        }
        calculations.html(equation);
        clearOnInput = false;
    }

    function input(div) {
        var calculations = $("#input");
        if(clearOnInput) {
            clearInput();
            clearOnInput = false;
        }
        var input = div.innerHTML;
        var oldInput = calculations.text();
        calculations.html(oldInput + input);
    }

    function evaluate() {
        var equation = $("#input").text();
        var result;
        try {
            result = eval(equation);
            result -= result % 0.0000001;
            ans = result;
        } catch (err) {
            result = "INVALID INPUT";
        }

        $("#result").html(result);
        clearOnInput = true;
    }

    function clearInput() {
        $("#input").text("");
    }

})();