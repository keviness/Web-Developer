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
    var ul = document.getElementsByTagName("ul")[0];
    var display = document.getElementsByClassName("display")[0];
    var element = document.getElementsByTagName("img")[0];
    ul.addEventListener("mouseover", eventHandler, false);
    function eventHandler(event){
        var event = event || window.event;
        var target = event.target || event.srcElement;
        switch (target.id){
            case "first":moveElement(element, -300, 0, 10);
                    break;
            case "second":moveElement(element, -600, 0, 10);
                    break;
            case "third": moveElement(element,-900, 0, 10);
                    break;
            default: alert("The programe is wrong!");
        }
    }
}
function moveElement(element, final_x, final_y, interval){
    var xpox = parseInt(element.style.left);
    var ypox = parseInt(element.style.top);
    
    if (!element.style.left){
        element.style.left = "0px";
    }
    if (!element.style.top){
        element.style.top = "0px";
    }
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
    element.style.left = xpox + "px";
    element.style.top = ypox + "px";
    element.movement = setTimeout(moveElement, interval);
}
addLoadEvent(prepareGallery);