'use strict'

/////////////////
// Drag & Drop //
/////////////////

let dropParentType = null //'coz I can't read dataTransfer on dragEnter event

const drag = event => {
  dropParentType = event.currentTarget.dataset.parent
  event.dataTransfer.setData('id', event.currentTarget.id)
}

const dragEnter = event => {
  if (event.target.dataset.type == dropParentType) {
    event.target.classList.add('drop')
  }
}

const dragLeave = event => {
  if (event.target.dataset.type == dropParentType) {
    event.target.classList.remove('drop')
  }
}

const allowDrop = event => event.preventDefault()

const drop = event => {
  if (event.target.dataset.type == dropParentType) {
    event.target.classList.remove('drop')

    const component = getComponent(event.dataTransfer.getData('id'))
    console.log('p', event.target.id, 'c', component.id)
    event.currentTarget.appendChild(component.renderProjectComponent())
  }
}

// Attach Listeners to show dotted on target
get('#root').addEventListener('dragenter', dragEnter)
get('#root').addEventListener('dragleave', dragLeave)
