console.log('starting script');
d3.json('/api/gender_demographic').then(data => {

  console.log('in d3');
  sortedData = data.sort((d1, d2) => {(d2['annual_income'].toString() - d1['annual_income'].toString())});

  console.log(sortedData);


  employee_number = sortedData.map(d => `EMP ${d['employee_number'].toString()}`);
  attrition = sortedData.map(d => d['attrition']);
  annual_income = sortedData.map(d => d['annual_income']);

  console.log(annual_income);
  console.log(employee_number);

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