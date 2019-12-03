function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    var metaData = `/metadata/${sample}`
    d3.json(metaData).then((data) => {
      var module = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    module.html("");
     // Use `Object.entries` to add each key and value pair to the panel
     Object.entries(data).forEach(([key, value]) => {
       module.append("p").text(`${key}:${value}`);
      });
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
});
}
    

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);


  function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var sampleData = `/samples/${sample}`;
    

    // @TODO: Build a Bubble Chart using the sample data
    d3.json(sampleData).then((data) => {
    
      var x = data.otu_ids;
      var y = data.sample_values;
      var size = data.sample_values;
      var color = data.otu_ids;
      var texts = data.otu_labels;
  
    var trace1 = [{
      x: x,
      y: y,
      text: texts,
      mode: `markers`,
      marker: {
        size: size,
        color: color
      }
    }];

    var layout = {
      title: "Belly Button Bacteria",
      xaxis: {title: "OTU ID"}
    };
    Plotly.newPlot("bubble", trace1, layout)

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

    d3.json(sampleData).then(function(data){
      var values = data.sample_values.slice(0,10);
      var labels = data.otu_ids.slice(0,10);
      var display = data.otu_labels.slice(0,10);

      var pie_chart = [{
        values: values,
        lables: labels,
        hovertext: display,
        type: "pie"
      }];
      Plotly.newPlot('pie',pie_chart);
    });
  });
};


 

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
