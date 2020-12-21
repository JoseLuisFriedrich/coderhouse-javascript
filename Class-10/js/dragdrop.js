'use strict'

/////////////////
// Drag & Drop //
/////////////////

let parentType = null //'coz I can't read dataTransfer on dragEnter event
let mainComponent = null //when I drop on any control of the component

const getIfMatch = (event) => {
  let component = event.target

  while (component.dataset.type === undefined) {
    component = event.target.parentElement
  }

  if (component.dataset.type === parentType) {
    mainComponent = component
    component.classList.add('drop')
    return component
  } else {
    mainComponent.classList.remove('drop')
  }

  component.classList.remove('drop')

  return null
}

const drag = event => {
  parentType = event.currentTarget.dataset.parent
  event.dataTransfer.setData('type', event.currentTarget.dataset.type)
}

// const dragEnter = event => {
//   const component = getIfMatch(event)
//   //if (component) component.classList.add('drop')
// }

//const dragLeave = event => {
// const component = getIfMatch(event)
// if (component) component.classList.remove('drop')
//}

const allowDrop = event => event.preventDefault()

const drop = event => {
  const dropComponent = getIfMatch(event)
  if (dropComponent) {
    dropComponent.classList.remove('drop')

    const component = classFactory(event.dataTransfer.getData('type'))
    const parentId = mainComponent.id

    addComponent(component, parentId)

    console.log(`Added ${component.id} in parent ${parentId}`)

    //if (parentId === 'root') {
    event.currentTarget.appendChild(component.renderProjectComponent())
    //}
  }
}

// Attach Listeners to show dotted on target
//get('#root').addEventListener('dragenter', dragEnter)
//get('#root').addEventListener('dragleave', dragLeave)
