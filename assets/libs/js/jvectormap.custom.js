$(function() {
    "use strict";

    jQuery('#world-map-markers').vectorMap({
        map: 'world_mill_en',
        backgroundColor: 'transparent',
        borderColor: '#818181',
        borderOpacity: 0.25,
        borderWidth: 1,
        zoomOnScroll: false,
        color: '#8b94d6',
        regionStyle: {
            initial: {
                fill: '#8b94d6'
            }
        },
        markerStyle: {
            initial: {
                r: 9,
                'fill': '#fff',
                'fill-opacity': 1,
                'stroke': '#000',
                'stroke-width': 5,
                'stroke-opacity': 0.4
            },
        },
        enableZoom: true,
        hoverColor: '#8b94d6',
        markers: [{
            latLng: [21.00, 78.00],
            name: 'India'

        }],
        hoverOpacity: null,
        normalizeFunction: 'linear',
        scaleColors: ['#b6d6ff', '#005ace'],
        selectedColor: '#c9dfaf',
        selectedRegions: [],
        showTooltip: true,
        onRegionClick: function(element, code, region) {
            var message = 'You clicked "' +
                region +
                '" which has the code: ' +
                code.toUpperCase();

            alert(message);
        }
    });


    $('#india').vectorMap({
        map: 'in_mill',
        backgroundColor: 'transparent',
        zoomOnScroll: false,
        regionStyle: {
            initial: {
                fill: '#64ced3'
            }
        }
    });


    $('#usa').vectorMap({
        map: 'us_aea_en',
        backgroundColor: 'transparent',
        zoomOnScroll: false,
        regionStyle: {
            initial: {
                fill: '#f87ca1'
            }
        }
    });



    $('#australia').vectorMap({
        map: 'au_mill',
        backgroundColor: 'transparent',
        zoomOnScroll: false,
        regionStyle: {
            initial: {
                fill: '#ffe174'
            }
        }
    });

    $('#uk').vectorMap({
        map: 'uk_mill_en',
        backgroundColor: 'transparent',
        zoomOnScroll: false,
        regionStyle: {
            initial: {
                fill: '#ffa47f'
            }
        }
    });

});