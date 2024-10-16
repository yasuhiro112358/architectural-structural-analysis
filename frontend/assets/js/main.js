'use strict';

{

  // CSVファイルをフェッチして解析する関数
  async function fetchData() {
    const response = await fetch('uploads/output.csv');
    const data = await response.text();
    const rows = data.split('\n').slice(1); // 先頭行を除外
    const time = [];
    const ns_acc_data = [];
    const ew_acc_data = [];
    const ud_acc_data = [];

    rows.forEach(row => {
      const cols = row.split(',');
      time.push(parseFloat(cols[0]));
      ns_acc_data.push(parseFloat(cols[1]));
      ew_acc_data.push(parseFloat(cols[2]));
      ud_acc_data.push(parseFloat(cols[3]));
    });

    return {
      time,
      ns_acc_data,
      ew_acc_data,
      ud_acc_data,
    };
  }

  // データを取得してグラフを描画する
  fetchData().then(({
    time,
    ns_acc_data,
    ew_acc_data,
    ud_acc_data,
  }) => {
    const ctx = []
    ctx['ns-acc'] = document.getElementById('ns-acc-chart').getContext('2d'); // 描画のためのcanvas要素を取得
    ctx['ew-acc'] = document.getElementById('ew-acc-chart').getContext('2d'); // 描画のためのcanvas要素を取得
    ctx['ud-acc'] = document.getElementById('ud-acc-chart').getContext('2d'); // 描画のためのcanvas要素を取得

    const type = "line";

    const data = []
    data['ns-acc'] = {
      labels: time,
      datasets: [{
        data: ns_acc_data,
        borderColor: 'rgba(0, 0, 255, 1)',
        borderWidth: 0.5,
        pointStyle: false,
      }]
    };
    data['ew-acc'] = {
      labels: time,
      datasets: [{
        data: ew_acc_data,
        borderColor: 'rgba(0, 0, 255, 1)',
        borderWidth: 0.5,
        pointStyle: false,
      }]
    };
    data['ud-acc'] = {
      labels: time,
      datasets: [{
        data: ud_acc_data,
        borderColor: 'rgba(0, 0, 255, 1)',
        borderWidth: 0.5,
        pointStyle: false,
      }]
    };

    const options = {
      scales: {
        y: {
          type: 'linear', // 線形スケールを使用
          beginAtZero: true,
          // suggestedMax: 400,
          // suggestedMin: -400,
          suggestedMax: 1000,
          suggestedMin: -1000,
          ticks: {
            stepSize: 100 // Y軸の間隔
          },
          title: {
            display: true,
            text: "Acceleration [gal (= cm/s/s) ]",
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

    // plugins = [];

    const config = []
    config['ns-acc'] = {
      type: type,
      data: data['ns-acc'],
      options: options,
      // plugins: plugins,
    };
    config['ew-acc'] = {
      type: type,
      data: data['ew-acc'],
      options: options,
      // plugins: plugins,
    };
    config['ud-acc'] = {
      type: type,
      data: data['ud-acc'],
      options: options,
      // plugins: plugins,
    };

    // Chart.jsでグラフを生成
    const charts = []
    charts[0] = new Chart(ctx['ns-acc'], config['ns-acc']);
    charts[1] = new Chart(ctx['ew-acc'], config['ew-acc']);
    charts[2] = new Chart(ctx['ud-acc'], config['ud-acc']);

  });
}
