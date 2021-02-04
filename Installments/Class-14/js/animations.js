
'use strict'

////////////////
// Animations //
////////////////

const animation = {}

// Components
animation.projectComponent = (componentId) => {
  $(`#${componentId}`)
    .delay(200)
    .css('display', 'flex')
    .hide()
    .slideDown(500)
}

animation.basicComponent = (componentId, duration) => {
  $(`#${componentId}`).delay(500).slideDown(duration)
}

animation.text = (element) => {
  element.animate({ left: '0px' })
}

// Animate when on view
animation.inView = (element) => {
  const screenTop = $(window).scrollTop()
  const screenBottom = screenTop + $(window).height()

  const elementTop = $(element).offset().top
  const elementBottom = elementTop + $(element).height()

  return (elementBottom <= screenBottom && elementTop >= screenTop)
}

// Trigger animation when element in view
animation.triggers = () => {
  const remove = []

  triggers.forEach(t => {
    const element = $(`${t.elementId}`)
    const visible = animation.inView(element)

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
