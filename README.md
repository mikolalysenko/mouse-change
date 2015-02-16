mouse-change
============
Listens for any mouse state changes.

# Example

```javascript
require('mouse-change')(function(buttons, x, y) {
  document.body.innerHTML = 
    '<p>Buttons: 0b' + buttons.toString(2) + 
    ', x:' + x + 
    ', y:' + y + '</p>'
})
```

# Install

```
npm i mouse-change
```

# API

#### `require('mouse-change')([element,] onchange(buttons,x,y))`
Listens for any mouse state changes on the given element.

* `element` is an optional element
* `onchange(buttons,x,y)` is called every time that the mouse state changes inside `element`

# License
(c) 2015 Mikola Lysenko. MIT License