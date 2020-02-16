/***change picture***/
function addLoadEvent(func){
    var oldloadevent = window.onload;
    if (typeof window.onload != "function"){
        window.onload = func;
        alert(typeof window.onload);
    }else{
        oldloadevent();
        func();
    }
}

function prepareGallery(){
    if (!document.getElementsByClassName) return false;
    if (!document.getElementsByTagName) return false;
    var pict_list = document.getElementsByClassName("picture_list")[0];
    var link = pict_list.getElementsByTagName("a");
    for (var i=0; i<link.length; i++){
        link[i].onclick = function(){
            showPicture(this);
        }
    }
}

function showPicture(whichPicture){
    if (!document.getAttribute) return false;
    if (!document.getElementsByClassName) return false;
    if (!document.getElementsByTagName) return false;
    if (!document.getElementsByClassName("placeholder")) return false;
    var source = whichPicture.getAttribute("href");
    var target = document.getElementsByClassName("placeholder")[0];
    var target_place = target.getElementsByTagName("img")[0];
    target_place.setAttribute("src",source);
    return false;
}

addLoadEvent(prepareGallery);