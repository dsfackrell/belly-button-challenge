// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metaData = data.metadata

    //console.log("meta")
    //console.log(metaData)

    // Filter the metadata for the object with the desired sample number
    let sampleMeta = metaData[sample.id]

    //console.log(sample.id)

    // Use d3 to select the panel with id of `#sample-metadata`
    let metaPanel = d3.select("#sample-metadata")

    // Use `.html("") to clear any existing metadata
    metaPanel.html("")

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples

    // Filter the samples for the object with the desired sample number
    let sampleIndex = samples.findIndex(x => x.id == sample)
    //console.log(samples[sampleIndex])
    let currentSample = samples[sampleIndex]

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = currentSample.otu_ids
    let otu_labels = currentSample.otu_labels
    let sample_values = currentSample.sample_values

    // Build a Bubble Chart
    let trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values
      }
    }

    let bubbleData = [trace1];

    let bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      height: 600,
      width: 1200
    }

    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout)

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    names = data.names

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset")

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach(name => {
      dropdown.append('option').text(name)
    });

    // Get the first sample from the list
    firstSample = data.samples[0]

    // Build charts and metadata panel with the first sample

    buildCharts(firstSample.id)
    buildMetadata(firstSample)
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
