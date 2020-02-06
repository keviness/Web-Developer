function changeStyle(whichStyle){
    var source = whichStyle.getAttribute("href");
    var link = document.getElementsByTagName("link")[0];
    link.setAttribute("href", source);
    return false;
}