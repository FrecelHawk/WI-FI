/**
 * Created by vitamin on 2017/8/25.
 *
 * 路由控制器
 */
define(['app','jquery'], function(app,$){

    return app.controller('routerCtrl', ['$scope','$rootScope','httpService',function ($scope,$rootScope,httpService) {




        $.getJSON('data/router_info.json','',function(result){

              if(result.error==0){
                  $scope.$apply(function(){
                      $scope.mac = result.mac;
                  });
              }
        });


        $.getJSON('data/firmware.json','',function(result){
              if(result.error==0){
                  $scope.$apply(function(){
                      $scope.localfirm_version = result.localfirm_version;
                      $scope.model = result.model;
                  });
              }
        });


        var data = [[0,50],[1,100],[2,150],[3,200],[4,250]];


        var cpuData = [[0,10],[1,20],[2,50],[3,80],[4,100]];


        var memoryData = [[40],[40],[40],[40],[40],[40],[40],[40],[40],[40],[40]];


        var fanData = [['iphone',   45.0],['huawei', 26.8],
            ['xiaomi',    8.5],
            ['其他',   0.7]
        ];

        Highcharts.chart('container', {
            chart: {
                zoomType: 'x',
                width:420,
                height:300
            },credits: {
                enabled: false
            },
            exporting:{
                enabled:false
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                visible:false
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    format: '{value} km'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    enableMouseTracking:false,
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                data: data
            }]
        });

        Highcharts.chart('cpu', {
            chart: {
                zoomType: 'x',
                width:420,
                height:300
            },credits: {
                enabled: false
            },
            exporting:{
                enabled:false
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                visible:false
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    format: '{value} %'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    enableMouseTracking:false,
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                data: cpuData
            }]
        });


        Highcharts.chart('fan',{
            chart: {
                width:420,
                height:320,
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            exporting:{
                enabled:false
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            exporting:{
                enabled:false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        },
                        connectorColor: 'silver'
                    }
                }
            },
            series: [{
                type: 'pie',
                data:fanData}]
        });


        Highcharts.chart('memory', {
            chart: {
                zoomType: 'x',
                width:420,
                height:300
            },credits: {
                enabled: false
            },
            exporting:{
                enabled:false
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                visible:false,

            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    format: '{value} %'
                },
                tickPositions: [10, 20,40,60,80,100]
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    enableMouseTracking:false,
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                data: memoryData
            }]
        });

    }]);

});