//流程：发现用户输入->获取用户输入内容->生成提示框提示内容->进行提示
"use strict"


function runScript() {
    var emailSugBox,
        eamilInput;
    eamilInput = document.querySelector("#email-input"); 
    emailSugBox = document.querySelector("#email-sug-wrapper");
    eamilInput.oninput = function() {
    var input,
        resultHTML;

        input = getInput();
        resultHTML = generateSuggestion(input);
        commitToSugBox(resultHTML);
        toggleSugBox(input);
        pickSuggestion();
    }
}

//获取用户输入
function getInput() {
    return encode(eamilInput.value.trim());
}

//生成提示框中的提示内容
function generateSuggestion(input) {
var i,
    j,
    postfixList,
    handleInput,
    index,
    stringSlice;
postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
handleInput = inputHandle(input);
index = input.indexOf("@");
stringSlice = input.slice(index+1, input.length+1);
var resultHTML = "";
var result = "";
for (i=0, j=0; i<postfixList.length; i++) {
    if (postfixList[i].indexOf(stringSlice) === 0) {
        result += "<li>" + handleInput + "@" + postfixList[i] + "</li>";
    }else{
        resultHTML += "<li>" + handleInput + "@" + postfixList[i] + "</li>";
        j++;
    }
}
return j==postfixList.length? resultHTML:result;
/*
if (j<postfixList.length) {
    return result;
}
return resultHTML;
*/

}

//将提示内容添加到email-sug-wrapper
function commitToSugBox(resultHTML) {
emailSugBox.innerHTML = resultHTML;
}
//控制email-sug-wrapper的显示/隐藏状态
function toggleSugBox(input) {
if (!input) {
    hideSugBox();
} else {
    showSugBox();
}
}

//隐藏提示框
function hideSugBox() {
emailSugBox.style.display = "none";
}
//显示提示框
function showSugBox() {
emailSugBox.style.display = "block";
}

//优化函数一：去除@以后的字符，只添加@之前的字符
function inputHandle(input) {
var handledInput,
    index;

handledInput = "";
index = input.indexOf("@");
if (index !== -1) {
    handledInput += input.slice(0, index);
    return handledInput;
}
return input;
}

//优化函数二：将选中的项的提示提交到建议框
function pickSuggestion() {
var suggestion;

emailSugBox.onclick = function(event) {
    if (event.target.nodeName.toLowerCase() === "li") {
        suggestion = event.target.innerHTML;
        eamilInput.value = decode(suggestion);
        hideSugBox();
    }
}
}

//优化函数三：XSS攻防（Cross Site Script）、JavaScrit编码和解码
//编码：html->innerText||textContent->innetHTML
function encode(html) {
var temp,
    output;

temp = document.createElement("div");
(temp.innerText != "undefined")? (temp.innerText = html):(temp.textContent = html);
output = temp.innerHTML;
temp = null;

return output; 
}
//解码：text->innerHTML->innerText||textContent
function decode(text){
var temp,
    output;

temp = document.createElement("div");
temp.innerHTML = text;
output = temp.innerText || temp.textContent;
temp = null;

return output;
}

function addLoadEvent(func){
    var oldloadevent = window.onload;
    if (typeof window.onload != "function"){
        window.onload = func;
    }else{
        window.onload = function(){
            oldloadevent();
            func();
        }
    }
}
window.addEventListener("load", runScript, false);