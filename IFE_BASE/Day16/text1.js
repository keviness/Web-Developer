/**text 1**/
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
    var value1 = document.getElementById("first-number").value;
    var value2 = document.getElementById("second-number").value;
    var result = document.getElementById("result");
    var buttons = document.getElementsByTagName("button");
    buttons[0].onclick = function(){
        result.innerHTML = add(value1, value2);
    }
    buttons[1].onclick = function(){
        result.innerHTML = minus(value1, value2);
    }
    buttons[2].onclick = function(){
        result.innerHTML = times(value1, value2);
    }
    buttons[3].onclick = function(){
        result.innerHTML = divide(value1, value2);
    }
}
function add(value1, value2){
    var tol =value1 + value2;
    return tol;
}
function minus(value1, value2){
    var tol = value1 - value2;
    return tol;
}
function times(value1, value2, result){
    var tol = value1 * value2;
    return tol; 
}
function divide(value1, value2, result){
    if (value !== 0)
    {
        var tol = valur1 / value2;
        return tol;
    }else{
        result.innerHTML = "the wrong!"
    }
}
addLoadEvent(prepareFureature);