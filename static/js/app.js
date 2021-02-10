d3.json('/api/genderdemogrpahic').then(data => {

  jsData = data;

  showLine();



  function showLine() {

    var sel = d3.select('select').property('value');

    var xValue = ['Product A', 'Product B', 'Product C'];

    var yValue = [20, 14, 23];

    var trace1 = {
      x: Depar,
      y: yValue,
      type: 'bar',
      text: yValue.map(String),
      textposition: 'auto',
      hoverinfo: 'none',
      marker: {
        color: 'rgb(158,202,225)',
        opacity: 0.6,
        line: {
          color: 'rgb(8,48,107)',
          width: 1.5
        }
      }
    };

    var data = [trace1];

    var layout = {
      title: 'January 2013 Sales Report',
      barmode: 'stack'
    };

    Plotly.newPlot('intro-line-graph', data, layout);

  };


});