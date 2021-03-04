function plot(id) {
    d3.json("samples.json").then (all_data =>{




    sample_values = all_data.samples[id].sample_values
    otu_ids = all_data.samples[id].otu_ids
    otu_labels = all_data.samples[id].otu_labels


    var otu_ids_top = otu_ids.slice(0,10);
    var sample_values_top = sample_values.slice(0,10);
    var otu_labels_top = otu_labels.slice(0,10);
    

    var correct_labels = otu_ids_top.map(i => "OTU " + i);




    var trace1 = {
        x: sample_values,
        y: correct_labels,
        text: otu_labels,
        type: "bar",
        orientation: "h",
    };

    var data = [trace1];


    var layout = {
        title: "Bar Chart",


    };

    Plotly.newPlot("bar", data, layout);


    var trace2 = {
        x: otu_ids,
        y: sample_values,
        text:  correct_labels,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids
        }

    };

    var layout_2 = {
        xaxis:{title: "Bubble Chart"},
    };

    var data2 = [trace2];

Plotly.newPlot("bubble", data2, layout_2); 



});


}

var dropdown = d3.select("#selDataset");



d3.json("samples.json").then((data)=> {

    data.names.forEach(function(name) {
        dropdown.append("option").text(name).property("value");
    });
    plot(0);
    sideBar(0)
});


function sideBar(id) {
        d3.json("samples.json").then((data)=> {
    
    
           var result = data.metadata.filter(meta => meta.id == id)[0];
           var sideBarElement = d3.select("#sample-metadata");
            
           sideBarElement.html("");
    
            Object.entries(result).forEach((key) => {   
                sideBarElement.append("h5").text(key[0].toUpperCase() + ": " + key[1]);    
            });
        });
    }


function optionChanged(id) {
    plot(id-940)
    sideBar(id)

}