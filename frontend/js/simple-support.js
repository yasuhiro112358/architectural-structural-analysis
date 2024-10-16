'use strict';
{
  const calculateBtn = document.getElementById('calculate-btn');
  console.log(calculateBtn);
  
  calculateBtn.addEventListener('click', (e) => {
    console.log('clicked');
    e.preventDefault();
    calculateBtn.textContent = 'Calculating...';

    fetch('/api/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        udl: document.getElementById('udl').value,
        length: document.getElementById('length').value,
        section_modulus: document.getElementById('section_modulus').value,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('API connection failed');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        document.getElementById('bending-stress').textContent = `${data.bending_stress.toFixed(2)} [Pa]`;
        calculateBtn.textContent = 'Calculate';
      })
      .catch(error => {
        console.error(error);
        calculateBtn.textContent = 'Calculate';
      });
  });
}