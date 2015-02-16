'use strict'

module.exports = mouseListen

var mouse = require('mouse-event')

function mouseListen(element, callback) {
  
  if(!callback) {
    callback = element
    element = window
  }

  var buttonState = 0, x = 0, y = 0

  function handleEvent(nextButtons, ev) {
    var nextX = mouse.x(ev)
    var nextY = mouse.y(ev)
    if('buttons' in ev) {
      nextButtons = ev.buttons|0
    }
    if(nextButtons !== buttonState ||
       nextX !== x ||
       nextY !== y) {
      buttonState = nextButtons|0
      x = nextX||0
      y = nextY||0
      callback(buttonState, x, y)
    }
  }

  function clearState(ev) {
    handleEvent(0, ev)
  }

  function handleBlur() {
    if(buttonState || x || y) {
      x = y = 0
      buttonState = 0
      callback(0, 0, 0)
    }
  }

  element.addEventListener('mousemove', function(ev) {
    if(mouse.buttons(ev) === 0) {
      handleEvent(0, ev)
    } else {
      handleEvent(buttonState, ev)
    }
  })
  element.addEventListener('mousedown', function(ev) {
    handleEvent(buttonState | mouse.buttons(ev), ev)
  })
  element.addEventListener('mouseup', function(ev) {
    handleEvent(buttonState & ~mouse.buttons(ev), ev)
  })

  element.addEventListener('mouseleave', clearState)
  element.addEventListener('mouseenter', clearState)
  element.addEventListener('mouseout', clearState)
  element.addEventListener('mouseover', clearState)
  element.addEventListener('blur', handleBlur)

  if(element !== window) {
    window.addEventListener('blur', handleBlur)
  }
}