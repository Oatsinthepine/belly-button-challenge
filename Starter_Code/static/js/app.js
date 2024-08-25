// Build the metadata panel
function buildMetadata(sampleId) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // get the metadata field
    // Filter the metadata for the object with the desired sample number
    let metaData = data.metadata.filter(s => s.id == sampleId)[0];
    console.log(metaData);
    
    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select('#sample-metadata');
  
    // Use `.html("") to clear any existing metadata
    panel.html(""); //this will ensure when event trigured new data appending to emptied text area.

    // use Object.entries() to convert metaData into an array of key/value pairs, looks like this [[key1:value1], [key2:value2]]
    //use forEach() to iterate over every [key,value] then append the values to <h6>.
    Object.entries(metaData).forEach(([key,value]) => {
      panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

buildMetadata(940);


// function to build both charts
function buildCharts(sampleId) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    //find the sample that matches the selected sample_id passed in function parameter:
    //select the all of the.sample object from samples.json file, then apply filter to select its id key 
    //equals to the sampleId parameter when calling the function.
    let sampleData = data.samples.filter(s => s.id == sampleId)[0];
    //[0] as it's an array and after filter need use indexing to select the content.
    console.log(sampleData);

    // map and sort the object match the sample id and get the top 10 values. here using .map() to apply two parameters
    // to construct a new object which contains selected sampleData's every corresponding fileds' data.
    let mappedData = sampleData.sample_values.map((value, index) => {
      return {otu_id: sampleData.otu_ids[index], sample_value: value, otu_label: sampleData.otu_labels[index]};
    });

    console.log(mappedData);

    //obtain the top 10 objects using .slice()
    let topTen = mappedData.sort(function sorting(a,b) {b.sample_value - a.sample_value}).slice(0,10);

    console.log(topTen);

    // For the Bar Chart, map the otu_ids to a list of strings for yticks
    let topTenId = topTen.map(obj => `OTU ${obj.otu_id}`);
    //console.log(topTenId);
    let topTenValue = topTen.map(obj => obj.sample_value);
    //console.log(topTenValue);
    let topTenLabel = topTen.map(obj => obj.otu_label);
    //console.log(topTenLabel);

    // For the bubble chart, need to select unsorted data.
    let bubbleId = mappedData.map(obj => obj.otu_id);
    let bubbleValue = mappedData.map(obj => obj.sample_value);
    let bubbleLabel = mappedData.map(obj => obj.otu_label);

    // Build the Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let trace1 = {
      x: topTenValue.reverse(),
      y: topTenId.reverse(),
      text: topTenLabel.reverse(),
      type: 'bar',
      orientation: 'h'
    };

    let bar1 = [trace1];

    let layout = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: { title: 'Number of Bacteria' },
    };

    // Render the Bar Chart
    Plotly.newPlot('bar', bar1, layout);

    //Build the bubble chart
    let trace2 = {
      x: bubbleId,
      y: bubbleValue,
      text: bubbleLabel,
      mode: 'markers',
      marker: {
        size: sampleData.sample_values,
        color: sampleData.otu_ids,
        colorscale: 'Earth'
      }
    };

    let bubbleData = [trace2];

    let bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Number of Bacteria' },
      margin: { t: 30 },
      hovermode: 'closest'
    };

    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
  });
}

buildCharts(940);


// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let Names = data.names;
    console.log(Names);

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select('#selDataset');

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i=0; i < Names.length; i++) {
      dropdown.append('option').text(Names[i]).property('value', Names[i]);
    };
    // Get the first sample from the list
    const firstSample = Names[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);

    buildMetadata(firstSample);

  });
};

// Function for event listener, in the html <select> when new option clicked by user it will trigger the embeded js optionChanged
//function to accept the parameter of this.value, so the .value is correspond to newSample here.
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  console.log(newSample);
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialise the dashboard
init();


