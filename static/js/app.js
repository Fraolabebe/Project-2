// Department-Gender Stats
// d3.json('/api/dept_gender_stats').then(data => {

//   gender = data.map(d => d['gender']);
//   department = data.map(d => d['department']);
//   annual_income_avg = data.map(d => d['annual_income_avg']);;

//   var trace1 = {
//     x: gender,
//     y: annual_income_avg,
//     type: 'bar',
//     text: annual_income_avg,
//     textposition: 'auto',
//     hoverinfo: 'none',
//     marker: {
//       color: 'navy',
//       opacity: 0.6,
//       line: {
//         color: 'purple',
//         width: 1.5
//       }
//     }
//   };
  
//   var data = [trace1];
  
//   var layout = {
//     title: 'Average Salary by Gender'
//   };
  
//   Plotly.newPlot('intro-bar-chart', data, layout);

// });


// Reactive Chart

//Department-Gender Stats
d3.json('/api/genderdemogrpahic').then(data => {

  
  department = data.map(d => d.department);
  jobsatisfaction = data.map(d => d.jobsatisfaction)
  annual_income = data.map(d => d.annual_income);

  console.log('department', department)


  listofdepartments = [],
  jobsatisfactionlist = [],
  annualincomelist = [];

for (var i = 0; i < department.length; i++ ){
if (listofdepartments.indexOf(department[i]) === -1 ){
    listofdepartments.push(department[i]);
}
}

function getdepartmentData(chosenDepartment) {
jobsatisfactionlist = [];
annualincomelist = [];
for (var i = 0 ; i < department.length ; i++){
    if ( department[i] === chosenDepartment ) {
        jobsatisfactionlist.push(jobsatisfaction[i]);
        annualincomelist.push(annual_income[i]);
    }
}
};

// Default Country Data
setBubblePlot('Research & Development');

function setBubblePlot(chosenDepartment) {
  getdepartmentData(chosenDepartment);

var trace1 = {
    x: jobsatisfactionlist,
    y: annualincomelist,
    mode: 'lines+markers',
    marker: {
        size: 12,
        opacity: 0.5
    }
};

var data = [trace1];

var layout = {
    title:'Line and Scatter Plot',
    height: 400,
    width: 480
};

Plotly.newPlot('intro-bar-chart', data, layout);
};

var innerContainer = document.querySelector('[data-num="0"'),
plotEl = innerContainer.querySelector('.plot'),
dataselector = innerContainer.querySelector('.departmentdata');

function assignOptions(textArray, selector) {
for (var i = 0; i < textArray.length;  i++) {
    var currentOption = document.createElement('option');
    currentOption.text = textArray[i];
    selector.appendChild(currentOption);
}
}

assignOptions(listofdepartments, dataselector);

function updateDepartment(){
setBubblePlot(dataselector.value);
}

dataselector.addEventListener('change', updateDepartment, false);
});





// gauge Chart for job satisfaction

// d3.json('/api/job_satisfaction_avg').then(data => {
//   happiness = data.map(d => d['job_satisfaction_avg']);

//   console.log(happiness)


// var data = [
// 	{
// 		domain: { x: [0,5], y: [0,5] },
// 		value: happiness,
// 		title: { text: "Speed" },
// 		type: "indicator",
// 		mode: "gauge+number"
// 	}
// ];

// var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
// Plotly.newPlot('intro-gauge-chart', data, layout);

// });

// d3.json('/api/genderdemogrpahic').then(function(attritionIncome){
//     MonthlyIncome = attritionIncome.map(d => d['MonthlyIncome']);
//     Attrition = attritionIncome.map(d => d['Attrition']);

//     console.log(attritionIncome);
//     console.log(attritionIncome);
  
//     var trace1 = {
//       x: Attrition,
//       y: MonthlyIncome,
//       mode: 'markers',
//       type: 'bar',
//       name: 'Team A',
//       textposition: 'top center',
//       textfont: {
//         family:  'Raleway, sans-serif'
//       },
//       marker: { size: 12 }
//     };
    
//     var data = [trace1];
    
//     var layout = {
//       // xaxis: {
//       //   range: [ 0.75, 5.25 ]
//       // },
//       // yaxis: {
//       //   range: [0, 8]
//       // },
//       legend: {
//         y: 0.5,
//         yref: 'paper',
//         font: {
//           family: 'Arial, sans-serif',
//           size: 20,
//           color: 'grey',
//         }
//       },
//       title:'Income by Attrition'
//     };
  
    
//     Plotly.newPlot('intro-scatter-plot', data, layout);
// });



  // jsData = data;

  // showLine();



  // function showLine() {

  //   var sel = d3.select('select').property('value');

  //   var xValue = ['Product A', 'Product B', 'Product C'];

  //   var yValue = [20, 14, 23];

  //   var trace1 = {
  //     x: Depar,
  //     y: yValue,
  //     type: 'bar',
  //     text: yValue.map(String),
  //     textposition: 'auto',
  //     hoverinfo: 'none',
  //     marker: {
  //       color: 'rgb(158,202,225)',
  //       opacity: 0.6,
  //       line: {
  //         color: 'rgb(8,48,107)',
  //         width: 1.5
  //       }
  //     }
  //   };

  //   var data = [trace1];

  //   var layout = {
  //     title: 'January 2013 Sales Report',
  //     barmode: 'stack'
  //   };

    // Plotly.newPlot('intro-line-graph', data, layout);

  // };