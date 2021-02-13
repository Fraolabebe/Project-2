
/*

  1. remove event listener from dropdown
  2. create button for filter
  3. add event listner (click) to btn
  4. grab vayues for gender and dept
  5. pass those to the build charts function


*/

var gender = null;
var dept = null;

/*******************
 * Drop downs and buttons
 */
dept_dropdown = d3.select('#dept-dropdown');
gender_dropdown = d3.select('#gender-dropdown');
filter_btn = d3.select('#filter-btn'); 

// add event listener to the filter btn
dept_dropdown.on('change', filterFunction);
gender_dropdown.on('change', filterFunction);
filter_btn.on('click', filterFunction);

// create reset var function
function resetVariables() {
  gender = null;
  dept = null  
}



/****************
 * Dept change handler function
 */

 function filterFunction() {
   
   // select gender dropdown and get value
   dept = dept_dropdown.property('value');
   gender = gender_dropdown.property('value');
   

   console.log(gender);
   console.log(dept);


   buildCharts(gender, dept);
 }


/*******************
 * Build charts function
 */

//set up to accept gender
function buildCharts(gender=null, dept=null) {
  
  // attrition chart
  d3.json('/api/gender_demographic').then(data => {



    console.log('in promise');
    console.log(gender);
    console.log(dept);
 


    if(gender) {

      if(gender != 'all') { // only filter if user selects an option
      data = data.filter(d => d['gender'].trim().toUpperCase() == gender.trim().toUpperCase())
      }

      console.log(data.length);
    }


    // apply filter to department if there is a selected value for it
    if(dept) {

      if(dept != 'all') {
        data = data.filter(d => d['department'].trim().toUpperCase() == dept.trim().toUpperCase())
      }

      console.log(data.length);
    }

     
    

  
    sortedData = data.sort((d1, d2) => {(d2['annual_income'].toString() - d1['annual_income'].toString())});
    console.log(sortedData.length);
  
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
      title: 'Annual Income Turnover',
      xaxis: {title: 'Employee'},
      yaxis: {title: 'Salary'},
      paper_bgcolor: 'rgba(0,0,0,0)', // transparent - this could be replaced with an actual color if you want
      plot_bgcolor: 'rgba(0,0,0,0)', // transparent - this could be replaced with an actual color if you want
      font: {color: 'white'}
    };
    
    Plotly.newPlot('attrition-salary', data, layout);
    
  }); // end of d3.json (gender-demo)

    // reset config variables
    resetVariables();

} // end of buildCharts function

// make sure that you call this function
buildCharts();


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

// function showData() {
//   d3.json('/samples').then(data => {
//       var { metadata, samples } = data;
//       var selection = d3.select('select').property('value');

//       d3.select('.panel-body').html('');
//       metadata = metadata.filter(obj => obj.id == selection)[0];
//       Object.entries(metadata).forEach(([key, val]) => {
//           d3.select('.panel-body').append('h5').text(`${key.toUpperCase()}: ${val}`);
//       });

//       samples = samples.filter(obj => obj.id == selection)[0];
//       var { otu_ids, otu_labels, sample_values } = samples;

//       var barData = [{
//           x: sample_values.slice(0,10).reverse(),
//           y: otu_ids.slice(0,10).reverse().map(id => `OTU ${id}`),
//           text: otu_labels.slice(0,10).reverse(),
//           type: 'bar',
//           orientation: 'h'
//       }];

//       Plotly.newPlot('bar', barData);

//       var bubbleData = [{
//           x: otu_ids,
//           y: sample_values,
//           text: otu_labels,
//           mode: 'markers',
//           marker: {
//               color: otu_ids,
//               size: sample_values
//           }
//       }];

//       Plotly.newPlot('bubble', bubbleData);

//       var gaugeData = [
//           {
//               domain: { x: [0, 1], y: [0, 1] },
//               value: metadata.wfreq,
//               title: { text: "Belly Button Wash Frequency <br> Scrubs per Week" },
//               type: "indicator",
//               mode: "gauge+number",
//               delta: { reference: 400 },
//               gauge: { axis: { range: [0, 9] } }
//           }
//       ];

//       var layout = { width: 600, height: 400 };
//       Plotly.newPlot('gauge', gaugeData, layout);
//   });






// /*********************************** */


// //Department-Gender Stats
// function showOptions() {
//   d3.json('/api/gender_demogrpahic').then(data => {
    
//     var{departments} = data;
//     departments.forEach(department => {
//       d3.select('select').append('option').text(department);

//     });

//   });

// };
  


// function showData() {
//   d3.json('/api/gender_demogrpahic').then(data => {
//     var {data, mon}
//   })
// }
//     department = data.map(d => d.department);
//     jobsatisfaction = data.map(d => d.jobsatisfaction)
//     annual_income = data.map(d => d.annual_income);
  
//     console.log('department', department)
  
  
//     listofdepartments = [],
//     jobsatisfactionlist = [],
//     annualincomelist = [];
  
//   for (var i = 0; i < department.length; i++ ){
//   if (listofdepartments.indexOf(department[i]) === -1 ){
//       listofdepartments.push(department[i]);
//   }
//   }
  
//   function getdepartmentData(chosenDepartment) {
//   jobsatisfactionlist = [];
//   annualincomelist = [];
//   for (var i = 0 ; i < department.length ; i++){
//       if ( department[i] === chosenDepartment ) {
//           jobsatisfactionlist.push(jobsatisfaction[i]);
//           annualincomelist.push(annual_income[i]);
//       }
//   }
//   };
  
//   // Default Country Data
//   setBubblePlot('Research & Development');
  
//   function setBubblePlot(chosenDepartment) {
//     getdepartmentData(chosenDepartment);
  
//   var trace1 = {
//       x: jobsatisfactionlist,
//       y: annualincomelist,
//       mode: 'lines+markers',
//       marker: {
//           size: 12,
//           opacity: 0.5
//       }
//   };
  
//   var data = [trace1];
  
//   var layout = {
//       title:'Line and Scatter Plot',
//       height: 400,
//       width: 480
//   };
  
//   Plotly.newPlot('intro-bar-chart', data, layout);
//   };
  
//   var innerContainer = document.querySelector('[data-num="0"'),
//   plotEl = innerContainer.querySelector('.plot'),
//   dataselector = innerContainer.querySelector('.departmentdata');
  
//   function assignOptions(textArray, selector) {
//   for (var i = 0; i < textArray.length;  i++) {
//       var currentOption = document.createElement('option');
//       currentOption.text = textArray[i];
//       selector.appendChild(currentOption);
//   }
//   }
  
//   assignOptions(listofdepartments, dataselector);
  
//   function updateDepartment(){
//   setBubblePlot(dataselector.value);
//   }
  
//   dataselector.addEventListener('change', updateDepartment, false);
//   });

// }






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