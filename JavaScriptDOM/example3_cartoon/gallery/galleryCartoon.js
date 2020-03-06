/***gallery cartoon***/
"use strict"
function addLoadEvent(func){
    var oldload = window.onload;
    if (typeof window.onload !== "function"){
        window.onload = func;
    }else{
        window.onload = function(){
            oldload();
            func();
        }
    }
}
function prepareGallery(){
    var first = document.getElementById("first");
    var second = document.getElementById("second");
    var third = document.getElementById("third");
    var img = document.getElementsByTagName("img")[0];
    img.style.position = "absolute";
    first.onmouseover = function(){
        moveElement("img", -300, 0, 10);
    }
    second.onmouseover = function(){
        moveElement("img", -600, 0, 10);
    }
    third.onmousemove = function(){
        moveElement("img", -900, 0, 10);
    }
}
function moveElement(elementId, final_x, final_y, interval){
    var element = document.getElementsByTagName(elementId)[0];
    
    if (!element.style.left){
        element.style.left = "0px";
    }
    if (!element.style.top){
        element.style.top = "0px";
    }
    var xpox = parseInt(element.style.left);
    var ypox = parseInt(element.style.top);
    if (element.movement){
        clearTimeout(element.movement);
    }
    if (xpox===final_x && ypox===final_y){
        return true;
    }
    if (xpox < final_x){
        var dis = Math.ceil((final_x-xpox)/10);
        xpox += dis;
    }
    if (xpox > final_x){
        var dis = Math.ceil((xpox-final_x)/10);
        xpox -= dis;
    }
    if (ypox < final_y){
        var dis = Math.ceil((final_y-ypox)/10);
        ypox += dis;
    }
    if (ypox > final_y){
        var dis = Math.ceil((ypox-final_y)/10);
        ypox -= dis;
    }
    element.style.left = "" + xpox + "px";
    element.style.top = "" +ypox + "px";
    element.movement = setTimeout(moveElement, interval);
}
addLoadEvent(prepareGallery);