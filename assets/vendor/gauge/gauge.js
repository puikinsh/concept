
$(function() {
    "use strict";
    // ============================================================== 
    // Guage 1
    // ============================================================== 
    var opts = {
        angle: 0, // The span of the gauge arc
        lineWidth: 0.32, // The line thickness
        radiusScale: 1, // Relative radius
        pointer: {
            length: 0.6, // // Relative to gauge radius
            strokeWidth: 0.088, // The thickness
            color: '#2e2f39' // Fill color
        },
        limitMax: false, // If false, max value increases automatically if value > maxValue
        limitMin: false, // If true, the min value of the gauge will be fixed
        colorStart: '#e4e4ee', // Colors
        colorStop: '#5969ff', // just experiment with them
        strokeColor: '#e4e4ee', // to see which ones work best for you
        generateGradient: true,
        highDpiSupport: true, // High resolution support

    };
    var target = document.getElementById('gauge1'); // your canvas element
    var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 3000; // set max gauge value
    gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 76; // set animation speed (32 is default value)
    gauge.set(1850); // set actual value


// ============================================================== 
    // Guage 2
    // ============================================================== 


var opts = {
        angle: 0.35, // The span of the gauge arc
        lineWidth: 0.1, // The line thickness
        radiusScale: 1, // Relative radius
        pointer: {
            length: 0.6, // // Relative to gauge radius
            strokeWidth: 0.115, // The thickness
            color: '#2e2f39' // Fill color
        },
        limitMax: false, // If false, max value increases automatically if value > maxValue
        limitMin: false, // If true, the min value of the gauge will be fixed
        colorStart: '#ff407b', // Colors
        colorStop: '#ff407b', // just experiment with them
        strokeColor: '#e4e4ee', // to see which ones work best for you
        generateGradient: true,
        highDpiSupport: true, // High resolution support
        // renderTicks is Optional
        renderTicks: {
            divisions: 5,
            divWidth: 1.1,
            divLength: 0.7,
            divColor: '#333333',
            subDivisions: 3,
            subLength: 0.5,
            subWidth: 0.6,
            subColor: '#666666'
        }

    }; 
    var target = document.getElementById('gauge2'); // your canvas element
    var gauge = new Donut(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 3000; // set max gauge value
    gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 32; // set animation speed (32 is default value)
    gauge.set(1675); // set actual value



// ============================================================== 
    // Guage 3
    // ============================================================== 


 var opts = {
        angle: -0.18, // The span of the gauge arc
        lineWidth: 0.2, // The line thickness
        radiusScale: 1, // Relative radius
        pointer: {
            length: 0.6, // // Relative to gauge radius
            strokeWidth: 0.035, // The thickness
            color: '#2e2f39' // Fill color
        },
        limitMax: false, // If false, max value increases automatically if value > maxValue
        limitMin: false, // If true, the min value of the gauge will be fixed
        colorStart: '#5969ff', // Colors
        colorStop: '#8FC0DA', // just experiment with them
        strokeColor: '#E0E0E0', // to see which ones work best for you
        generateGradient: true,
        highDpiSupport: true, // High resolution support
        // renderTicks is Optional
        renderTicks: {
            divisions: 5,
            divWidth: 1.1,
            divLength: 0.7,
            divColor: '#333333',
            subDivisions: 3,
            subLength: 0.5,
            subWidth: 0.6,
            subColor: '#666666'
        },
        staticZones: [
            { strokeStyle: "rgb(255,0,0)", min: 0, max: 500, height: 1.4 },
            { strokeStyle: "rgb(200,100,0)", min: 500, max: 1000, height: 1.4 },
            { strokeStyle: "rgb(150,150,0)", min: 1000, max: 1500, height: 1.4 },
            { strokeStyle: "rgb(100,200,0)", min: 1500, max: 2000, height: 1.4 },
            { strokeStyle: "rgb(0,255,0)", min: 2000, max: 3100, height: 1.4 }
        ],

    };
    var target = document.getElementById('gauge3'); // your canvas element
    var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 3000; // set max gauge value
    gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 32; // set animation speed (32 is default value)
    gauge.set(1250); // set actual value









  // ============================================================== 
    // Guage 4
    // ============================================================== 




var opts = {
        angle: 0.1, // The span of the gauge arc
        lineWidth: 0.3, // The line thickness
        radiusScale: 1, // Relative radius
        pointer: {
            length: 0.6, // // Relative to gauge radius
            strokeWidth: 0.088, // The thickness
            color: '#000000' // Fill color
        },
        limitMax: false, // If false, max value increases automatically if value > maxValue
        limitMin: false, // If true, the min value of the gauge will be fixed
        colorStart: '#6FADCF', // Colors
        colorStop: '#8FC0DA', // just experiment with them
        strokeColor: '#E0E0E0', // to see which ones work best for you
        generateGradient: true,
        highDpiSupport: true, // High resolution support
        // renderTicks is Optional
        renderTicks: {
            divisions: 5,
            divWidth: 1.1,
            divLength: 0.7,
            divColor: '#333333',
            subDivisions: 3,
            subLength: 0.5,
            subWidth: 0.6,
            subColor: '#666666'
        },
        staticZones: [
            { strokeStyle: "rgb(255,0,0)", min: 0, max: 500, height: 1.4 },
            { strokeStyle: "rgb(200,100,0)", min: 500, max: 1000, height: 1.2 },
            { strokeStyle: "rgb(150,150,0)", min: 1000, max: 1500, height: 1 },
            { strokeStyle: "rgb(100,200,0)", min: 1500, max: 2000, height: 0.8 },
            { strokeStyle: "rgb(0,255,0)", min: 2000, max: 3100, height: 0.6 }
        ],

    };
    var target = document.getElementById('gauge4'); // your canvas element
    var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 3000; // set max gauge value
    gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 76; // set animation speed (32 is default value)
    gauge.set(1600); // set actual value















    });



