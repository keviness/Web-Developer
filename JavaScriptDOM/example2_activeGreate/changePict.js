/***create active and change pictures***/
function addLoadEvent(func){
    var oldLoadEvent = window.onload;
    if (typeof window.onload != "function"){
        window.onload = func;
    }else{
        window.onload = function(){
            oldLoadEvent();
            func();
        }
    }
}

function insertAfter(newElement, target){
    var parent = target.parentNode;
    if (parent.lastChild == target){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement, target.nextSibling);
    }
}

function preparePict(){
    if (!document.getElementsByClassName) return false;
    if (!document.getElementsByTagName) return false;
    if (!document.getElementsByClassName("picture_list")) return false;
    var picts = document.getElementsByClassName("picture_list")[0];
    var links = picts.getElementsByTagName("a");
    var pict_placeholder = document.getElementsByClassName("placeholder")[0];
    var h3 = pict_placeholder.getElementsByTagName("h3")[0];
    var img = document.createElement("img");
    img.setAttribute("src", "#");
    img.setAttribute("alt", "picture placeholder");
    img.setAttribute("title", "a picture");
    insertAfter(img, h3);
    for (var i=0; i<links.length; i++){
        links[i].onclick = function(){
            return showPict(this);
        }
    }
}

function showPict(whichPict){
    if (!document.getElementsByClassName) return false;
    if (!document.getElementsByTagName) return false;
    if (!document.getElementsByClassName("placeholder")) return false;
    var source = whichPict.getAttribute("href");
    var target = document.getElementsByClassName("placeholder")[0];
    var place_pict = target.getElementsByTagName("img")[0];
    place_pict.setAttribute("src", source);
    return false;
}

addLoadEvent(preparePict);