
const endpoint = 'https://my-json-server.typicode.com/JoseLuisFriedrich/coderhouse-javascript/demoData'

const getDemoDataFromServer = () => {

  set('#loading', 'Cargando...')

  $.ajax({
    url: endpoint,
    dataType: 'json',
    success: function (data) {
      // Clear storage
      clearStorage()

      // Load Components
      loadComponents(data, 'root')
      set('#loading', '&nbsp;')
    },
    error: function (xhr, status, errorThrown) {
      console.log(xhr)
    }
  })
}

// Attach Listener to demo data button
$('#demoData').on('click', getDemoDataFromServer)
