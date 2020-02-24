/**text 1**/
"use strict"
function addLoadEvent(func){
    var oldEvent = window.onload;
    if (typeof window.onload != "function"){
        window.onload = func;
        alert(typeof window.onload);
    }else{
        window.onload = function(){
            oldEvent();
            func();
        }
    }
}
function prepareFureature(){
    var result = document.getElementById("result");
    var button1 = document.getElementById("add-btn");
    var button2 = document.getElementById("minus-btn");
    var button3 = document.getElementById("times-btn");
    var button4 = document.getElementById("divide-btn");
    button1.onclick = function(){       //event is a function
        result.innerHTML = add();
    }
    button2.onclick = function(){
        result.innerHTML = minus();
    }
    button3.onclick = function(){
        result.innerHTML = times();
    }
    button4.onclick = function(){
        result.innerHTML = divide();
    }
}
function add(){
    var value1 = Number(document.getElementById("first-number").value);
    var value2 = Number(document.getElementById("second-number").value);
    if(typeof value1 === "number" && typeof value2 === "number")
    {
        var tol =value1 + value2;
        return tol;
    }else{
        console.log("error!");
    }
}
function minus(){
    var value1 = Number(document.getElementById("first-number").value);
    var value2 = Number(document.getElementById("second-number").value);
    if (typeof value1 === "number" && typeof value2 === "number"){
    var tol = value1 - value2;
    return tol;
    }else{
        console.log("error");
    }
}
function times(){
    var value1 = Number(document.getElementById("first-number").value);
    var value2 = Number(document.getElementById("second-number").value);
    if (typeof value1 === "number" && typeof value2 ==="number"){
    var tol = value1 * value2;
    return tol; 
    }
}
function divide(){
    var value1 = Number(document.getElementById("first-number").value);
    var value2 = Number(document.getElementById("second-number").value);
    if (value2!=0 && typeof value1 === "number" && typeof value2 === "number")
    {
        var tol = value1 / value2;
        return tol;
    }else{
        console.log("error!");
    }
}
addLoadEvent(prepareFureature);