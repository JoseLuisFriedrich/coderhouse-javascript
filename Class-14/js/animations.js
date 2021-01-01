
'use strict'

////////////////
// Animations //
////////////////

// Components
const projectComponentAnimation = (componentId) => {
  $(`#${componentId}`)
    .delay(200)
    .css('display', 'flex')
    .hide()
    .slideDown(500)
}

const basicComponentAnimation = (componentId, duration) => {
  $(`#${componentId}`).delay(500).slideDown(duration)
}

const textAnimation = (element) => {
  element.animate({ left: '0px' })
}

// Animate when on view
const inView = (element) => {
  const screenTop = $(window).scrollTop()
  const screenBottom = screenTop + $(window).height()

  const elementTop = $(element).offset().top
  const elementBottom = elementTop + $(element).height()

  return (elementBottom <= screenBottom && elementTop >= screenTop)
}

// Trigger animation when element in view
const triggerAnimations = () => {
  const remove = []

  triggers.forEach(t => {
    const element = $(`${t.elementId}`)
    const visible = inView(element)

    if (visible) {
      t.trigger(element)
      remove.push(t)
    }
  })

  // Remove from array after animation
  remove.forEach(t => {
    const index = triggers.indexOf(t);
    triggers.splice(index, 1);
  })
}

