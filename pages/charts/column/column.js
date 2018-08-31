var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var columnChart = null;
var chartData = {
    main: {
        title: '心率量',
        data: [87, 90, 94, 93],
        categories: ['8:00', '9:00', '10:00', '11:00']
    },
    sub: [{
        title: '8:00',
        data: [110, 70],
        categories: ['高压', '低压' ]
    }, 
     {
        title: '9:00',
        data: [114, 75],
        categories: ['高压', '低压' ]
    }, {
        title: '10:00',
        data: [115, 80],
        categories: ['高压', '低压']                
    }, {
        title: '11:00',
        data: [120, 79],
        categories: ['高压', '低压']
    }]
};
Page({
    data: {
        chartTitle: '心率量',
        isMainChartDisplay: true
    },
    backToMainChart: function () {
        this.setData({
            chartTitle: chartData.main.title,
            isMainChartDisplay: true
        });
        columnChart.updateData({
            categories: chartData.main.categories,
            series: [{
                name: '心率量',
                data: chartData.main.data,
                format: function (val, name) {
                    return val.toFixed(2) + '次/min';
                }
            }]
        });
    },
    touchHandler: function (e) {
        var index = columnChart.getCurrentDataIndex(e);
        if (index > -1 && index < chartData.sub.length && this.data.isMainChartDisplay) {
            this.setData({
                chartTitle: chartData.sub[index].title,
                isMainChartDisplay: false
            });
            columnChart.updateData({
                categories: chartData.sub[index].categories,
                series: [{
                    name: '血压量',
                    data: chartData.sub[index].data,
                    format: function (val, name) {
                        return val.toFixed(2) + 'mmHg';
                    }
                }]
            });

        }
    },
    onReady: function (e) {
        var windowWidth = 320;
        try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }

        columnChart = new wxCharts({
            canvasId: 'columnCanvas',
            type: 'column',
            animation: true,
            categories: chartData.main.categories,
            series: [{
                name: '心率量',
                data: chartData.main.data,
                format: function (val, name) {
                    return val.toFixed(2) + '次/min';
                }
            }],
            yAxis: {
                format: function (val) {
                    return val + '  ';
                },
                title: '智能输液系统',
                min: 0
            },
            xAxis: {
                disableGrid: false,
                type: 'calibration'
            },
            extra: {
                column: {
                    width: 15
                }
            },
            width: windowWidth,
            height: 200,
        });
    }
});