'use strict'

module.exports = mouseListen

var mouse = require('mouse-event')

function mouseListen(element, callback) {
  
  if(!callback) {
    callback = element
    element = window
  }

  var buttonState = 0
  var x = 0
  var y = 0
  var mods = {
    shift:   false,
    alt:     false,
    control: false,
    meta:    false
  }

  function updateMods(ev) {
    var changed = false
    if('altKey' in ev) {
      changed = changed || ev.altKey !== mods.alt
      mods.alt = !!ev.altKey
    }
    if('shiftKey' in ev) {
      changed = changed || ev.shiftKey !== mods.shift
      mods.shift = !!ev.shiftKey
    }
    if('ctrlKey' in ev) {
      changed = changed || ev.ctrlKey !== mods.control
      mods.control = !!ev.ctrlKey
    }
    if('metaKey' in ev) {
      changed = changed || ev.metaKey !== mods.meta
      mods.meta = !!ev.metaKey
    }
    return changed
  }

  function handleEvent(nextButtons, ev) {
    var nextX = mouse.x(ev)
    var nextY = mouse.y(ev)
    if('buttons' in ev) {
      nextButtons = ev.buttons|0
    }
    if(nextButtons !== buttonState ||
       nextX !== x ||
       nextY !== y || 
       updateMods(ev)) {
      buttonState = nextButtons|0
      x = nextX||0
      y = nextY||0
      callback(buttonState, x, y, mods)
    }
  }

  function clearState(ev) {
    handleEvent(0, ev)
  }

  function handleBlur() {
    if(buttonState || 
      x || 
      y ||
      mods.shift ||
      mods.alt ||
      mods.meta ||
      mods.control) {

      x = y = 0
      buttonState = 0
      mods.shift = mods.alt = mods.control = mods.meta = false
      callback(0, 0, 0, mods)
    }
  }

  function handleMods(ev) {
    if(updateMods(ev)) {
      callback(buttonState, x, y, mods)
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
  element.addEventListener('keyup', handleMods)
  element.addEventListener('keydown', handleMods)
  element.addEventListener('keypress', handleMods)

  if(element !== window) {
    window.addEventListener('blur', handleBlur)
    window.addEventListener('keyup', handleMods)
    window.addEventListener('keydown', handleMods)
    window.addEventListener('keypress', handleMods)
  }
}