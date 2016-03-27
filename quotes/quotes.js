(function(){
    "use strict";
    $(document).ready(function(){
        setColors();
        $("#tweet-button").on("click", tweetIt);
        $("#new-quote").on("click", setQuoteText);
    });

    function setColors(){
        var colors = ["cornflowerblue", "darkcyan", "darkgreen", "darkmagenta", "firebrick"];
        var index = Math.floor(Math.random() * colors.length);

        var backgroundElements = ["body", ".button-div"];
        backgroundElements.forEach(function(element){
            $(element).css("background-color", colors[index]);
        });
        var elements = ["#quote-text", ".glyph", "#author"];
        elements.forEach(function(element){
            $(element).css("color", colors[index]);
        });

        setQuoteText();
    }

    function setQuoteText(){
        $.ajax({
            headers: {
                "X-Mashape-Key": "4gkTfhXYjOmshryBltUZJtdQQ2Mqp1bsU1fjsnEAbDgGhqPgkw",
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            url: "https://andruxnet-random-famous-quotes.p.mashape.com/cat=",
            success: function (response) {
                var data = JSON.parse(response);
                //noinspection JSUnresolvedVariable
                var currentQuote = data.quote;
                //noinspection JSUnresolvedVariable
                var currentAuthor = data.author;
                $("#quote-text").html(currentQuote);
                $("#author").html("- " + currentAuthor);
            }
        })
    }

    function tweetIt () {
        var phrase = document.getElementById("quote-text").innerText;
        phrase += " " + document.getElementById("author").innerHTML;
        var tweetUrl = 'https://twitter.com/share?text=' +
            encodeURIComponent(phrase);
        window.open(tweetUrl);
    }

})();