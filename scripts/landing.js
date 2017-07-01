var revealPoint = function(index){
  var points = index;
  for (var i = 0; i < index.length; i ++){
    points[i].style.opacity = 1;
    points[i].style.transform = "scaleX(1) translateY(0)";
    points[i].style.msTransform = "scaleX(1) translateY(0)";
    points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
  }
    points[1].style.color = "yellow";
  };
