/*
Template Name: Influence Admin Template
Author: jitu
Email: chauhanjitu3@gmail.com
File: js
*/
$(function() {
    "use strict";
    
    // ============================================================== 
    // Revenue Cards
    // ============================================================== 
    $("#sparkline-revenue").sparkline([5, 5, 7, 7, 9, 5, 3, 5, 2, 4, 6, 7], {
        type: 'line',
        width: '99.5%',
        height: '100',
        lineColor: '#5969ff',
        fillColor: '',
        lineWidth: 2,
        spotColor: undefined,
        minSpotColor: undefined,
        maxSpotColor: undefined,
        highlightSpotColor: undefined,
        highlightLineColor: undefined,
        resize:true
    });



    $("#sparkline-revenue2").sparkline([3, 7, 6, 4, 5, 4, 3, 5, 5, 2, 3, 1], {
        type: 'line',
        width: '99.5%',
        height: '100',
        lineColor: '#ff407b',
        fillColor: '',
        lineWidth: 2,
        spotColor: undefined,
        minSpotColor: undefined,
        maxSpotColor: undefined,
        highlightSpotColor: undefined,
        highlightLineColor: undefined,
        resize:true
    });



    $("#sparkline-revenue3").sparkline([5, 3, 4, 6, 5, 7, 9, 4, 3, 5, 6, 1], {
        type: 'line',
        width: '99.5%',
        height: '100',
        lineColor: '#25d5f2',
        fillColor: '',
        lineWidth: 2,
        spotColor: undefined,
        minSpotColor: undefined,
        maxSpotColor: undefined,
        highlightSpotColor: undefined,
        highlightLineColor: undefined,
        resize:true
    });



    $("#sparkline-revenue4").sparkline([6, 5, 3, 4, 2, 5, 3, 8, 6, 4, 5, 1], {
        type: 'line',
        width: '99.5%',
        height: '100',
        lineColor: '#ffc750',
        fillColor: '',
        lineWidth: 2,
        spotColor: undefined,
        minSpotColor: undefined,
        maxSpotColor: undefined,
        highlightSpotColor: undefined,
        highlightLineColor: undefined,
        resize:true,
    });
    // ============================================================== 
    // Chart Balance Bar
    // ============================================================== 
    var ctx = document.getElementById("chartjs_balance_bar").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',

        
        data: {
            labels: ["Current", "1-30", "31-60", "61-90", "91+"],
            datasets: [{
                label: 'Aged Payables',
                data: [500, 1000, 1500, 3700, 2500],
                backgroundColor: "rgba(89, 105, 255,.8)",
                borderColor: "rgba(89, 105, 255,1)",
                borderWidth:2

            }, {
                label: 'Aged Receiables',
                data: [1000, 1500, 2500, 3500, 2500],
                backgroundColor: "rgba(255, 64, 123,.8)",
                borderColor: "rgba(255, 64, 123,1)",
                borderWidth:2


            }]

        },
        options: {
            legend: {
                    display: true,

                    position: 'bottom',

                    labels: {
                        fontColor: '#71748d',
                        fontFamily:'Circular Std Book',
                        fontSize: 14,
                    }
            },

                scales: {
                    xAxes: [{
                ticks: {
                    fontSize: 14,
                     fontFamily:'Circular Std Book',
                     fontColor: '#71748d',
                }
            }],
            yAxes: [{
                ticks: {
                    fontSize: 14,
                     fontFamily:'Circular Std Book',
                     fontColor: '#71748d',
                }
            }]
                }
    }



});
 
    
    // ============================================================== 
    // Gross Profit Margin
    // ============================================================== 
   Morris.Donut({
                element: 'morris_gross',

                data: [
                    { value: 94, label: 'Budget' },
                    { value: 15, label: '' }
                   
                ],
             
                labelColor: '#5969ff',

                colors: [
                    '#5969ff',
                    '#a8b0ff'
                   
                ],

                formatter: function(x) { return x + "%" },
                  resize: true

            });

    // ============================================================== 
    // Net Profit Margin
    // ============================================================== 
    Morris.Donut({
                element: 'morris_profit',

                data: [
                    { value: 93, label: 'Profit' },
                    { value: 15, label: '' }
                   
                ],
             
                labelColor: '#ff407b',


                colors: [
                    '#ff407b',
                    '#ffd5e1'
                   
                ],

                formatter: function(x) { return x + "%" },
                  resize: true

            });




    // ============================================================== 
    //EBIT Morris
    // ============================================================== 

    Morris.Bar({
        element: 'ebit_morris',
        data: [
            { x: '2011 Q1', y: 20000 },
            { x: '2011 Q2', y: 24000 },
            { x: '2011 Q3', y: 33000 },
            { x: '2011 Q4', y: 40000 },
            { x: '2012 Q1', y: 25000 },
            { x: '2012 Q2', y: 70000 },
            { x: '2012 Q3', y: 52000 },
            { x: '2012 Q4', y: 39000 },
            { x: '2013 Q1', y: 80000 }
        ],
        xkey: 'x',
        ykeys: ['y'],
        labels: ['Y'],
        barColors: ['#ff407b'],
        preUnits: ["$"]

    });





    // ============================================================== 
    //EBIT Morris
    // ============================================================== 
    var a = c3.generate({
        bindto: "#goodservice",
        size: { height: 350 },
        color: { pattern: ["#5969ff", "#ff407b"] },
        data: {
            columns: [
                ["Service", 20000, 25000, 30000, 80000, 10000, 50000],
                ["Average", 25000, 25000, 25000, 25000, 25000, 25000]
            ],
            types: { Service: "bar" }
        },
        bar: {

            width: 45

        },
        legend: {
  show: true
},
        axis: {
            y: {
                tick: {
                    format: d3.format("$")
                }
            }

        },

    });



    // ============================================================== 
    // Disputed vs Overdue Invoices
    // ============================================================== 
    var data = {
        labels: ['Disputed Invoice', 'Overdue Invoice'],
        series: [20, 15]
    };

    var options = {
        labelInterpolationFnc: function(value) {
            return value[0]
        }
    };

    var responsiveOptions = [
        ['screen and (min-width: 640px)', {
            chartPadding: 30,
            labelOffset: 100,
            labelDirection: 'explode',
            labelInterpolationFnc: function(value) {
                return value;
            }
        }],
        ['screen and (min-width: 1024px)', {
            labelOffset: 80,
            chartPadding: 20
        }]
    ];

    new Chartist.Pie('.ct-chart-invoice', data, options, responsiveOptions);


    // ============================================================== 
    // Disputed vs Overdue Invoices
    // ============================================================== 

    new Chartist.Line('.ct-chart-line-invoice', {
        labels: ['Jan 2018', 'Mar 2018', 'May 2018', 'Jul 2018', 'Sep 2018', 'Oct 2018', 'Nov 2018'],
        series: [
            [12, 8, 6, 7, 3, 2.5, 7, 8],
            [7, 7, 7, 7, 7, 7, 7, 7]

        ]
    }, {
        fullWidth: true,
        chartPadding: {
            right: 40
        },
        axisY: {
            labelInterpolationFnc: function(value) {
                return '$'+ (value / 1000);
            }
        },


    });



    // ============================================================== 
    // Accounts Payable Age
    // ============================================================== 

    var chart = c3.generate({
        bindto: "#account",
        color: { pattern: ["#5969ff", "#ff407b", "#25d5f2", "#ffc750"] },
        data: {
            // iris data from R
            columns: [
                ['30 days', 120],
                ['60 days', 70],
                ['90 days', 50],
                 ['90+ Days', 30],

            ],
            type: 'pie',
            
        }
    });

    setTimeout(function() {
        chart.load({
            
        });
    }, 1500);

    setTimeout(function() {
        chart.unload({
            ids: 'data1'
        });
        chart.unload({
            ids: 'data2'
        });
    }, 
    2500
    );

    // ============================================================== 
    // Working Capital
    // ============================================================== 

    // // Use Morris.Area instead of Morris.Line
    Morris.Area({
        element: 'capital',
        behaveLikeLine: true,



        data: [
            { x: '2010 Q1', y: 20000 },
            { x: '2010 Q2', y: 24000 },
            { x: '2010 Q3', y: 33000 },
            { x: '2010 Q4', y: 40000 },
            { x: '2011 Q1', y: 25000 },
            { x: '2011 Q2', y: 70000 },
            { x: '2011 Q3', y: 52000 },
            { x: '2012 Q1', y: 39000 },
            { x: '2012 Q2', y: 80000 }
        ],
        xkey: 'x',
        ykeys: ['y'],
        labels: ['Y'],
        lineColors: ['#ff407b'],
        preUnits: ["$"]



    });
   
    // ============================================================== 
    // Working Capital
    // ============================================================== 
    new Chartist.Bar('.ct-chart-inventory', {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        series: [
            [800000, 1200000, 1400000, 1300000],
            [200000, 400000, 500000, 300000],
            [100000, 200000, 400000, 600000]
        ]
    }, {
        stackBars: true,
        axisY: {
            labelInterpolationFnc: function(value) {
                return  '$' + (value / 1000);
            }
        }
    }).on('draw', function(data) {
        if (data.type === 'bar') {
            data.element.attr({
                style: 'stroke-width: 30px'
            });
        }
    });




});