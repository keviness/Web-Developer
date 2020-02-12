/*--seperate the javascript and html document--*/
function addOnloadEvent(func){
    var oldonload = window.onload;
    if (typeof window.onload != "function"){
        window.onload = func;
        alert(typeof func);
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}
function prepareStyle(){
    var li = document.getElementsByClassName("change")[0];
    var style = li.getElementsByTagName("a");
    for (var i=0; i<style.length; i++){
        style[i].onclick = function(){
            return changeStyle(this);
        }
    }
}
function changeStyle(whichStyle){
    var source = whichStyle.getAttribute("href");
    var link = document.getElementsByTagName("link")[0];
    link.setAttribute("href", source);
    return false;
}
addOnloadEvent(prepareStyle);