/*change my resume style*/
function addLoadEvent(func){
    var oldonload = window.onload;
    if (typeof window.onload != "function"){
        window.onload = fun;
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}
function prepareStyle(){
    var style = document.getElementsByTagName("a");
    for (var i=0; i<style.length; i++){
        style[i].onclick = function(){
            return changeStyle(this);
        }
    }
}
function changeStyle(whichStyle){
    var source = whichStyle.getAttribute("href")
    var target = document.getElementsByTagName("link")[0];
    target.setAttribute("href", source);
    return false;
}
addLoadEvent(prepareStyle);