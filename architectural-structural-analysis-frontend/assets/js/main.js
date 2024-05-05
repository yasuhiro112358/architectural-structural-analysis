{
  'use strict';

  // CSVファイルをフェッチして解析する関数
  async function fetchData() {
    const response = await fetch('uploads/output.csv');
    const data = await response.text();
    const rows = data.split('\n').slice(1); // 先頭行を除外
    const labels = [];
    const dataPoints = [];

    rows.forEach(row => {
      const cols = row.split(',');
      labels.push(parseFloat(cols[0])); // 時間をX軸に設定
      dataPoints.push(parseFloat(cols[1])); // 地震加速度をY軸に設定
    });

    return {
      labels,
      dataPoints
    };
  }

  // データを取得してグラフを描画する
  fetchData().then(({
    labels,
    dataPoints
  }) => {
    let ctx = document.getElementById('myChart').getContext('2d'); // 描画のためのcanvas要素を取得
    let type = "line";
    let data = {
      labels: labels,
      datasets: [{
        label: 'Acceleration',
        data: dataPoints,
        borderColor: 'rgba(0, 0, 255, 1)',
        borderWidth: 0.5,
        pointStyle: false,
      }]
    };

    let options = {
      scales: {
        y: {
          type: 'linear', // 線形スケールを使用
          beginAtZero: true,
          suggestedMax: 400,
          suggestedMin: -400,
          ticks: {
            stepSize: 100 // Y軸の間隔
          },
          title: {
            display: true,
            text: "Acceleration [gal]",
          },
        },
        x: {
          type: 'linear', // 線形スケールを使用
          beginAtZero: true,
          position: 'bottom',
          ticks: {
            stepSize: 10,
          },
          title: {
            display: true,
            text: "Time [sec]",
          },
        }
      },
      plugins: {
        legend: {
          display: false
        },
      },
    };

    plugins = [];

    const config = {
      type: type,
      data: data,
      options: options,
      plugins: plugins,
    };

    // Chart.jsでグラフを生成
    const myChart = new Chart(ctx, config);

  });
}
