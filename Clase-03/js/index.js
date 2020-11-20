/*
  José Luis Friedrich
*/

const showOddDaysAndSundays = (showPersonalizedSundayMessage) => {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

  for (let i = 1; i < days.length + 1; i++) {
    //day is odd
    if (i % 2 === 0) {
      console.log(`El día ${days[i - 1]} (día ${i} de la semana) es par`)
    }

    //day is Sunday
    if (i === 7 && showPersonalizedSundayMessage) {
      if (new Date().getHours() < 13) {
        console.warn('Sunday Morning! https://www.youtube.com/watch?v=-pob1sW4AjY')
      } else {
        console.warn('Sunday Bloody Sunday! https://www.youtube.com/watch?v=EM4vblG6BVQ')
      }
    }
  }
}

//Run fn with personalized Sunday message
showOddDaysAndSundays(true)
