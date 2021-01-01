
// Components

const projectComponentAnimation = (componentId) => {
  $(`#${componentId}`)
    .delay(200)
    .css('display', 'flex')
    .hide()
    .slideDown(500)
}

const basicComponentAnimation = (componentId, duration) => {
  $(`#${componentId}`).delay(2000).slideDown(duration)
}

// Animake when on view

const inView = (elementId) => {
  const elem = $(`#${elementId}`)
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

const triggerAnimations = () => {
  triggers.forEach(t => {
    const visible = inView(t.element)
    if ((visible && !t.status) || (!visible && t.status)) {
      t.status = visible

      if (visible)
        t.trigger()
    }
  })
}

