$(function () {
    window.addEventListener("load", function(){
        document.getElementById("input").value = "";
    });

    $("#search").click(function () {
        var input = $("#input");
        if(!$(input).val()){
            var img = $(this),
                label = img.siblings('label'),
                expanded = label.is(".expanded");
            if (expanded) {
                label.removeClass('expanded').animate({
                    right: 30
                })
            } else {
                label.animate({
                    right: 300
                }, function () {
                    label.addClass('expanded').find('input').focus()
                })
            }
        } else {
            var searchURL = "https://en.wikipedia.org/w/index.php?search=";
            searchURL += encodeURI(input.val());
            window.location.assign(searchURL);
        }
    });
    $(".search input").blur(function () {
        $(this).closest('.search').find('img').click()
    })
});