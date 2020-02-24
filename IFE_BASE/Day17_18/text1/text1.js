"use strict"
function addEvent(func){
    var oldEvent = window.onload;
    if (typeof window.onload != "function"){
        window.onload = func;
        alert(typeof func);
    }else{
        window.onload = function(){
            oldEvent();
            func();
        }
    }
}
function prepareFunct(){
    var button = document.getElementById("trans-btn");
    button.onclick = function(){
        var dec_number = parseInt(document.getElementById("dec-number").value);
        var bin_bit = parseInt(document.getElementById("bin-bit").value);
        var output = document.getElementById("result");
        if (typeof dec_number === "number" && typeof bin_bit === "number"){
            var result = "";
            var bin_value = 0;
            for (var i=0; i<dec_number; i++){
                bin_value = bin_bit%2;
                result += bin_value;
                bin_bit /= 2;
            }
        }
        if (result.length < 5){
            alert("the size is lesser");
        }
        output.innerHTML = result;
    }
}

addEvent(prepareFunct);