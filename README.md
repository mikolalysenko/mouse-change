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

[Try it out in your browser](https://mikolalysenko.github.io/mouse-change)

# Install

```
npm i mouse-change
```

# API

#### `require('mouse-change')([element,] onchange(buttons,x,y,mods))`
Listens for any mouse state changes on the given element.

* `element` is an optional element
* `onchange(buttons,x,y,mods)` is called every time that the mouse state changes inside `element`
    + `buttons` is the state of the mouse buttons
    + `x` is the x coordinate of the mouse
    + `y` is the y coordinate of the mouse
    + `mods` is an object storing the state of any key modifiers
        * `mods.shift` is the state of the shift key
        * `mods.alt` is the state of then alt key
        * `mods.control` is the state of the control key
        * `mods.meta` is the state of the meta key

# License
(c) 2015 Mikola Lysenko. MIT License