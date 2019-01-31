// todo
// add bandcamp
// add upcoming listens tab

window.onload = function() {
    init()
};

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1GrKrFZGruTJENWZTHePKJe423bLGgLFLwfQ6WDK79oo/pubhtml';

function init() {
    Tabletop.init({
        key: public_spreadsheet_url,
        callback: errorCheck,
        simpleSheet: true,
        debug: false

    })
}

function errorCheck(data, tabletop){
  showInfo(data, tabletop);
}

function parseSpotifyLink(link) {
    var result = link.substr(0, 24) + "/embed" + link.substr(24);
    return (result);
}

function showInfo(data, tabletop) { 
    //themes
    var theme_red = "washed-blue bg-red";
    var theme_orange = "dark-blue bg-gold";
    var theme_yellow = "dark-green bg-bright-yellow";
    var theme_green = "navy bg-green";
    var theme_blue = "lightest-blue bg-blue";
    var theme_purple = "washed-blue bg-purple";
    var theme_magenta = "washed-blue bg-dark-pink";
    

    //info
    var entryInfo;
    var entryPlayer;
    var entry;
    var theme;
    for (var i = data.length -1; i >= 0; i--) {
      if(data[i].Status == "Published"){
        entryInfo = $('<div class="w-50-ns pr4"/>');
        entryInfo.append("<h2 class='f4 f2-ns fw6 mb2'>" + data[i].Album + "</h2>");
        entryInfo.append("<h2 class='f5 f4-ns fw6 mb2'>" + data[i].Artist + "</h2>");
        entryInfo.append("<div class='f5 measure lh-copy mt0'>" + "Discovered on <span class='b'>" + data[i].Source + "</span> and added on <span class='b'>" + data[i].Added + "</span></div>");
        entryInfo.append("<div class='f5 measure lh-copy mt0'>" + "Listened on <span class='b'>" + data[i].Listened + "</div>");
        entryInfo.append("<div class='f5 measure lh-copy mt0'>" + "Filed under <span class='b'>" + data[i].Genre + "</div>");
        entryInfo.append("<div class='f5 measure lh-copy mt0'>" + "Released on <span class='b'>" + data[i].Label + "</div>");
        entryInfo.append("<div class='f5 measure lh-copy mt0'>" + "Favourite moments of the album are <span class='b'>" + data[i].Favourite + "</div>");
        entryInfo.append("<div class='f5 measure lh-copy mt0'>" + "Thoughts on " + data[i].Album +  "<div class='b i'>" + data[i].Notes + "</div>");
        
        entryPlayer = $('<div class="w-50-ns"/>');
        entryPlayer.append("<div class='measure mt3'>" + "<iframe src='" + parseSpotifyLink(data[i].Spotify) + "' width='300' height='380' frameborder='0' allowtransparency='true'></iframe>" + "</div>");
        
        switch(data[i].Theme) {
        case "blue":
          theme = theme_blue;
          break;
        case "red":
          theme = theme_red;
          break;
        case "green":
          theme = theme_green;
          break;
        case "purple":
          theme = theme_purple;
          break;
        case "yellow":
          theme = theme_yellow;
          break;
        case "magenta":
          theme = theme_magenta;
          break;
        case "orange":
          theme = theme_orange;
          break;
        }


        entry = $('<div class="w-100 pa4 ma0 flex flex-column flex-row-ns ' + theme + '"/>');
        entry.append(entryInfo);
        entry.append(entryPlayer);
        $('#main-content').append(entry);
      }
    }

}