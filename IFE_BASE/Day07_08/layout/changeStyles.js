/*---change the layout styles---*/
function addOnloadEvent(func){
    var oldonload = window.onload;
    if (typeof window.onload != "function"){
        window.onload = func;
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}
function prepareStyle(){
    if (!document.getElementsByClassName) return false;
    if (!document.getElementsByClassName("changeStyle")) return false;
    var style_list = document.getElementsByClassName("changeStyle")[0];
    var styles = style_list.getElementsByTagName("a");
    for (var i=0; i<styles.length; i++){
        styles[i].onclick = function(){
            return showStyles(this);
        }
    }
}
function showStyles(whichStyle){
    if (!document.getElementsByTagName) return false;
    if (!document.getElementsByName("link")) return false;
    var source = whichStyle.getAttribute("href");
    var target = document.getElementsByTagName("link")[0];
    target.setAttribute("href", source);
    return false;
}
addOnloadEvent(prepareStyle);