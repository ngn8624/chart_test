import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Line } from 'react-chartjs-2';
import { each } from "chart.js/helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  annotationPlugin
);

function updateChart(indexChart, min, max) {
  console.log("ChartJS.instances" + indexChart);
  const index = indexChart -1;
  ChartJS.instances[index]._options.scales.x.min = min;
  ChartJS.instances[index]._options.scales.x.max = max;
  ChartJS.instances[index].update();

  // each(ChartJS.instances, function (instance) {
  //   console.log("ChartJS.instances" + instance.id);
  //   if (instance.id === indexChart-1) {
  //     instance._options.scales.x.min = min;
  //     instance._options.scales.x.max = max;
  //     instance.update();
  //   }
  // });
}

// 함수형, chartjs-2사용 : scaple, zoom, decimation, tooltip, legend, title 프로퍼티 위치 중요
export default function Charts({yData, y2Data, samplesPoints, thresholdsPoints,nbPoints }) {
    const options = {
      spanGaps: true, // 데이터 포인트가 많은 경우 를 활성화하는 것이 더 효과적일 수 있습니다 spanGaps. 이렇게 하면 불필요한 단계가 될 수 있는 선의 분할이 비활성화됩니다.
      // x축 값이 같은 애들끼리 그룹화할지를 정하는데요,
      // true 설정 시 해당 x축 값내에서 서로 공간을 나누면서 나란히 보여지게 되고,
      // false 설정 시 각 포인트가 해당 x축 정중앙에 그려지게 되어서 x축 값이 같은 애들끼리 서로 겹쳐지게 됩니다
      // grouped: true,

      // 호버 동작과 관련된 설정인데요, 호버를 하게 되면 툴팁이 뜨게 되는데 그 툴팁이 뜨는 기준을 설정할 수 있습니다.
      // 위와 같이 index를 기준으로 설정하게 되면 동일한 index에 놓인 값들이 모두 뜸
      // interaction: {
      //   enabled: true, // 툴팁 꺼짐?
      //   mode: 'nearest', // 'nearest'
      //   axis: 'x',
      //   intersect: true, // ????
      // },

      responsive: true, // 테이너가 변경되면 차트 캔버스의 크기를 조정합니다
      parsing: false,
      // 성능을 위해서 끕니다 => 끄면 Cannot assign to read only property 'data' of object '#<Object>’ 오류발생
      // 데이터 세트를 구문 분석하는 방법. 
      // 차트 옵션 또는 데이터 세트에서 parsing: false를 지정하여 구문 분석을 비활성화할 수 있습니다. 
      // 구문 분석이 비활성화된 경우 데이터를 정렬해야 하며 관련 차트 유형 및 배율이 내부적으로 사용하는 형식으로 정렬해야 합니다.
      normalized: true,
      // Chart.js는 데이터 세트 전체에서 고유하고 정렬되고 일관된 인덱스가 있는 데이터를 제공하고 
      // normalized: true 옵션을 제공하여 Chart.js가 사용자가 그렇게 했음을 알릴 때 가장 빠릅니다.
      animation: false, // 성능을 위해서 끕니다
      plugins: {
        autocolors: false,
        annotation: { // plotband, annotation
          annotations: {
            line1: {
              display: true,
              type: 'line',
              yScaleID: "y",
              yMin: -50,
              yMax: -50,
              borderColor: "green",
              borderWidth: 2,
              textAlign: 'start',
              label: {
                position: 'right',
                enabled: true,
                color: 'orange',
                content: 'LineAnno1',
                font: {
                  weight: 'bold'
                }
              }
            },
            line2: {
              display: true,
              type: 'line',
              yScaleID: "y_sub",
              yMin: 40,
              yMax: 40,
              borderColor: 'orange',
              borderWidth: 2,
              label: {
                position: 'right',
                enabled: true,
                color: 'orange',
                content: 'LineAnno2',
                textAlign: 'start',
                font: {
                  weight: 'bold',
                  size: 100
                },
                callout: {
                  display: true,
                  side: 10
                }
              }
            }
            // type: "line",
            // // mode: "Horizontal",
            // // scaleID: "y",
            // // value: 100,
            // xMin: 50,
            // yMIn: 0,
            // xMax: 55,
            // yMax: 100,
            // borderColor: "#2984c5",
            // borderWidth: 10,
            // label: {
            //   position: 'center',
            //   enabled: true,
            //   color: 'orange',
            //   content: 'LineAnno',
            //   font: {
            //     weight: 'bold'
            //   }
            // }
          },
      },
        tooltip: { // 툴팁 스타일링
            backgroundColor: 'rgba(124, 35, 35, 0.4)',
            // 툴팁 색상을 지정할 수 있습니다.
            padding: 10,
            // 툴팁 패딩을 지정할 수 있습니다.
            bodySpacing: 5,
            // 툴팁 내부의 항목들 간 간격을 조정할 수 있습니다.
            bodyFont: {
              font: { // 툴팁 내용의 폰트 스타일을 지정할 수 있습니다.
                  family: "'Noto Sans KR', sans-serif",
              }
            },
            usePointStyle: true,
            // 툴팁 내부에서 도형의 모양을 지정할 수 있음, 도형 모양과 관련된 속성으로, false일 경우엔 기본 직사각형 도형으로 표시됩니다.
            filter: (item) => item.parsed.x !== null,
            // 툴팁에 표시될 항목을 필터링할 수 있음,
            // 예를 들어 값이 null인 항목은 툴팁에 나타나지 않게 하려면 위와 같이 설정해주시면 됩니다.
            callbacks: {
              // 툴팁에 표시되는 내용은 이와 같이 콜백 함수를 통해 조건에 맞게 수정할 수 있음
              title: (context) => { // 툴팁에서 x축 값이 어떻게 표시될지 설정할 수 있음
                let title = "x : " +  context[0].parsed.x;
                // (context를 콘솔에 찍어보시면 차트에 전달되는 dataset과
                // 그 값들을 확인할 수 있는데, 이를 바탕으로 조건을 구성하고
                // 그 조건에 따라 title을 재설정해주시면 됩니다.)
                return title; // 재설정한 title은 꼭 반환
              },
              label: (context) => { // 툴팁에서 y축 값이 어떻게 표시될지 설정할 수 있음
                let label = "y : " + context.parsed.y;
                // if (label) {
                //   label = "algoH"
                //     ? ' algoH : '
                //     : (' ' + label + ' : ');
                // }
                // if (context.parsed.y !== null) { // y축 값이 null이 아니라면,
                //   // 조건에 따라 label 재할당
                // } else { // y축 값이 null이라면
                //   return null; // null 반환
                // }
                return label; // 마찬가지로 재설정한 label도 꼭 반환
              },
            },
          },
          legend: {
            position: 'top', //위치를 지정할수 있음
            labels: {
              usePointStyle: true,
              // 범례 도형 모양과 관련된 속성으로, false일 경우엔 기본 직사각형 도형으로 표시됩니다.
              padding: 3,
              // 범례 간 가로 간격을 조정할 수 있습니다. 범례의 상하 padding을 지정하는 기능은 따로 지원되지 않음
              font: { // 범례의 폰트 스타일도 지정할 수 있습니다.
                family: "'Noto Sans KR', 'serif'",
                lineHeight: 1,
              },
            },
          },
          title: { // chart Title 설정할 수 있습니다.
            display: true,
            text: 'Chart.js Line Chart',
          },
          decimation: { // decimation(1/10으로 줄인다) 그런의미
            enabled: true,
            samples: samplesPoints,
            threshold: thresholdsPoints,
            algorithm: 'lttb',
            // algorithm: 'min-max',
          },
          zoom: { //zoom 기능
            pan: {
              enabled: false,
              mode: 'x'
            },
            zoom: {
              wheel: {
                enabled: true
              },
              drag: {
                enabled: false
              },
              pinch: {
                enabled: false
              },
              mode: 'x',
            }
          },
      },
      scales: { // x축과 y축에 대한 설정을 할 수 있습니다.
        x: { // 여기서 x는 이 축의 id인데요, 이 안에서 axis 속성만 x로 지정해놓으시면 id를 x가 아니라 다른 이름으로 설정해도 무관합니다.
          type: 'linear',
          // afterTickToLabelConversion: function (scaleInstance) {
          //   const ticks = scaleInstance.ticks;
    
          //   const newTicks = ticks.map((tick) => {
          //     return {
          //       // 원본 x축 값을 이용하여 각 x축 값들이 어떻게 표시될지 수정할 수 있습니다.
          //     };
          //   });
          //   scaleInstance.ticks = newTicks;
          //   // scaleInstance.ticks에 새로운 ticks를 재할당해줘야 적용이 됩니다!
          // },
          grid: { // x축을 기준으로 그려지는 선(세로선)에 대한 설정입니다.
            display: false, // 선이 그려짐.
            drawTicks: false, // 눈금 표시 여부를 지정합니다.
            tickLength: 4, // 눈금 길이를 지정합니다.
            color: '#E2E2E230' // 눈금 및 선의 색상을 지정합니다.
          },
          axis: 'x', // x축(가로축)인지 y축(세로축)인지 표시합니다.
          // max: Date.parse(100) + 1296000000, // 축의 최대값을 강제합니다.
          // min: Date.parse(100), // 축의 최소값을 강제합니다.
          position: 'bottom',
          // top으로 설정하면 가로축이 차트 상단에 그려지게 됩니다!
          ticks: {
            // 성능을 위하여 disabled =0;, source: 'auto', autoskip: true
            disabled : 0,
            source: 'auto',
            autoSkip: true,
            minRotation: 0, // x축 값의 회전 각도를 설정할 수 있음
            padding: 5, // x축 값의 상하 패딩을 설정할 수 있음
          },
        },
        y: { // 'y'라는 id를 가진 y축에 대한 설정
          // type: isLinear ? 'linear' : 'logarithmic',
          type: 'linear',
          // 리니어 스케일뿐만 아니라 로그 스케일로도 표시할 수 있습니다.
          grid: { // 가로선 설정
            color: '#E2E2E230',
          },
          afterDataLimits: (scale) => {
            // y축의 최대값은 데이터의 최대값에 딱 맞춰져서 그려지므로
            // y축 위쪽 여유공간이 없어 좀 답답한 느낌이 들 수 있는데요,
            // 이와 같이 afterDataLimits 콜백을 사용하여 y축의 최대값을 좀 더 여유있게 지정할 수 있습니다
            scale.max = scale.max * 1.2;
            scale.min = scale.min-10;
          },
          axis: 'y', // 이 축이 y축임을 명시해줍니다.
          display: true, // 축의 가시성 여부도 설정할 수 있습니다.
          position: 'left', // 축이 왼쪽에 표시될지, 오른쪽에 표시될지 정할 수 있습니다.
          title: { // 이 축의 단위 또는 이름도 title 속성을 이용하여 표시할 수 있습니다.
            display: true,
            align: 'end',
            color: '#808080',
            font: {
              size: 12,
              family: "'Noto Sans KR', sans-serif",
              weight: 300,
            },
            text: '단위: mV : V'
          }
        },
        // data의 datasets의 각 series에 연결할 yAxisID 넣어주기
        // y축을 여러 개 두고 싶다면 아래와 같이 또 만들어 주세요.
        y_sub: {
          type: 'linear',
          position: 'left',
          axis: 'y',
          title: {
            display: true,
            align: 'end',
            color: '#808080',
            font: {
              size: 12,
              family: "'Noto Sans KR', sans-serif",
              weight: 300,
            },
            text: '단위: mV : A'
          }
        },
      },
  };
  const data =  {
    // labels: yData.map(item => item.x),
    datasets: [
      {
        label: 'Dataset 1',
        data: [...yData],
        // data: yData.map(item => item.y),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 1, // 성능향상을 위하여 1로 설정
        // pointRadius: 0, // 성능 향상을 위하여 0으로 설정
        radius: 0,// pointRadius 동일기능
        yAxisID: 'y',
      },
      {
        label: 'Dataset 2',
        data: [...y2Data],
        // data: yData.map(item => item.y),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 1,
        // pointRadius: 0,
        radius: 0,// pointRadius 동일기능
        yAxisID: 'y_sub',
      },
    ],
  };



  var minXIndex = 0;
  var maxXGroup = 300;

  const annotations = {
    box1: {
      type: "box",
      xMin: 0,
      yMin: 0,
      xMax: 0,
      yMax: 0,
      backgroundColor: "rgba(255, 99, 132, 0.25)"
    }
  };

  const optionBrush = {
    parsing: false,
      // 성능을 위해서 끕니다 => 끄면 Cannot assign to read only property 'data' of object '#<Object>’ 오류발생
      // 데이터 세트를 구문 분석하는 방법. 
      // 차트 옵션 또는 데이터 세트에서 parsing: false를 지정하여 구문 분석을 비활성화할 수 있습니다. 
      // 구문 분석이 비활성화된 경우 데이터를 정렬해야 하며 관련 차트 유형 및 배율이 내부적으로 사용하는 형식으로 정렬해야 합니다.
    normalized: true,
    // Chart.js는 데이터 세트 전체에서 고유하고 정렬되고 일관된 인덱스가 있는 데이터를 제공하고 
    // normalized: true 옵션을 제공하여 Chart.js가 사용자가 그렇게 했음을 알릴 때 가장 빠릅니다.
    animation: false, // 성능을 위해서 끕니다
    scales: {
      y: {
        grid: {
          display: false,
          drawBorder: false,
          drawOnChartArea: false,
          drawTicks: false
        },
        type: "linear",
        beginAtZero: true,
        position: "left", // `axis` is determined by the position as `'y'`
        display: true,
        ticks: {
          beginAtZero: true,
          display: true
        } // `axis` is determined by the position as `'y'`
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
          drawOnChartArea: false,
          drawTicks: false
        },
        type: "linear",
        position: "bottom",
        display: false,
        // max: 250,
        // min: 0,
        ticks: {
          beginAtZero: true,
          display: false
        } // `axis` is determined by the position as `'y'`
      }
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
        labels: {
          color: "rgb(255, 99, 132)"
        }
      },
      decimation: { // decimation(1/10으로 줄인다) 그런의미
        enabled: true,
        samples: samplesPoints/10,
        threshold: thresholdsPoints,
        algorithm: 'lttb',
        // algorithm: 'min-max',
      },
      zoom: {
        pan: {
          enabled: false,
          mode: "xy"
        },
        zoom: {
          drag: {
            enabled: true,
            backgroundColor: "rgba(225,225,225,0.6)"
          },
          wheel: {
            enabled: false
          },
          pinch: {
            enabled: false
          },
          mode: "xx1",
          onZoom: function ({ chart }) {
            const indexChart = chart.id;
            const { min, max } = chart.scales.x;
            minXIndex = min;
            maxXGroup = max;
            const { miny, maxy } = chart.scales.y; 
            chart.config._config.options.plugins.annotation.annotations.box1.xMin =
              min - 0.5;
            chart.config._config.options.plugins.annotation.annotations.box1.xMax =
              max + 0.5;
            chart.config._config.options.plugins.annotation.annotations.box1.yMin = miny;
            chart.config._config.options.plugins.annotation.annotations.box1.yMax = maxy;
  
            chart.resetZoom();
            updateChart(indexChart, min, max);
          }
        }
      },
      autocolors: false,
      annotation: {
        annotations: annotations
      }
    }
  };

  return (
    <>
    <Line type = 'line' options={options} data={data} />
    <Line data={data} wid="true"  height={20} options={optionBrush} />
    </>
    );
};