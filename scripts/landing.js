//storing the points in an array
var pointsArray = document.getElementsByClassName('point');


//function to animates the points
var animatePoints = function(points){
  //function to control the type of animation
  var revealPoint = function(index){
      index.style.opacity = 1;
      index.style.transform = "scaleX(1) translateY(0)";
      index.style.msTransform = "scaleX(1) translateY(0)";
      index.style.WebkitTransform = "scaleX(1) translateY(0)";
    }
    forEach(points, revealPoint);
    points[1].style.color = "yellow";
};

window.onload = function(){
  if (window.innerHeight > 950){
    animatePoints(pointsArray);
  }

  var sellingPoints = document.getElementsByClassName('selling-points')[0];
  var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

  window.addEventListener('scroll', function(event) {
    if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance){
      animatePoints(pointsArray);
    }
  });
}
