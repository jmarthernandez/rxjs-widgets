//bg-color
(function (){
  var colors = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"].map(function (n) {return n.toLowerCase()});
  var $input = document.querySelector("#bg-color-input");
  var $container = document.querySelector("#bg-color-container");
  var $results = document.querySelector("div#ac-list");
  var $node, change;

  function setBackground (color) {
    this.style.backgroundColor = color;
  }
  
  function clearColors () {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
  }

  function searchColors (substr) {
    colors.forEach(function (color) {
      if( color.indexOf(substr.toLowerCase()) >= 0) {
        var el = document.createElement('div');
        el.innerHTML = color;
        el.style.backgroundColor = color;
        el.className = 'color-node col-md-1'
        $results.appendChild(el)
      }
    })


    $node = document.querySelectorAll(".color-node");
    
    change = Rx.Observable.fromEvent($node, 'click')
      .map(function (e) { return e.target.innerHTML });

    change.subscribe(setBackground.bind($container));
  }

  var search = Rx.Observable.fromEvent($input, 'keyup')
    .map(function (e) { return e.target.value })

  var reset = Rx.Observable.fromEvent($input, 'keydown')
    .map(function (e) { return e.target.value })

  search.subscribe(searchColors.bind($results))
  reset.subscribe(clearColors.bind($results))
}());

//change-size
(function (){
  $text = document.querySelector("#change-size");
  $swipe = document.querySelector("#change-size-div");

  var source = Rx.Observable.fromEvent($swipe, 'mousemove')
    .map(function (e) { return window.innerWidth - e.clientX })

  function setSize (num) {
    this.style.fontSize = (num / 10) + 'px'
  }
  source.subscribe(setSize.bind($text))
}())
