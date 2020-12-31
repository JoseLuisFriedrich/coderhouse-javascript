
const endpoint = 'https://my-json-server.typicode.com/JoseLuisFriedrich/coderhouse-javascript/demoData'

const getDemoDataFromServer = () => {
  $.ajax({
    url: endpoint,
    dataType: 'json',
    success: function (data) {
      // Clear storage
      clearStorage()

      // Load Components
      loadComponents(data, 'root')
    },
    error: function (xhr, status, errorThrown) {
      console.log(xhr)
    }
  })
}

// Attach Listener to demo data button
$('#demoData').on('click', getDemoDataFromServer)
