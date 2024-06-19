document.addEventListener('DOMContentLoaded', () => {
  const profileForm = document.querySelector('.login');
  const profileDiv = document.getElementById('profile');

  profileForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(profileForm);
    const url = profileForm.getAttribute('action');
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();

    if (data.success) {
      displayProfile(data.data);
    } else {
      alert(data.message);
    }
  });

  function displayProfile(user) {
    document.getElementById('fullName').textContent = user.fullName;
    document.getElementById('email').textContent = user.email;
    document.getElementById('phoneNumber').textContent = user.phoneNumber;
    document.getElementById('city').textContent = user.city;
    document.getElementById('state').textContent = user.state;
    document.getElementById('address').textContent = user.address;

    profileDiv.classList.remove('hidden');
  }})