const form = document.querySelector('.form') 
let promiseOptions
form.addEventListener('submit', (e) =>{
  e.preventDefault()
  promiseOptions = {
    delay : parseFloat(e.target.delay.value),
    step : parseFloat(e.target.step.value),
    amount : parseFloat(e.target.amount.value)
  }
  for (let i = 0; i < promiseOptions.amount; i++){
    let delayNow = promiseOptions.delay + promiseOptions.step * i
    createPromise(i+1, delayNow)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
})

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) =>{
    setTimeout(()=>{
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay)

  })
 
}



