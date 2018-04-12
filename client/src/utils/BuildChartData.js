const BuildChartData = (rawData) => {

  let cleanData = [], results = {labels: []}, maxYear = {};


  // cleanup raw data
  rawData.getPrenomFranceData.forEach(element => {
    let genderValues = [];
    element.data.forEach(element => {
      genderValues.push({x: element.annee, y: element.nb})
    })



    let serie = {
      label: element._id === 1 ? 'garcons' : 'filles',
      fill: true,
      spanGaps: false,
      showLine: true,
      pointBorderWidth: 0,
      lineTension: .25,
      borderColor: element._id === 1 ? 'rgba(52, 152, 219, 1)' : 'rgba(231, 76, 60, 1)',
      backgroundColor: element._id === 1 ? 'rgba(52, 152, 219, .2)' : 'rgba(231, 76, 60, .2)',
      data: genderValues,
    }

    cleanData.push(serie);
  });

  results.datasets = cleanData;
  
  return results;
}

export default BuildChartData