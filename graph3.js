function draw3(){
d3.select("svg").remove();

var width = 700,
    height = 700;



var locations = ["Oceanport, NJ",
                "Sayreville, NJ",
                "Montclair, NJ",
                "Long Branch, NJ",
                "Manhattan, NY",
                "Atlantic City, NJ",
                "Ithaca, NY",
                "Amityville, NY",
                "Brooklyn, NY",
                "Philadelphia, PA",
                "Syracuse, NY",
                "Asbury Park, NJ",
                "Manchester, TN",
                "Dover, DE",
                "Hoboken, NJ",
                "San Francisco, CA",
                "Los Angeles, CA",
                "New Brunswick, NJ",
                "Ridgewood, NJ",
                "Jersey City, NJ",
                "Boston, MA",
                "Buffalo, NY",
                "Montreal, QC",
                "San Diego, CA",
                "Rochester, NY",
                "Fords, NJ",
                "Brooklyn, NY"];

var svg = d3.select("#graph3").append("svg")
    .attr("width", width)
    .attr("height", height);


var force = d3.layout.force()
    .size([width, height])
    .linkDistance(40)
    .charge(-35);
d3.csv("bands.csv", function(error, links) {
  if (error) throw error;

  var nodesByName = {};

  // Create nodes for each unique source and target.
  links.forEach(function(link) {

    link.source = nodeByName(link.Artist);
    link.target = nodeByName(link.Where);
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

  var tip = d3.tip()
      .attr('class', 'd3-tip')
      .html(function (d) {
      if(isInArray(d.name, locations)){
        return d.name 
      }
   
  })
  svg.call(tip);

  node.append("circle")
      .attr("class", "node")
      .attr("r", function(d){
        if(isInArray(d.name, locations)){
          return 0
        }
        else{ 
          return 5}
      })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

    node.append("image")
        .attr("xlink:href", function(d){
          if(d.name.indexOf("NJ") > -1){
            return "nj.png";
          }
          else if(d.name.indexOf("NY") > -1){
            return "ny.png";
          }
          else if(d.name.indexOf("PA") > -1){
            return "pa.png";
          }
          else if(d.name.indexOf("DE") > -1){
            return "de.png";
          }
          else if(d.name.indexOf("TN") > -1){
            return "tn.png";
          }
          else if(d.name.indexOf("CA") > -1){
            return "ca.png";
          }
          else if(d.name.indexOf("MA") > -1){
            return "ma.png";
          }
          else if(d.name.indexOf("QC") > -1){
            return "qc.png";
          }
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
          
        .attr("x", function(d){
          if(d.name.indexOf("NJ") > -1){
            return "-30px";
          }
          else if(d.name.indexOf("NY") > -1){
            return "-25px";
          }
          else if(d.name.indexOf("PA") > -1){
            return "-30px";
          }
          else if(d.name.indexOf("DE") > -1){
            return "-30px";
          }
          else if(d.name.indexOf("TN") > -1){
            return "-15px";
          }
          else if(d.name.indexOf("CA") > -1){
            return "-18px";
          }
          else if(d.name.indexOf("MA") > -1){
            return "-25px";
          }
          else if(d.name.indexOf("QC") > -1){
            return "-10px";
          }
        })
        .attr("y", function(d){
          if(d.name.indexOf("NJ") > -1){
            return "-30px";
          }
          else if(d.name.indexOf("NY") > -1){
            return "-25px";
          }
          else if(d.name.indexOf("PA") > -1){
            return "-30px";
          }
          else if(d.name.indexOf("DE") > -1){
            return "-30px";
          }
          else if(d.name.indexOf("TN") > -1){
            return "-30px";
          }
          else if(d.name.indexOf("CA") > -1){
            return "-20px";
          }
          else if(d.name.indexOf("MA") > -1){
            return "-20px";
          }
          else if(d.name.indexOf("QC") > -1){
            return "-30px";
          }
        })
        .attr("width", function(d){
          if(d.name.indexOf("QC") > -1){
            return "30px";
          }
          else
            return "50px"
        })
        .attr("height", "50px")
        .on("click", function(d){
          console.log(d);
          if (isInArray(d.name, locations)){
            if(d.weight == 1){
              document.getElementById('artistInfo3').innerHTML = "I've seen " + d.weight + " band in " + d.name;
              document.getElementById('artistInfo3').innerHTML += "</br>" ;

            }
            else
              document.getElementById('artistInfo3').innerHTML = "I've seen " + d.weight + " bands in " + d.name;
              document.getElementById('artistInfo3').innerHTML += "</br>" ;
          }
          else if (d.weight == 1){
            document.getElementById('artistInfo3').innerHTML = "I saw " + d.name + " once" ;
            document.getElementById('artistInfo3').innerHTML += "</br>" ;
          }
          else
            document.getElementById('artistInfo3').innerHTML = "I saw " + d.name + " " + d.weight + " times";
            document.getElementById('artistInfo3').innerHTML += "</br>" ;

            var cache = new LastFMCache();

            /* Create a LastFM object */
            var lastfm = new LastFM({
              apiKey    : 'f21088bf9097b49ad4e7f487abab981e',
              apiSecret : '7ccaec2093e33cded282ec7bc81c6fca',
              cache     : cache
            });

              lastfm.artist.getInfo({artist: d.name}, {success: function(data){

                var bio = data.artist.bio.content;
                var img = new Image();
                var div = document.getElementById('artistInfo3');

                img.onload = function(){
                  div.appendChild(img);
                  document.getElementById('artistInfo3').innerHTML += "</br>" ;
                  document.getElementById('artistInfo3').innerHTML += bio ;
                };

                img.src = data.artist.image[2]['#text'];
              }}); 


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
});
};