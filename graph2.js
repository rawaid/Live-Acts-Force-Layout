function draw2(){
d3.select("svg").remove();
var width = 600,
    height = 600;

// old size = 900 x 1000

var yearLegend = ["2009", "2010", "2011", "2012", "2013", "2014", "2015"];

var svg = d3.select("#graph2").append("svg")
    .attr("width", width)
    .attr("height", height);



var force = d3.layout.force()
    .size([width, height])
    .linkDistance(60)
    .charge(-35);
d3.csv("bands.csv", function(error, links) {
  if (error) throw error;

  var nodesByName = {};

  // Create nodes for each unique source and target.
  links.forEach(function(link) {

    link.source = nodeByName(link.Artist);
    link.target = nodeByName(link.Year);
    //console.log("you saw " + link.Artist + " in " + link.Month)
  });

  // Extract the array of nodes from the map by name.
  var nodes = d3.values(nodesByName);

  // Create the link lines.
  var link = svg.selectAll(".link")
      .data(links)
    .enter().append("line")
      .attr("class", "link")

  // Create the node circles.
  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("g")
      .attr("class", "node")   
      .call(force.drag);

  node.append("circle")
      .attr("class", "node")
      .attr("r", function(d){
        if(d.name == "2009" || d.name ==  "2010" || d.name ==  "2011" || d.name ==  "2012"
          || d.name == "2013" || d.name == "2014" || d.name == "2015"){
          return 12
        }
        else{ 
          return 5}
      })
      .style("fill", function(d){
        //console.log(d)
        if (d.name == "2009"){
          return "#F44336" // Red
        }
        else if (d.name == "2010"){
          return "#9C27B0" // Purple
        }
        else if (d.name == "2011"){
          return "#CDDC39" // Lime
        }
        else if (d.name == "2012"){
          return "#2196F3" // Blue
        }
        else if (d.name == "2013"){
          return "#00BCD4" // Cyan
        }
        else if (d.name == "2014"){
          return "#009688" // Teal
        }
        else if (d.name == "2015"){
          return "#4CAF50" // Green
        }
      })
      .on("click", function(d){
        console.log(isInArray(d.Year, yearLegend));
        console.log(d)
        if (isInArray(d.name, yearLegend)){
          document.getElementById('artistInfo2').innerHTML = "I saw " + d.weight + " bands in " + d.name;
          document.getElementById('artistInfo2').innerHTML += "</br>" ;
        }
        else if (d.weight == 1){
          document.getElementById('artistInfo2').innerHTML = "I saw " + d.name + " once" ;
          document.getElementById('artistInfo2').innerHTML += "</br>" ;
        }
        else
          document.getElementById('artistInfo2').innerHTML = "I saw " + d.name + " " + d.weight + " times";
          document.getElementById('artistInfo2').innerHTML += "</br>" ;


        if (!isInArray(d.name, yearLegend)){
          var cache = new LastFMCache();

          /* Create a LastFM object */
          var lastfm = new LastFM({
            apiKey    : 'f21088bf9097b49ad4e7f487abab981e',
            apiSecret : '7ccaec2093e33cded282ec7bc81c6fca',
            cache     : cache
          });

            lastfm.artist.getInfo({artist: d.name}, {success: function(data){
              //console.log(data.artist.image[5]['#text']);
              /*
              var img = document.createElement("img");
              img.src = data.artist.image[1]['#text'];
              var src = document.getElementById("body");
              src.appendChild(img);   
              */
              console.log(data)
              console.log(data.artist.name);
              var bio = data.artist.bio.content;
              console.log(typeof(bio));
              var img = new Image();
              var div = document.getElementById('artistInfo2');

              img.onload = function(){
                div.appendChild(img);
                document.getElementById('artistInfo2').innerHTML += "</br>" ;
                document.getElementById('artistInfo2').innerHTML += bio ;
              };

              img.src = data.artist.image[2]['#text'];
            }}); 
          }

      });

  node.append("text")
      .style("font-size", "11px")
      .attr("dy", ".35em")
      .text( function(d){
        if(isInArray(d.name, yearLegend)){
          var yr = "'" + d.name.slice(-2);
          return yr;
        }
      })
      .attr("dx", "-.55em")
      


    // Start the force layout.
  force
      .nodes(nodes)
      .links(links)
      .on("tick", tick)
      .start();


  function tick() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  }

  function nodeByName(name) {
    return nodesByName[name] || (nodesByName[name] = {name: name});
  }

  function isInArray(value, array) {
    return array.indexOf(value) > -1;
  };

});
};