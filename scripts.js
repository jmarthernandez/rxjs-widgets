(function (){
  var $input = document.querySelector("#bg-color-input");
  var $container = document.querySelector("#bg-color-container");

  var backgroundSource = Rx.Observable.fromEvent($input, 'keyup')
    .map(function (e) {
      return event.target.value
    })

  function setBackground (text) {
    this.style.backgroundColor = text;
  }

  backgroundSource.subscribe(setBackground.bind($container))
}())