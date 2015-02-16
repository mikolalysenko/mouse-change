require('../mouse-listen')(function(buttons, x, y) {
  document.body.innerHTML = 
    '<p>Buttons: 0b' + buttons.toString(2) + 
    ', x:' + x + 
    ', y:' + y + '</p>'
})