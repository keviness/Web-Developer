/*** Day34~36: task2 ***/
//解耦前：
/*
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
*/
//解耦后：
lineChart = {
    width: 800,
    height: 460,
    xaxis: 0,
    yaxis: 0,
    x0: 0,
    y0: 0,
    radius: 0,
    pointSpace: 45,
    initSpace: 20,
    lineColor: "blue",
    fillColor: "blue",
    data: [],
    chart: null,
    lineWrapperId:"",
    pxDataRate: 0,

    init: function() { 
        this.xaxis = this.width - this.initSpace;
        this.yaxis = this.height - this.initSpace;
        this.x0 = this.initSpace;
        this.y0 = this.yaxis + this.initSpace;
        
        this.chart = document.createElement("canvas");
        this.chart.setAttribute("width", this.width);
        this.chart.setAttribute("height", this.height);

        var context = this.chart.getContext("2d");
        context.beginPath();
        context.moveTo(this.x0, this.y0-this.yaxis);
        context.lineTo(this.x0, this.y0);
        context.lineTo(this.x0+this.xaxis, this.y0);
        context.stroke();
    },

    drawLineChart: function() {
        this.radius = 3;
        var sales = this.data;
        this.pxDataRate = this.yaxis/(Math.max.apply(null, sales));

        var context = this.chart.getContext("2d");
        context.fillStyle = this.fillColor;
        context.strokeStyle = this.lineColor; 
        context.beginPath();
        context.moveTo(this.x0, this.y0);
        for (var i=0; i<sales.length; i++){
            if (i > 0){
                context.lineTo(this.x0+((i+1)*this.pointSpace), this.y0-(sales[i]*this.pxDataRate));
                context.stroke();
            }
                context.moveTo(this.x0+((i+1)*this.pointSpace), this.y0-(sales[i]*this.pxDataRate));
                context.arc(this.x0+((i+1)*this.pointSpace), this.y0-(sales[i]*this.pxDataRate), this.radius, 0, Math.PI*2, false);
                context.fill();
        }
    },

    drawMainFunction: function(data) {
        this.init();
        this.data = data;
        this.drawLineChart();
        var lineWrapper = document.querySelector("#" + this.lineWrapperId);
        lineWrapper.appendChild(this.chart);
    },

    drawLineChartGroup: function(dataArray, colorArray) {
        var previousPointSpace,
            previousLineColor,
            previousfillColor,
            previousPxDataRate,
            maxArray;
        
        previousLineColor = this.lineColor;
        previousfillColor = this.fillColor;
        previousPxDataRate = this.pxDataRate;

        maxArray = dataArray.map(function(item, index, array) {
            return Math.max.apply(item);
        });
        
        this.pxDataRate = this.yaxis/(Math.max.apply(maxArray));
        this.init();

        for (var i=0; i<dataArray.length; i++) {
            this.data = dataArray[i];
            this.lineColor = colorArray[i];
            this.fillColor = colorArray[i];
            this.drawLineChart();
        }
        document.querySelector("#"+this.lineWrapperId).appendChild(this.chart);
        
        this.lineColor = previousLineColor;
        this.fillColor = previousfillColor;
        this.pxDataRate = previousPxDataRate;
    }
}