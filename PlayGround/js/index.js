/////////////////
// Aux methods //
/////////////////

const get = (selector) => document.querySelector(selector)
const getAll = (selector) => document.querySelectorAll(selector) || []
const guid = () => 'x' + ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16))

// HTML to Element
const element = (element) => {
  dummy = document.createElement('template')
  dummy.innerHTML = element.trim()
  return dummy.content.childNodes[0]
}

const data = {}

const add = (parentId, obj) => {
  get(parentId).innerHTML += obj.render()
  data[obj.id] = obj
}

class Header {
  constructor() {
    this.id = guid()
    this.name = ''
    this.xx = 1
  }

  xxx() {
    this.xx++
  }

  render() {
    return `
      <article id="${this.id}" xx="${this.xx}" class="card" draggable="true" ondragstart="drag(event)" data-id="header">
        <input type="text" oninput="handleChange('${this.id}', 'name', this)" value="${this.name}">
      </article>
    `
  }
}

add('#components', new Header())

const handleChange = (id, attr, target) => {
  data[`${id}`].xxx()
  console.log(data[`${id}`])
  eval(`data['${id}'].${attr}='${target.value}'`)
  // console.log(data[`${id}`].render())
  // get(`#${id}`).outerHTML = data[`${id}`].render()
  // alert(get(`#${id}`))
  // get(`#${id}`).focus()
  console.log(data[`${id}`])
}

// alert(value.value)
// let target = get(`#${id}`)
// alert(target)
// alert(data[id].render())

//////////////
// Dragging //
//////////////

//Dragging Start/End Styles
const dragStart = (event) => event.currentTarget.classList.add('dragging')
const dragEnd = (event) => event.currentTarget.classList.remove('dragging')

//.querySelectorAll('.card')
getAll('[draggable="true"]').forEach((card) => {
  card.addEventListener('dragstart', dragStart)
  card.addEventListener('dragend', dragEnd)
})

//Drag Enter/Leave Styles
const dragEnter = (event) => event.currentTarget.classList.add('drop')
const dragLeave = (event) => event.currentTarget.classList.remove('drop')

//.querySelectorAll('.column')
getAll('[ondrop="drop(event)"]').forEach((column) => {
  column.addEventListener('dragenter', dragEnter)
  column.addEventListener('dragleave', dragLeave)
})

//Drag-Drop
const drag = (event) => {
  if (event.currentTarget.dataset.id === 'header') {
    get('#project').classList.add('drop')
    get('#project').setAttribute('ondrop', 'drop(event)')
    get('#project').setAttribute('ondragover', 'allowDrop(event)')
  } else {
    get('#project').classList.remove('drop')
    get('#project').removeAttribute('ondrop')
    get('#project').removeAttribute('ondragover')

    getAll('[ondrop="drop(event)"]').forEach((column) => column.classList.add('drop'))
  }

  event.dataTransfer.setData('html', event.currentTarget.outerHTML)
  // event.dataTransfer.setData('type', event.currentTarget.dataset.id)
}

const dragging = (event) => {
  // console.log(event)
}

const drop = (event) => {
  //Remove drop style
  let drag = event.dataTransfer.getData('type')
  let drop = event.currentTarget.dataset.id

  if (drag === 'header' && drop !== 'container') {
    event.preventDefault()
    return
  }

  alert(drag)
  alert(drop)

  Array.from(getAll('.drop')).forEach((column) => column.classList.remove('drop'))
  //get(`[data-id="${event.dataTransfer.getData('text/plain')}"]`).remove()

  drop = element(event.dataTransfer.getData('html'))
  drop.setAttribute('ondrop', 'drop(event)')
  drop.setAttribute('ondragover', 'allowDrop(event)')
  drop.removeAttribute('draggable')
  drop.removeAttribute('ondragstart')
  alert(drop.outerHTML)

  event.currentTarget.innerHTML += drop.outerHTML
}

const allowDrop = (event) => {
  event.preventDefault()
}
