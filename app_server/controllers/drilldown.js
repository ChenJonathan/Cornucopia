/**
 * Created by kevitian on 7/6/2016.
 */
// var data = function () {
//     var tmp = null;
//     $.ajax({
//         async: false,
//         type: "GET",
//         url: '/metricsdash/veracode',
//         data: {appName: $.query.get("appName")},
//         success: function (data) {
//             tmp = data;
//         }
//     });
//     return tmp;
// }();
var globalData;

//get data from ajax call and store it in a global variable
function ajax1() {
    var tmp = null;
    $.ajax({
        async: false,
        type: "GET",
        url: '/metricsdash/veracode',
        data: {appName: $.query.get("appName")},
        success: function (data) {
            globalData = data;
            tmp = data;
        }
    });

    return tmp;
}

//wait for document to load
$(function () {
    'use strict';

    //initializes tooltips
    $('[data-toggle="tooltip"]').tooltip();


    //changes the name of the page to whatever app is being used
    var name = $.query.get('appName');
    document.getElementById("header").innerHTML = name;

    //settings for timeline
    var lineOptions = {
        animateScale: true,
        responsive: true,
        maintainAspectRatio: false,
        tension:0,
        tooltips: {
            enabled: true
        },
        scales: {
            yAxes: [{
                type: 'linear',
                ticks: {
                    min: 0
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Number of Flaws'
                }
            }],
            xAxes: [{
                type: 'time',
                ticks: {
                    fontSize: 10,
                    maxRotation: 0,
                    //maxTicksLimit: 12
                },
                // time: {
                //     format: false,
                //     unit: 'month',
                //     // Sets the display format used in tooltip generation
                //     // tooltipFormat: ''
                // },
                scaleLabel: {
                    display: true,
                    labelString: 'Scan Date'
                }
            }]
        }
    };

    //locate the canvas for the pie chart
    var flawchart = document.getElementById('flawdis');
    var context = flawchart.getContext('2d');
    
    //wait for ajax call to complete (to ensure globalData has been initialized), then call a bunch of methods
    $.when(ajax1()).done(function () {
        drawPieChart(globalData);
        generateDynatable(globalData);
        populateRemediation(globalData);
        populateTopFlaws(globalData);
        populateDetailedFlaws(globalData);
        //parseTester(globalData, 4);
        // var tabrootID = 'sev0info';
        // createWell(tabrootID);
        // addTab(1, 'CRLF Injection', tabrootID);
        // addTab(2, 'Cryptographic Issues', tabrootID);
    });

    //severityLevel is a number from 0 - 5
    function populateDetailedFlaws(data) {

        //loops through each severity
        for (var severityLevel = 0; severityLevel < 6; severityLevel++) {
            var arrayName = 'sev' + severityLevel.toString() + 'FlawInfo';
            var panelID = "sev" + severityLevel.toString() + "info";
            if (data[arrayName].length > 0) {
                createWell(panelID);
            }
            //for each severity, loop through all the categories
            for (var i = 0; i < data[arrayName].length; i++) {
                //for each category, create a new tab listing
                addTab(i, data[arrayName][i][0]["categoryName"], panelID);
                var totalMitigated = 0;
                var totalUnmitigated = 0;
                //for each flaw in each category, add to the category
                for (var k = 0; k < data[arrayName][i].length; k++) {
                    addTabContent('item-' + panelID + '-' + i.toString(), data[arrayName][i][k]["flawName"]
                        + '<span class="badge badge-warning">' + "Unmitigated: " + data[arrayName][i][k]["unmitigatedCount"] + '</span>'
                        + '<span class="badge badge-info">' + "Mitigated: " + data[arrayName][i][k]["mitigatedCount"] + '</span>');
                    totalMitigated += data[arrayName][i][k]["mitigatedCount"];
                    totalUnmitigated += data[arrayName][i][k]["unmitigatedCount"];
                }

                $('<li class="list-group-item clearfix" data-toggle="collapse" id = "totalFlawCount">' + 'Total Mitigated: ' + totalMitigated + ' | Total Unmitigated: ' + totalUnmitigated + '</li>').appendTo('#' + 'item-' + panelID + '-' + i.toString());
                //addTabContent('item-' + panelID + '-' + i.toString(), 'Total Mitigated: ' + totalMitigated + ' | Total Unmitigated: ' + totalUnmitigated);
            }
        }
    }

    function createWell(tabrootID) {
        // $('<div class="list-group list-group-root well" id = "' + tabrootID + 'tabroot" > </div>').appendTo('#' + tabrootID);
        $('#' + tabrootID).html('<div class="list-group list-group-root well" id = "' + tabrootID + 'tabroot" > </div>')
    }

    //tabnum simple increments the item number of the tab
    //tabname should be the name of the flaw category
    //tabrootID should be the name of the severity level
    function addTab(tabnum, tabName, tabrootID) {
        //create tab
        $('<a href="#item-' + tabrootID + '-' + tabnum.toString() + '" class="list-group-item list-group-item-top" data-toggle="collapse"> <i class="glyphicon glyphicon-chevron-right"></i>' + tabName + '</a>').appendTo('#' + tabrootID + 'tabroot');
        
        //create dropdown
        $('<div class="list-group collapse in" id="item-' + tabrootID + '-' + tabnum + '">').appendTo('#' + tabrootID + 'tabroot');
        
        // addTabContent('item-' + tabnum.toString(), 'swag');
        // addTabContent('item-' + tabnum.toString(), 'turnup');
        // addTabContent('item-' + tabnum.toString(), 'so dynamic!');
        // addTabContent('item-' + tabnum.toString(), 'waow');

    }

    //contentID links to the list tab that the content is placed under: comes in the form of 'item-#'
    function addTabContent(contentId, content) {
        //add content to specified dropdown content
        $('<li class="list-group-item clearfix" data-toggle="collapse">' + content + '</li>').appendTo('#' + contentId);
    }


    //updates the top flaws
    function populateTopFlaws(data) {
        //changes the flaw text
        $("#topflaw1").contents().last().replaceWith(data["topFlaws"][0]["flawName"]);
        $("#topflaw2").contents().last().replaceWith(data["topFlaws"][1]["flawName"]);
        $("#topflaw3").contents().last().replaceWith(data["topFlaws"][2]["flawName"]);
        $("#topflaw4").contents().last().replaceWith(data["topFlaws"][3]["flawName"]);
        $("#topflaw5").contents().last().replaceWith(data["topFlaws"][4]["flawName"]);
        //changes the count
        $("#topflaw1num").text(data["topFlaws"][0]["unmitigatedCount"]);
        $("#topflaw2num").text(data["topFlaws"][1]["unmitigatedCount"]);
        $("#topflaw3num").text(data["topFlaws"][2]["unmitigatedCount"]);
        $("#topflaw4num").text(data["topFlaws"][3]["unmitigatedCount"]);
        $("#topflaw5num").text(data["topFlaws"][4]["unmitigatedCount"]);
        //changes the tooltip to show severity
        $("#topflaw1").data('tooltip', false).tooltip({
            title: data["topFlaws"][0]["severityLevel"],
            placement: "bottom"
        });
        $("#topflaw2").data('tooltip', false).tooltip({
            title: data["topFlaws"][1]["severityLevel"],
            placement: "bottom"
        });
        $("#topflaw3").data('tooltip', false).tooltip({
            title: data["topFlaws"][2]["severityLevel"],
            placement: "bottom"
        });
        $("#topflaw4").data('tooltip', false).tooltip({
            title: data["topFlaws"][3]["severityLevel"],
            placement: "bottom"
        });
        $("#topflaw5").data('tooltip', false).tooltip({
            title: data["topFlaws"][4]["severityLevel"],
            placement: "bottom"
        });
    }

    //updates the remediation status panel
    function populateRemediation(data) {
        $("#remednew").text(data["current"][0]["new flaws"]);
        $("#remedopen").text(data["current"][0]["open flaws"]);
        $("#remedreopened").text(data["current"][0]["reopened flaws"]);
        $("#remedfixed").text(data["current"][0]["fixed flaws"]);
        $("#remedmitigated").text(data["current"][0]["total flaws"] - data["current"][0]["unmitigated flaws"]);

    }

    //creates the flaw distribution pie chart
    function drawPieChart(data) {
        var pieData = {
            labels: [
                "Informational Flaws",
                "Very Low Risk Flaws",
                "Low Risk Flaws",
                "Medium Risk Flaws",
                "High Risk Flaws",
                "Very High Risk Flaws"
            ],
            datasets: [
                {
                    data: [
                        data["current"][0]["severity 0 flaws"],
                        data["current"][0]["severity 1 flaws"],
                        data["current"][0]["severity 2 flaws"],
                        data["current"][0]["severity 3 flaws"],
                        data["current"][0]["severity 4 flaws"],
                        data["current"][0]["severity 5 flaws"]
                    ],
                    backgroundColor: [
                        "#8dbd3e",
                        "#c9da2c",
                        "#ffcc33",
                        "#fd7333",
                        "#e61f25",
                        "#d92b85"],
                    hoverBackgroundColor: [
                        "#8dbd3e",
                        "#c9da2c",
                        "#ffcc33",
                        "#fd7333",
                        "#e61f25",
                        "#d92b85"],
                }]
        };

        //checks if there are no flaws
        if (data["current"][0]["severity 0 flaws"] + data["current"][0]["severity 1 flaws"] + data["current"][0]["severity 2 flaws"] + data["current"][0]["severity 3 flaws"]
            + data["current"][0]["severity 4 flaws"] + data["current"][0]["severity 5 flaws"] == 0) {


            $('#flawpanel').html("No Flaws!");
            // context.font = "35px";
            // context.textAlign = "center";
            // context.textBaseline = "middle";
            // context.fillStyle = Chart.defaults.global.scaleFontColor;
            //
            // var panel = document.getElementById('flawpanel');
            //
            // context.fillText("No flaws!", panel.clientWidth / 2, panel.clientHeight / 2);

        } else {
            //create the chart
            var myPieChart = new Chart(flawchart, {
                type: 'doughnut',
                data: pieData,
                options: {
                    animateScale: true,
                    responsive: true,
                    maintainAspectRatio: false
                }
            })
        }
        ;

    }

    function generateDynatable(data) {
        $('#appinfo').dynatable({
            table: {
                defaultColumnIdStyle: 'lowercase'
            },
            dataset: {
                records: data.modules
            },
            features: {
                paginate: false,
                sort: false,
                pushState: false,
                search: false,
                recordCount: false,
                perPageSelect: false
            }
        });
    }

    function newDate(date) {
        return moment.utc(date).toDate();
    }


    function parseFlawsData(data, flawName) {
        var label;
        if (flawName.localeCompare("totalFlaws") == 0) {
            label = "Total Flaws"
        } else {
            label = "Unmitigated Flaws"
        }
        var flawData = {
            labels: [new Date()],
            datasets: [
                {
                    // label: "Label here",
                    // fill: false,
                    // strokeColor : "#ACC26D",
                    // pointColor : "#fff",
                    // pointStrokeColor : "#9DB86D",
                    label: label,
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 5,
                    pointHitRadius: 10,
                    data: [{
                        x: newDate(data[flawName][0]["scanDate"]),
                        y: data[flawName][0]["numFlaws"]
                    }, {
                        x: newDate(data[flawName][1]["scanDate"]),
                        y: data[flawName][1]["numFlaws"]
                    }, {
                        x: newDate(data[flawName][2]["scanDate"]),
                        y: data[flawName][2]["numFlaws"]
                    }, {
                        x: newDate(data[flawName][3]["scanDate"]),
                        y: data[flawName][3]["numFlaws"]
                    }, {
                        x: newDate(data[flawName][4]["scanDate"]),
                        y: data[flawName][4]["numFlaws"]
                    }, {
                        x: newDate(data[flawName][5]["scanDate"]),
                        y: data[flawName][5]["numFlaws"]
                    }, {
                        x: newDate(data[flawName][6]["scanDate"]),
                        y: data[flawName][6]["numFlaws"]
                    }, {
                        x: newDate(data[flawName][7]["scanDate"]),
                        y: data[flawName][7]["numFlaws"]
                    }, {
                        x: newDate(data[flawName][8]["scanDate"]),
                        y: data[flawName][8]["numFlaws"]
                    }, {
                        x: newDate(data[flawName][9]["scanDate"]),
                        y: data[flawName][9]["numFlaws"]
                    }]
                }
            ]
        }

        return flawData;
    }


    var ctx1 = $("#myChart1").get(0).getContext("2d");
    var myLineChart1 = new Chart(ctx1, {
        type: 'line',
        data: parseFlawsData(globalData, "totalFlaws"),
        options: lineOptions
    });
    // var myLineChart1 = new Chart(ctx1).Line(data, line_chart_options);

    var ctx2 = $("#myChart2").get(0).getContext("2d");
    var myLineChart2;

    $('#tab1').on('shown.bs.tab', function (e) {
        myLineChart2.destroy();
        myLineChart1 = new Chart(ctx1, {
            type: 'line',
            data: parseFlawsData(globalData, "totalFlaws"),
            options: lineOptions
        });
        //myLineChart1 = new Chart(ctx1).Line(data, line_chart_options);
    });

    $('#tab2').on('shown.bs.tab', function (e) {
        myLineChart1.destroy();
        myLineChart2 = new Chart(ctx2, {
            type: 'line',
            data: parseFlawsData(globalData, "unmitigatedFlaws"),
            options: lineOptions
        });
        // myLineChart2 = new Chart(ctx2).Line(data, line_chart_options);
    });

    $(function () {

        $('.list-group-item').on('click', function () {
            $('.glyphicon', this)
                .toggleClass('glyphicon-chevron-right')
                .toggleClass('glyphicon-chevron-down');
        });

    });
});





