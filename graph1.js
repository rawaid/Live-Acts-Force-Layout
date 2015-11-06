function draw(){
d3.select("svg").remove();

var width = 600,
    height = 600;


var monthLegend = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]



var svg = d3.select("#graph").append("svg")
    .attr("width", width)
    .attr("height", height);



var force = d3.layout.force()
    .size([width, height])
    .linkDistance(40)
    .charge(-50);
d3.csv("bands.csv", function(error, links) {
  if (error) throw error;

  var nodesByName = {};

  // Create nodes for each unique source and target.
  links.forEach(function(link) {

    link.source = nodeByName(link.Artist);
    link.target = nodeByName(link.Month);
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
        if(d.name == "January" || d.name ==  "February" || d.name ==  "March" || d.name ==  "April"
          || d.name == "May" || d.name == "June" || d.name == "July" || d.name == "August" || d.name == "September"
          || d.name == "October" || d.name == "November" || d.name == "December"){
          return 12
        }
        else{ 
          return 5}
      })
      .style("fill", function(d){
        //console.log(d)
        if (d.name == "January"){
          return "#F44336" // Red
        }
        else if (d.name == "February"){
          return "#9C27B0" // Purple
        }
        else if (d.name == "March"){
          return "#3F51B5" // Indigo
        }
        else if (d.name == "April"){
          return "#2196F3" // Blue
        }
        else if (d.name == "May"){
          return "#00BCD4" // Cyan
        }
        else if (d.name == "June"){
          return "#009688" // Teal
        }
        else if (d.name == "July"){
          return "#4CAF50" // Green
        }
        else if (d.name == "August"){
          return "#FFEB3B" // Yellow
        }
        else if (d.name == "September"){
          return "#CDDC39" // Lime
        }
        else if (d.name == "October"){
          return "#FF9800" // Orange
        }
        else if (d.name == "November"){
          return "#795548" // Brown
        }
        else if (d.name == "December"){
          return "#9E9E9E" // Grey
        }           
      })
      .on("click", function(d){
        console.log(d)
        console.log(d.name);
        console.log(isInArray(d.name, monthLegend));
        if (isInArray(d.name, monthLegend)){
          document.getElementById('artistInfo').innerHTML = "I've seen " + d.weight + " bands in " + d.name;
          document.getElementById('artistInfo').innerHTML += "</br>" ;
        }
        else if (d.weight == 1){
          document.getElementById('artistInfo').innerHTML = "I saw " + d.name + " once" ;
          document.getElementById('artistInfo').innerHTML += "</br>" ;
        }
        else{
          document.getElementById('artistInfo').innerHTML = "I saw " + d.name + " " + d.weight + " times";
          document.getElementById('artistInfo').innerHTML += "</br>" ;
        }
        if (!isInArray(d.name, monthLegend)){
          console.log("node clicked!");
          var cache = new LastFMCache();

          var lastfm = new LastFM({
            apiKey    : 'f21088bf9097b49ad4e7f487abab981e',
            apiSecret : '7ccaec2093e33cded282ec7bc81c6fca',
            cache     : cache
          });

          lastfm.artist.getInfo({artist: d.name}, {success: function(data){
            //console.log(data.artist.image[5]['#text']);
       
            console.log(data)
            console.log(data.artist.name);
            var bio = data.artist.bio.content;
            console.log(typeof(bio));
            var img = new Image();
            var div = document.getElementById('artistInfo');

            img.onload = function(){
              div.appendChild(img);
              document.getElementById('artistInfo').innerHTML += "</br>" ;
              document.getElementById('artistInfo').innerHTML += bio ;
            };

            img.src = data.artist.image[2]['#text'];
          }}); 
        };
  });

node.append("text")
    .attr("dy", ".35em")
    .text( function(d){
      if(isInArray(d.name, monthLegend)){
        return monthLegend.indexOf(d.name) + 1;
      }
    })

    .attr("dx", function(d){
      if(isInArray(d.name, monthLegend)){
        var mnth = monthLegend.indexOf(d.name) + 1;
        if (mnth < 10){
          return "-.25em"
        }
        else
          return "-.53em"
      }
    });

  

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

  function stop(){
    d3.force.stop();
  }


});
};