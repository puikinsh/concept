$(function() {
    "use strict";
    // ============================================================== 
    // Gender Js
    // ============================================================== 

    Morris.Donut({
        element: 'gender_donut',
        data: [
            { value: 60, label: 'Female' },
            { value: 40, label: 'Male' }

        ],

        labelColor: '#5969ff',
        colors: [
            '#5969ff',
            '#ff407b',

        ],



        formatter: function(x) { return x + "%" }
    });

    // ============================================================== 
    //  chart bar horizontal
    // ============================================================== 
    var ctx = document.getElementById("chartjs_bar_horizontal").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',

        data: {
            labels: ["US", "Brazil", "Canada", "UK", "Australia", "India", "China"],
            datasets: [{
                label: 'Country',
                data: [2800, 24000, 19000, 17000, 14000, 10000, 7000],
                backgroundColor: "rgba(89, 105, 255, 1)",

            }]
        },
        options: {
            responsive: true,
            hover: false,
            legend: {
                display: true,
                position: 'bottom',

                labels: {
                    fontColor: '#71748d',
                    fontFamily: 'Circular Std Book',
                    fontSize: 14,
                }
            },
            scales: {

                legend: {
                    display: false

                },
                yAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        fontSize: 14,
                        fontFamily: 'Circular Std Book',
                        fontColor: '#71748d',
                    }
                }],
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        fontSize: 14,
                        fontFamily: 'Circular Std Book',
                        fontColor: '#71748d',
                    }
                }]



            }
        }
    });



});