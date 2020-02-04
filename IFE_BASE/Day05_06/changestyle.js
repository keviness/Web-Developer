/*change my resume style*/
function changestyle(whichStyle){
    var source = whichStyle.getAttribute("href")
    var target = document.getElementsByTagName("link")[0];
    target.setAttribute("href", source);
}