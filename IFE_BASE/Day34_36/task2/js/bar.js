/*** Day34~36: task2 bar.js ***/
//解耦前：
/*
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
*/
//解耦后：
histogram = {
    SVGLN: "http://www.w3.org/2000/svg",
    width: 800,
    height: 460,
    initSpace:20,
    data: [],
    xaxis: 0,
    yaxis: 0,
    svgWrapperId: "",
    svg: null,
    barwidth: 30,
    barspace: 30,
    initBarSpace:0,
    barcolor: "green",
    x0: 0,
    y0: 0,
    pxDataRate: 0,

    init: function() {
        this.xaxis = this.width-this.initSpace;
        this.yaxis = this.height-this.initSpace;
        this.x0 = this.initSpace;
        this.y0 = this.initSpace + this.yaxis;
        
        this.svg = document.createElementNS(this.SVGLN, "svg");
        this.svg.setAttribute("xmlns", "http://www.w3.org");
        this.svg.setAttribute("version", "1.1");
        this.svg.setAttribute("width", this.width);
        this.svg.setAttribute("height", this.height);

        var axis = document.createElementNS(this.SVGLN, "polyline");
        var axisHTML = "";
        axisHTML += (this.x0)+","+(this.y0-this.yaxis)+" "+(this.x0)+","+this.y0+" ";
        axisHTML += (this.x0+this.xaxis)+","+(this.y0);
        axis.setAttribute("points", axisHTML);
        axis.setAttribute("fill", "none");
        axis.setAttribute("stroke", "black");
        this.svg.appendChild(axis);

    },

    drawBar: function() {
        var sales = this.data;
        var max = Math.max.apply(null, sales);
        this.pxDataRate = this.yaxis/max;
        
        for (var i=0; i<sales.length; i++) {
            var rectBar = document.createElementNS(this.SVGLN,"rect");
            rectBar.setAttribute("x", this.x0+(this.barspace*(i+1)+this.barwidth*i)+this.initBarSpace);
            rectBar.setAttribute("y", this.y0-sales[i]*this.pxDataRate);
            rectBar.setAttribute("width", this.barwidth);
            rectBar.setAttribute("height", sales[i]*this.pxDataRate);
            rectBar.setAttribute("stroke-width", 0);
            rectBar.setAttribute("fill", this.barcolor);
            this.svg.appendChild(rectBar);
        }
    },

    drawMainFunction: function(data) {
        this.init();
        this.data = data;
        this.drawBar();
        var svgWrapper = document.querySelector("#"+this.svgWrapperId);
        svgWrapper.appendChild(this.svg);
    },

    drawHistogramGroup: function(dataArray, colorArray) {
        var previousBarWidth,
            previousBarSpace,
            previousBarColor,
            previousInitBarSpace,
            previousInitSpace,
            maxArray;

        previousBarColor = this.barcolor;
        previousBarSpace = this.barspace;
        previousInitBarSpace = this.initBarSpace;
        previousBarWidth = this.barwidth;
        prevoiusPxDataRate = this.pxDataRate;

        this.barwidth = 5;
        this.initBarSpace = -8*this.barwidth;
        this.barspace = (this.xaxis/(dataArray[0].length))-10;
        maxArray = dataArray.map(function(item, index, array) {
            return Math.max.apply(item);
        });
        this.pxDataRate = this.yaxis/(Math.max.apply(maxArray));

        this.init();
        for (var i=0; i<dataArray.length; i++) {
            this.data = dataArray[i];
            this.initBarSpace = this.initBarSpace + this.barwidth;
            this.barcolor = colorArray[i];
            this.drawBar();
        }
        document.querySelector("#"+this.svgWrapperId).appendChild(this.svg);
        this.barcolor = previousBarColor;
        this.barspace = previousBarSpace;
        this.initBarSpace = previousInitBarSpace;
        this.barwidth = previousBarWidth;
        this.pxDataRate= prevoiusPxDataRate;
    }
}
