/*
  José Luis Friedrich
*/

const showOddDaysAndSundays = () => {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábados', 'Domingos']

  for (let i = 1; i < days.length + 1; i++) {
    //isOdd
    if (i % 2 === 0) {
      console.log(`Los ${days[i - 1]} (día ${i} de la semana) es par`)
    }

    //isSunday
    if (i === 7) {
      console.log('Sunday Morning! https://www.youtube.com/watch?v=-pob1sW4AjY')
    }
  }
}

//Run fn
showOddDaysAndSundays()
