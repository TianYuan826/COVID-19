;
var myMap = (function () {

    var mapChart;
    var allData;
    $.ajax({
        url: 'https://www.tianqiapi.com/api?version=epidemic&appid=23035354&appsecret=8YvlPNrz',
        type: 'get',
        dataType: 'json',
        async: false,
        success: function (data) {
            allData = data.data;
        }
    })
    console.log(allData);

    var areaData = allData.area;
    // 各地区的对象数组
    var objArr = areaData.map((item) => {
        return {
            name: item.provinceShortName,
            value: item.confirmedCount
        };
    })

    //使用echarts.init()方法初始化一个Echarts实例，在init方法中传入echarts map的容器 dom对象
    mapChart = echarts.init(document.getElementById('map'));
    // mapChart的配置
    var option = {
        title: {
            text: '全国肺炎疫情分布图',
            left: 'center',
            subtext: '人口数据来自天气网',
            sublink: 'https://www.tianqiapi.com/index/doc?version=epidemic'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>确诊：{c} (个)'
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {
                    readOnly: false
                },
                restore: {},
                saveAsImage: {}
            }
        },
        visualMap: {
            pieces: [{
                    gte: 10000
                }, // (1500, Infinity]
                {
                    gte: 1000,
                    lte: 9999
                }, // (900, 1500]
                {
                    gte: 500,
                    lte: 999
                }, // (310, 1000]
                {
                    gte: 100,
                    lte: 499
                }, // (200, 300]
                {
                    gte: 10,
                    lte: 99
                },
                {
                    gte: 1,
                    lte: 9
                }
            ],
            color: ['orangered', 'yellow', 'lightskyblue']
        },
        series: [{
            name: '全国各省市及自治区',
            type: 'map', //type必须声明为 map 说明该图标为echarts 中map类型
            map: 'china', //这里需要特别注意。如果是中国地图，map值为china，如果为各省市则为中文。这里用北京
            aspectScale: 0.75, //长宽比. default: 0.75
            zoom: 1.2,
            //roam: true,
            itemStyle: {
                normal: {
                    label: {
                        show: true
                    }
                },
                emphasis: {
                    label: {
                        show: true
                    }
                }
            },
            data: objArr
        }]
    };
    //设置图表的配置项
    mapChart.setOption(option);


    return {
        mapChart,
        areaData
    }
})()