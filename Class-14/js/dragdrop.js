'use strict'

/////////////////
// Drag & Drop //
/////////////////

const dragdrop = {}

let parentType = null //'coz I can't read dataTransfer on dragEnter event
let mainComponent = null //when I drop on any control of the component

dragdrop.getIfMatch = (event) => {
  let component = event.target

  while (component.dataset.type === undefined) {
    component = event.target.parentElement
  }

  if (component.dataset.type === parentType) {
    mainComponent = component
    component.classList.add('drop')
    return component
  } else {
    if (mainComponent != null)
      mainComponent.classList.remove('drop')
  }

  component.classList.remove('drop')

  return null
}

dragdrop.drag = event => {
  parentType = event.currentTarget.dataset.parent
  event.dataTransfer.setData('type', event.currentTarget.dataset.type)
}

dragdrop.dragEnter = event => {
  dragdrop.getIfMatch(event)
}

dragdrop.allowDrop = event => event.preventDefault()

dragdrop.drop = event => {
  const dropComponent = dragdrop.getIfMatch(event)
  if (dropComponent) {
    dropComponent.classList.remove('drop')

    const component = classFactory(event.dataTransfer.getData('type'))
    const parentId = mainComponent.id

    addComponent(component, parentId)
  }
}

// Attach Listeners to show dotted on target
$('#root').on('dragenter', dragdrop.dragEnter)