var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
Page({
    data: {
    },
    touchHandler: function (e) {
        console.log(lineChart.getCurrentDataIndex(e));
        lineChart.showToolTip(e, {
            // background: '#7cb5ec'
        });
    },    
    createSimulationData: function () {
        var categories = [];
        var data = [];
        for (var i = 7 ; i < 17; i++) {
            categories.push('9.08-' + (i + 1));
            //data.push(Math.random()*(50-10)+5);
            //parseInt(Math.random()*(42-35+1)+42,10);
            data.push(Math.random()*(38-35+1)+35);
        }
        // data[4] = null;
        return {
            categories: categories,
            data: data
        }
    },
    updateData: function () {
        var simulationData = this.createSimulationData();
        var series = [{
            name: '体温1',
            data: simulationData.data,
            format: function (val, name) {
                return val.toFixed(2) + '℃';
            }
        }];
        lineChart.updateData({
            categories: simulationData.categories,
            series: series
        });
    },
    onLoad: function (e) {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        
        var simulationData = this.createSimulationData();
        lineChart = new wxCharts({
            canvasId: 'lineCanvas',
            type: 'line',
            categories: simulationData.categories,
            animation: true,
            background: '#f5f5f5',
            series: [{
                name: '体温1',
                data: simulationData.data,
                format: function (val, name) {
                  return val.toFixed(2) + '℃';
                }
            }],
            xAxis: {
                disableGrid: true
            },
            yAxis: {
                title: '体温（摄氏度）',
                format: function (val) {
                    return val.toFixed(2);
                },
                min: 0
            },
            width: windowWidth,
            height: 200,
            dataLabel: false,
            dataPointShape: true,
            extra: {
                lineStyle: 'curve'
            }
        });
    }
});