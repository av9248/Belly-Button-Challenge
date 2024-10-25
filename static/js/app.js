// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;
    // console.log(metadata)

    // Filter the metadata for the object with the desired sample number
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];
    // console.log(resultArray)

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}


// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;
    console.log(samples)

    // Filter the samples for the object with the desired sample number
    let resultArray= samples.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];
    console.log(resultArray)

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result.otu_ids.slice(0, 10).reverse();
    let otu_labels = result.otu_labels.slice(0, 10);
    let sample_values = result.sample_values.slice(0, 10);

    // Build a Bubble Chart
    let bubbbleData = [{
      x: otu_ids.map,
      y: sample_values,
      text: otu_labels,
      mode:'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth",
      }
    }]
    let bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: { title: 'OTU ID' },
      hovermode: 'closest'
    };


    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();



    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let barData = [{
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      text: otu_labels.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h'
    }];
    let barLayout = {
      title: 'Top 10 Bacteria Cultures',
      xaxis: { title: 'Sample Values' },
      yaxis: { title: 'OTU ID' }
    };


    // Render the Bar Chart
    Plotly.newPlot('bar', barData, barLayout);
  });
}

// Function to run on page load
function init() {   
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field


    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
