$(document).ready(function() {
    setRowHeight();
    setToggleHeight();
    buildStreamers();
    showAll();
    $("#show-all").on("click", showAll);
    $("#show-online").on("click", showOnline);
    $("#show-offline").on("click", showOffline);
});

function showAll() {
    $(".streamer").css("display", "flex");
}

function showOnline() {
    $(".online").css("display", "flex");
    $(".offline").css("display", "none");
}

function showOffline() {
    $(".online").css("display", "none");
    $(".offline").css("display", "flex");
}

function buildStreamers() {
    // Array containing the names of the Streamers
    var Streamers = ["FreeCodeCamp", "Xerrex", "RomOnCoke", "Eurantien", "Foxd33", "WilsonStorm",
        "Noscoc", "SUPERCHEY", "MattVisual", "JebroUnity", "MagicToker", "GopherGaming",
        "TarcisAnastasis", "GhostRobo", "guildwars2"];

    $.each(Streamers, function(index, streamer){
        var url = "https://api.twitch.tv/kraken/channels/" + streamer;
        $.getJSON(url, function(data) {
            var imgUrl = data.logo;
            var channel = data.display_name;
            var descriptionText;
            descriptionText = data.status;
            var url = "https://api.twitch.tv/kraken/streams/" + streamer;
            $.getJSON(url, function(data) {
                var online = data.stream != null;
                addStreamer(online, imgUrl, channel, descriptionText);
            });
        });
    })
}

function addStreamer(online, imgUrl, channel, descriptionText) {
    var row = $("<div></div>");
    row.addClass("row streamer");
    if(online) {
        row.addClass("online");
        $("#online").append(row);
    } else {
        row.addClass("offline");
        $("#offline").append(row);
    }

    var icon = $("<div></div>");
    icon.addClass("col-xs-2 icon");
    row.append(icon);

    var img = $("<img />");
    img.attr("src", imgUrl);
    img.attr("alt", channel);
    icon.append(img);

    var name = $("<div></div>");
    name.addClass("col-xs-3 name");
    var channelUrl = "http://twitch.tv/" + channel;
    name.on("click", function() {
        window.location.href = channelUrl;
    });
    row.append(name);

    var h3 = $("<h3></h3>").text(channel);
    name.append(h3);

    var description = $("<div></div>");
    description.addClass("col-xs-7 description");
    row.append(description);

    var h4 = $("<h4></h4>");
    h4.addClass("text-center");
    if(online){
        h4.text(descriptionText);
    } else{
        h4.text("Offline");
    }

    description.append(h4);
}

$(window).resize(function() {
    setRowHeight();
    setToggleHeight();
});

function setRowHeight() {
    var toggle = $("#show-offline");
    var togglePos = parseInt(toggle.offset().top);
    var toggleHeight = 70;
    var rowHeight = togglePos + toggleHeight + "px";

    var title = $(".title");
    var titlePos = parseInt(title.offset().top);
    var titleHeight = parseInt(title.height());
    var rowHeight2 = titlePos + titleHeight + "px";

    if(parseInt(rowHeight) > parseInt(rowHeight2)){
        $("#navigation").css("height", rowHeight);
    } else {
        $("#navigation").css("height", rowHeight2);
    }
}

function setToggleHeight() {
    var toggles = $(".toggle");
    if(parseInt(toggles.offset().top) === 0){
        toggles.css("height", $("#navigation").height());
    } else{
        toggles.css("height", "70px");
    }

}