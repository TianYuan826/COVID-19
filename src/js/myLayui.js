;
(function () {
  layui.use(['layer', 'form'], function () {
    var layer = layui.layer

    //点击事件,根据点击某个省份显示出这个省份的数据
    myMap.mapChart.on('click', function (params) {
      // console.log(params);
      window.location.hash = params.name;

      var mapChart;
      var option;
      var cityData, objArr;
      var areaData = myMap.areaData;
      // console.log(areaData)
      areaData.forEach(item => {
        if (item.provinceShortName == params.name) {
          cityData = item.cities;
          objArr = cityData.map(item => {
            return {
              name: item.cityName,
              value: item.confirmedCount
            }
          })
          // console.log(objArr);
          layer.open({
            type: 1,
            shade: 0,
            // shadeClose:true,
            title: params.name,
            anim: 2,
            area: ['893px', '600px'],
            content: $('#provinceMap') //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
          });
        }else{
return;
        }
      });

      // 确诊的数组
      var confirmedArr = objArr.map((item) => {
        return item.value;
      })
      // 找出确诊的最大值
      var maxCount = Math.max(...confirmedArr);

      $.get('./public/province/' + params.name + '.json', function (cityJson) {
        echarts.registerMap(params.name, cityJson);
        mapChart = echarts.init(document.getElementById('provinceMap'));
        option = {
          title: {
            text: params.name + '肺炎疫情分布图',
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
            min: 0,
            max: maxCount,
            text: ['高', '低'],
            realtime: false,
            calculable: true,
            inRange: {
              color: ['lightskyblue', 'yellow', 'orangered']
            }
          },
          series: [{
            name: params.name + '肺炎疫情分布图',
            type: 'map',
            map: params.name, // 自定义扩展图表类型
            aspectScale: 1.0, //地图长宽比. default: 0.75
            zoom: 1.1, //控制地图的zoom，动手自己更改下 看看什么效果吧
            roam: false, // 漫游
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
        }
        mapChart.setOption(option);

        $('#provinceMap').css('display', 'block');

      });

    });
  });
})()