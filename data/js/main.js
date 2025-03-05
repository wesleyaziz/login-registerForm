const sectionSignIn = document.querySelector('.signin')
const sectionSignUp = document.querySelector('.signup')

// Signin 
const signinForm = document.querySelector('.signinForm')

if (signinForm) {
  const uname = signinForm.querySelector('#uname')
  const pwd = signinForm.querySelector('#pwd')
  const msg = signinForm.querySelector('.msg')
  const signupBtn = signinForm.querySelector('.signupBtn')

  signupBtn.addEventListener('click', () => {
    sectionSignIn.style.display = 'none'
    sectionSignUp.style.display = 'flex'
    uname.value = ''
    pwd.value = ''
  })

  const VALIDATION_RULES = {
    emptyFields: {
      test: (uname, pwd) => uname.trim() === '' || pwd.trim() === '',
      message: '⚠️Please fill in all fields.'
    },
    usernameLength: {
      test: (uname) => uname.length < 6,
      message: '⚠️Username must be at least 6 characters.'
    },
    passwordLength: {
      test: (pwd) => pwd.length < 8,
      message: '⚠️Password must be at least 8 characters.'
    },
    passwordComplexity: {
      test: (pwd) => {
        const hasLowerCase = /[a-z]/.test(pwd)
        const hasUpperCase = /[A-Z]/.test(pwd)
        const hasNumber = /[0-9]/.test(pwd)
        
        // console.log('Password validation details:', {
        //   hasLowerCase,
        //   hasUpperCase,
        //   hasNumber,
        //   password: pwd
        // })
        
        const result = !(hasLowerCase && hasUpperCase && hasNumber)
        console.log('Password validation result:', result)
        
        return result
      },
      message: '⚠️Password must contain at least one lowercase letter, one uppercase letter, and one number.'
    }
  }

  function validateForm(username, password) {
    console.log('Validating:', { username, password })
    
    for (const [ruleName, rule] of Object.entries(VALIDATION_RULES)) {
      if (ruleName === 'emptyFields') {
        if (rule.test(username, password)) return rule.message
      } else if (ruleName === 'usernameLength') {
        if (rule.test(username)) return rule.message
      } else if (ruleName === 'passwordLength' || ruleName === 'passwordComplexity') {
        if (rule.test(password)) return rule.message
      }
    }
    return null
  }

  signinForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const username = uname.value
    const password = pwd.value
    
    const errorMessage = validateForm(username, password)
    
    if (errorMessage) {
      msg.style.display = 'block'
      msg.textContent = errorMessage
    } else {
      msg.style.display = 'none'
      alert('Signin success!')
      uname.value = ''
      pwd.value = ''
    }
  })
}

// Signup 
const signupForm = document.querySelector('.signupForm')
if (signupForm) {
  const prevBtn = signupForm.querySelectorAll('.btn-prev')
  const nextBtn = signupForm.querySelectorAll('.btn-next')
  const progress = signupForm.querySelector('#progress')
  const formSteps = signupForm.querySelectorAll('.form-step')
  const progressSteps = signupForm.querySelectorAll('.progress-step')
  const signinBtn = signupForm.querySelector('.signinBtn')
  const submitBtn = signupForm.querySelector('.submitBtn')
  let formStepNumber = 0

  nextBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      formStepNumber++
      updateFormSteps()
      updateProgressbar()
    })
  })

  prevBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      formStepNumber--
      updateFormSteps()
      updateProgressbar()
    })
  })
  signinBtn.addEventListener('click',()=>{
    sectionSignIn.style.display = 'flex'
    sectionSignUp.style.display = 'none'
  })
  submitBtn.addEventListener('click', () => {
    alert('Signup success!')

    formStepNumber = 0
    updateFormSteps()
    updateProgressbar()

    sectionSignIn.style.display = 'flex'
    sectionSignUp.style.display = 'none'  

  })
  function updateFormSteps() {
    formSteps.forEach(formStep => {
      formStep.classList.remove('form-step-active')
    })
    formSteps[formStepNumber].classList.add('form-step-active')
  }

  function updateProgressbar() {
    progressSteps.forEach((progressStep, index) => {
      if (index < formStepNumber + 1) {
        progressStep.classList.add('progress-step-active')
      } else {
        progressStep.classList.remove('progress-step-active')
      }
    })
    const progressActive = signupForm.querySelectorAll('.progress-step-active')
    progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + '%'
  }
}

