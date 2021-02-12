d3.json('/api/gender_demogaphic').then(data => {

  data = data.sort((d1, d2) => {d2['annual_income'] - d1['annual_income']});

  employee_number = data.map(d => employee_number);
  attrition = data.map(d => attrition);
  annual_income = data.map(d => annual_income);

  var trace1 = {
    x: employee_number,
    y: annual_income,
    marker:{
      color: attrition
    },
    type: 'bar'
  };
  
  var data = [trace1];
  
  var layout = {
    title: 'Attrition / Salary Stuff'
  };
  
  Plotly.newPlot('attrition-salary', data, layout);

});