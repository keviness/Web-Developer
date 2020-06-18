/*** Day34~36: task2 bar.js ***/
function generateHistogram(data){
    var svgObj,
        svgWrapper,
        svgHTML,
        lineHTML;

    svgWrapper = document.querySelector("#svg-wrapper");
    svgHTML = "";
    svgHTML += "<svg width='100%' height='430' xmlns='http://www.w3.org' version='1.1'>";
    svgHTML += "</svg>";
    svgWrapper.innerHTML = svgHTML;

    svgObj = document.getElementsByTagName("svg")[0];
    lineHTML = "";
    lineHTML += "<polyline points='20,20 20,420 1220,420' fill='none' stroke='black' />";

    //draw histogram
    for (var i=0; i<data.sale.length; i++){
        lineHTML += "<rect x='" + (i*100+70) +"' y='"+(420-data.sale[i])+"' ";
        lineHTML+= "width='50' height='"+data.sale[i]+"' fill='green' />"
    }
    
    svgObj.innerHTML = lineHTML;
}

