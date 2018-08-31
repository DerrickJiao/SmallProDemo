var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var pieChart = null;
Page({
    data: {
    },
    touchHandler: function (e) {
        console.log(pieChart.getCurrentDataIndex(e));
    },        
    onLoad: function (e) {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }

        pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
            series: [{
                name: '咳嗽',
                data: 0,
            }, {
                name: '头疼',
                data: 0,
            }, {
                name: '四肢酸痛',
                data: 0,
            }, {
                name: '乏力',
                data: 0,
            }, {
                name: '发热',
                data: 0,
            }, {
                name: '无',
                data: 100,
            }],
            width: windowWidth,
            height: 300,
            dataLabel: true,
        });
    }
});