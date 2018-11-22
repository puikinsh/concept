(function(window, document, $, undefined) {
    "use strict";
    $(function() {

        if ($('.ct-chart-line').length) {
            new Chartist.Line('.ct-chart-line', {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                series: [
                    [12, 9, 7, 8, 5],
                    [2, 1, 3.5, 7, 3],
                    [1, 3, 4, 5, 6]
                ]
            }, {
                fullWidth: true,
                chartPadding: {
                    right: 40
                },
                axisY: {
                    
                }
            });

        }


        if ($('.ct-chart-holes').length) {
            var chart = new Chartist.Line('.ct-chart-holes', {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
                series: [
                    [5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9],
                    [10, 15, null, 12, null, 10, 12, 15, null, null, 12, null, 14, null, null, null],
                    [null, null, null, null, 3, 4, 1, 3, 4, 6, 7, 9, 5, null, null, null],
                    [{ x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: undefined }, { x: 6, y: 4 }, { x: 7, y: null }, { x: 8, y: 4 }, { x: 9, y: 4 }]
                ]

            }, {
                fullWidth: true,


                chartPadding: {
                    right: 10
                },
                axisY: {
                  
                },

                low: 0

            });
        }

        if ($('.ct-chart-wnumbers').length) {
            new Chartist.Line('.ct-chart-wnumbers', {
                labels: [1, 2, 3, 4, 5, 6, 7, 8],
                series: [
                    [1, 2, 3, 1, -2, 0, 1, 0],
                    [-2, -1, -2, -1, -3, -1, -2, -1],
                    [0, 0, 0, 1, 2, 3, 2, 1],
                    [3, 2, 1, 0.5, 1, 0, -1, -3]
                ]
            }, {
                high: 3,
                low: -3,
                fullWidth: true,
                // As this is axis specific we need to tell Chartist to use whole numbers only on the concerned axis
                axisY: {
                    onlyInteger: true,
                    offset: 20,
                    
                },

            });
        }


        if ($('.ct-chart-scatter').length) {
            var times = function(n) {
                return Array.apply(null, new Array(n));
            };

            var data = times(52).map(Math.random).reduce(function(data, rnd, index) {
                data.labels.push(index + 1);
                data.series.forEach(function(series) {
                    series.push(Math.random() * 100)
                });

                return data;
            }, {
                labels: [],
                series: times(4).map(function() { return new Array() })
            });

            var options = {
                showLine: false,
                axisX: {
                    labelInterpolationFnc: function(value, index) {
                        return index % 13 === 0 ? 'W' + value : null;
                    }
                },
                axisY: {
                    labelInterpolationFnc: function(value) {
                        return '$' + (value / 1000);
                    }
                }

            };

            var responsiveOptions = [
                ['screen and (min-width: 640px)', {
                    axisX: {
                        labelInterpolationFnc: function(value, index) {
                            return index % 4 === 0 ? 'W' + value : null;
                        }
                    }

                }]
            ];

            new Chartist.Line('.ct-chart-scatter', data, options, responsiveOptions);
        }


        if ($('.ct-chart-area').length) {
            new Chartist.Line('.ct-chart-area', {
                    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    series: [
                        [5, 9, 7, 8, 5, 3, 5, 4, 10, 4]
                    ]
                },


                {
                    low: 0,
                    showArea: true,
                    
                });
        }


        if ($('.ct-chart-polar').length) {
            new Chartist.Line('.ct-chart-polar', {
                labels: [1, 2, 3, 4, 5, 6, 7, 8],
                series: [
                    [1, 2, 3, 1, -2, 0, 1, 0],
                    [-2, -1, -2, -1, -2.5, -1, -2, -1],
                    [0, 0, 0, 1, 2, 2.5, 2, 1],
                    [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5]
                ]
            }, {
                high: 3,
                low: -3,
                showArea: true,
                showLine: false,
                showPoint: false,
                fullWidth: true,
                axisX: {
                    showLabel: false,
                    showGrid: false
                },
               
            });
        }

        if ($('.ct-chart-scatter-bar').length) {
            new Chartist.Bar('.ct-chart-scatter-bar', {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                series: [
                    [800000, 1200000, 1400000, 1300000],
                    [200000, 400000, 500000, 300000],
                    [100000, 200000, 400000, 600000]
                ]
            }, {
                stackBars: true,
                axisY: {
                    
                }
            }).on('draw', function(data) {
                if (data.type === 'bar') {
                    data.element.attr({
                        style: 'stroke-width: 30px'
                    });
                }
            });
        }

        if ($('.ct-chart-multilines').length) {
            new Chartist.Bar('.ct-chart-multilines', {
                labels: ['First quarter of the year', 'Second quarter of the year', 'Third quarter of the year', 'Fourth quarter of the year'],
                series: [
                    [60000, 40000, 80000, 70000],
                    [40000, 30000, 70000, 65000],
                    [8000, 3000, 10000, 6000]
                ]
            }, {
                seriesBarDistance: 10,
                axisX: {
                    offset: 60
                },
                axisY: {
                    offset: 80,
                    labelInterpolationFnc: function(value) {
                        return value + ' CHF'
                    },
                    scaleMinSpace: 15
                }
            });
        }

        if ($('.ct-chart-bipolar').length) {
            var data = {
                labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
                series: [
                    [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
                ]
            };

            var options = {
                high: 10,
                low: -10,
                axisX: {
                    labelInterpolationFnc: function(value, index) {
                        return index % 2 === 0 ? value : null;
                    }
                },
                axisY: {
                    
                }
            };

            new Chartist.Bar('.ct-chart-bipolar', data, options);
        }

        if ($('.ct-chart-events').length) {
            // Create a simple bi-polar bar chart
            var chart = new Chartist.Bar('.ct-chart-events', {
                labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
                series: [
                    [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
                ]
            }, {
                high: 10,
                low: -10,
                axisX: {
                    labelInterpolationFnc: function(value, index) {
                        return index % 2 === 0 ? value : null;
                    }
                },
                axisY: {
                    
                }
            });

            // Listen for draw events on the bar chart
            chart.on('draw', function(data) {
                // If this draw event is of type bar we can use the data to create additional content
                if (data.type === 'bar') {
                    // We use the group element of the current series to append a simple circle with the bar peek coordinates and a circle radius that is depending on the value
                    data.group.append(new Chartist.Svg('circle', {
                        cx: data.x2,
                        cy: data.y2,
                        r: Math.abs(Chartist.getMultiValue(data.value)) * 1 + 7
                    }, 'ct-slice-pie'));
                }
            });
        }

        if ($('.ct-chart-pie').length) {
            var data = {
                series: [5, 3, 4]
            };

            var sum = function(a, b) { return a + b };

            new Chartist.Pie('.ct-chart-pie', data, {
                labelInterpolationFnc: function(value) {
                    return Math.round(value / data.series.reduce(sum) * 100) + '%';
                }
            });
        }


        if ($('.ct-chart-donut').length) {
            new Chartist.Pie('.ct-chart-donut', {
                series: [20, 10, 30, 40]
            }, {
                donut: true,
                donutWidth: 60,
                donutSolid: true,
                startAngle: 270,
                showLabel: true
            });
        }


        if ($('.ct-chart-animated').length) {
            var chart = new Chartist.Pie('.ct-chart-animated', {
                    series: [50, 20, 30, 20, 5, 20, 15],
                    labels: [1, 2, 3, 4, 5, 6, 7]
                },


                {
                    donut: true,
                    showLabel: false



                });

            chart.on('draw', function(data) {
                if (data.type === 'slice') {
                    // Get the total path length in order to use for dash array animation
                    var pathLength = data.element._node.getTotalLength();

                    // Set a dasharray that matches the path length as prerequisite to animate dashoffset
                    data.element.attr({
                        'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
                    });

                    // Create animation definition while also assigning an ID to the animation for later sync usage
                    var animationDefinition = {
                        'stroke-dashoffset': {
                            id: 'anim' + data.index,
                            dur: 1000,
                            from: -pathLength + 'px',
                            to: '0px',
                            easing: Chartist.Svg.Easing.easeOutQuint,
                            // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
                            fill: 'freeze'
                        }
                    };

                    // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
                    if (data.index !== 0) {
                        animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
                    }

                    // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
                    data.element.attr({
                        'stroke-dashoffset': -pathLength + 'px'
                    });

                    // We can't use guided mode as the animations need to rely on setting begin manually
                    // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
                    data.element.animate(animationDefinition, false);
                }
            });

            // For the sake of the example we update the chart every time it's created with a delay of 8 seconds
            chart.on('created', function() {
                if (window.__anim21278907124) {
                    clearTimeout(window.__anim21278907124);
                    window.__anim21278907124 = null;
                }
                window.__anim21278907124 = setTimeout(chart.update.bind(chart), 10000);
            });
        }


        if ($('.ct-chart-animation').length) {
            var chart = new Chartist.Line('.ct-chart-animation', {
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                series: [
                    [12, 9, 7, 8, 5, 4, 6, 2, 3, 3, 4, 6],
                    [4, 5, 3, 7, 3, 5, 5, 3, 4, 4, 5, 5],
                    [5, 3, 4, 5, 6, 3, 3, 4, 5, 6, 3, 4],
                    [3, 4, 5, 6, 7, 6, 4, 5, 6, 7, 6, 3]
                ]
            }, {
                low: 0
            });

            // Let's put a sequence number aside so we can use it in the event callbacks
            var seq = 0,
                delays = 80,
                durations = 500;

            // Once the chart is fully created we reset the sequence
            chart.on('created', function() {
                seq = 0;
            });

            // On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
            chart.on('draw', function(data) {
                seq++;

                if (data.type === 'line') {
                    // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
                    data.element.animate({
                        opacity: {
                            // The delay when we like to start the animation
                            begin: seq * delays + 1000,
                            // Duration of the animation
                            dur: durations,
                            // The value where the animation should start
                            from: 0,
                            // The value where it should end
                            to: 1
                        }
                    });
                } else if (data.type === 'label' && data.axis === 'x') {
                    data.element.animate({
                        y: {
                            begin: seq * delays,
                            dur: durations,
                            from: data.y + 100,
                            to: data.y,
                            // We can specify an easing function from Chartist.Svg.Easing
                            easing: 'easeOutQuart'
                        }
                    });
                } else if (data.type === 'label' && data.axis === 'y') {
                    data.element.animate({
                        x: {
                            begin: seq * delays,
                            dur: durations,
                            from: data.x - 100,
                            to: data.x,
                            easing: 'easeOutQuart'
                        }
                    });
                } else if (data.type === 'point') {
                    data.element.animate({
                        x1: {
                            begin: seq * delays,
                            dur: durations,
                            from: data.x - 10,
                            to: data.x,
                            easing: 'easeOutQuart'
                        },
                        x2: {
                            begin: seq * delays,
                            dur: durations,
                            from: data.x - 10,
                            to: data.x,
                            easing: 'easeOutQuart'
                        },
                        opacity: {
                            begin: seq * delays,
                            dur: durations,
                            from: 0,
                            to: 1,
                            easing: 'easeOutQuart'
                        }
                    });
                } else if (data.type === 'grid') {
                    // Using data.axis we get x or y which we can use to construct our animation definition objects
                    var pos1Animation = {
                        begin: seq * delays,
                        dur: durations,
                        from: data[data.axis.units.pos + '1'] - 30,
                        to: data[data.axis.units.pos + '1'],
                        easing: 'easeOutQuart'
                    };

                    var pos2Animation = {
                        begin: seq * delays,
                        dur: durations,
                        from: data[data.axis.units.pos + '2'] - 100,
                        to: data[data.axis.units.pos + '2'],
                        easing: 'easeOutQuart'
                    };

                    var animations = {};
                    animations[data.axis.units.pos + '1'] = pos1Animation;
                    animations[data.axis.units.pos + '2'] = pos2Animation;
                    animations['opacity'] = {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'easeOutQuart'
                    };

                    data.element.animate(animations);
                }
            });

            // For the sake of the example we update the chart every time it's created with a delay of 10 seconds
            chart.on('created', function() {
                if (window.__exampleAnimateTimeout) {
                    clearTimeout(window.__exampleAnimateTimeout);
                    window.__exampleAnimateTimeout = null;
                }
                window.__exampleAnimateTimeout = setTimeout(chart.update.bind(chart), 12000);
            });



        }

        if ($('.ct-chart-horizontal').length) {
            new Chartist.Bar('.ct-chart-horizontal', {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                series: [
                    [5, 4, 3, 7, 5, 10, 3],
                    [3, 2, 9, 5, 4, 6, 4]
                ]
            }, {
                seriesBarDistance: 10,
                reverseData: true,
                horizontalBars: true,
                axisY: {
                    offset: 70
                }
            });

        }







    });

})(window, document, window.jQuery);