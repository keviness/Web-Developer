/*** Day34~36: task2 ***/
function drawLineChart(data)
{
    var linewrapper,
        lineObj,
        lineHTML,
        context,

    linewrapper = document.querySelector("#line-wrapper");
    lineHTML = "";
    lineHTML += "<canvas width='1200' height='500'></canvas>";
    linewrapper.innerHTML = lineHTML;

    lineObj = linewrapper.getElementsByTagName("canvas")[0];
    context = lineObj.getContext("2d");
    context.beginPath();
    context.moveTo(20, 480);
    context.lineTo(20, 20);
    context.moveTo(20, 480);
    context.lineTo(1200, 480);
    context.stroke();
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = "blue";
    context.moveTo(20, 480);
    context.arc(20, 480, 2, 0, Math.PI*2, false);
    for (var i=0; i<data.sale.length; i++)
    {
        context.lineTo((100*i + 120), 480-data.sale[i]);
    }
    context.stroke();
}