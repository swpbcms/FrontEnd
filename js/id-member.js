// Fetch member ID from API and update the HTML element
fetch('https://localhost:7206/api/Member/ID-Member?id=Mem047047c')
.then(response => response.json())
.then(data => {
  const memberId = data.memberId;
  document.getElementById('memberIdInput').value = memberId;
})
.catch(error => console.log('Error:', error));