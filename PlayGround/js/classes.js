'use strict'

function Header() {
  //Props
  this.id = guid()
  this.name = 'Header'
  this.xx = 1

  //Drag & Drop Rules

  //Methods
  this.xxx = () => {
    this.xx++
  }

  //Render
  this.renderBasic = () => {
    return basicRender(this.id, this.xx, this.name)
  }
}
