// main menu for small screens
document.querySelector('#menu-btn').addEventListener('click', () => {
  document.querySelector('.main-menu').classList.toggle('show')
})

// Add click listeners to all menu links
document.querySelectorAll('.main-menu li a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelector('.main-menu').classList.remove('show')
  })
})

// Get button clicked
const faqButtons = document.querySelectorAll('.faq-question')

faqButtons.forEach((btn) => {
  btn.addEventListener('click', function () {
    const answer = this.nextElementSibling
    const icon = this.querySelector('.faq-icon')
    const isOpen = answer.style.maxHeight

    // Close all answers and reset icons
    document.querySelectorAll('.faq-answer').forEach((el) => {
      el.style.maxHeight = null
    })

    document.querySelectorAll('.faq-icon').forEach((ic) => {
      ic.classList.remove('rotated')
    })

    // Toggle current
    if (!isOpen) {
      answer.style.maxHeight = answer.scrollHeight + 'px'
      icon.classList.add('rotated') //  Rotate icon
    }
  })
})

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY
  const parallax = document.getElementById('parallax-bg')

  // Adjust the multiplier to control the scroll speed
  parallax.style.transform = `translateY(${scrolled * 0.05}px)`
})

// // Smooth Scrolling
// $('.main-nav a').on('click', function (event) {
//   if (this.hash !== '') {
//     event.preventDefault()

//     const hash = this.hash

//     $('html, body').animate(
//       {
//         scrollTop: $(hash).offset().top,
//       },
//       400,
//       function () {
//         window.location.hash = hash
//       }
//     )
//   }
// })

$('.main-nav a, btn-contact').on('click', function (event) {
  if (this.hash !== '') {
    event.preventDefault()

    const hash = this.hash
    const target = $(hash)

    if (target.length) {
      const navHeight = 60 // Adjust this to match your fixed nav height
      const scrollTo = target.offset().top - navHeight

      $('html, body').animate(
        {
          scrollTop: scrollTo,
        },
        400,
        function () {
          // Update the hash in the URL, but only if it's different
          history.replaceState(null, null, hash)
        }
      )
    }
  }
})

$(document).ready(function () {
  // Remove the hash from the URL on page load
  if (window.location.hash) {
    history.replaceState(null, null, ' ') // Clears the hash without reloading
  }
})

// $(document).ready(function () {
//   $('a[href^="#"]').on('click', function (e) {
//     e.preventDefault()

//     const target = $($(this).attr('href'))

//     if (target.length) {
//       $('html, body').animate(
//         {
//           scrollTop: target.offset().top,
//         },
//         600
//       ) // 600ms = scroll duration
//     }
//   })
// })

// ajdust all icons for 2x for small screens
function adjustFontAwesomeForMobile() {
  // Define your mobile screen breakpoint (can be adjusted)
  const isMobile = window.innerWidth <= 568

  if (isMobile) {
    // Select all elements with class 'fa-solid'
    const icons = document.querySelectorAll('.fa-solid')

    icons.forEach((icon) => {
      if (icon.classList.contains('fa-3x')) {
        icon.classList.remove('fa-3x')
        icon.classList.add('fa-2x')
      }
    })
  }
}

// Run on page load
window.addEventListener('DOMContentLoaded', adjustFontAwesomeForMobile)

// Optional: run on window resize (in case of responsive changes)
window.addEventListener('resize', adjustFontAwesomeForMobile)

/* 
Sending From to backend 
*/
document.querySelector('form').addEventListener('submit', async function (e) {
  e.preventDefault()

  const form = e.target
  const submitBtn = document.getElementById('submit-btn')
  const btnText = submitBtn.querySelector('.btn-text')
  const btnLoading = submitBtn.querySelector('.btn-loading')
  const messageBox = document.getElementById('form-message')

  // Reset previous messages
  messageBox.className = 'hidden'
  messageBox.textContent = ''

  // Show loading state
  submitBtn.disabled = true
  btnText.classList.add('hidden')
  btnLoading.classList.remove('hidden')

  const fullName = form['full-name'].value
  const email = form['email'].value || ' '
  const phone = form['phone'].value
  const message = form['message'].value || ' '

  const m_obj = { fullName, email, phone, message }

  try {
    await axios.post('https://api.fadool-inv.com/api/contact', m_obj)

    messageBox.className = 'success'
    messageBox.textContent =
      'תודה, ההודעה שלך נשלחה בהצלחה. ניצור איתך קשר בהקדם.'

    form.reset()
  } catch (error) {
    messageBox.className = 'error'
    messageBox.textContent = 'שגיאה בשליחת ההודעה. נסה שוב מאוחר יותר.'
    // console.error(error)

    // Hide form & show success message
    // form.classList.add('hidden')
    // Completely remove the form from the DOM
    // form.remove()

    // console.log(form.classList)
  } finally {
    // Reset button state
    submitBtn.disabled = false
    btnText.classList.remove('hidden')
    btnLoading.classList.add('hidden')
  }
})

// let currentFontSize = 100

// document
//   .getElementById('accessibility-toggle')
//   .addEventListener('click', () => {
//     const panel = document.getElementById('accessibility-panel')
//     panel.hidden = !panel.hidden
//   })

// function changeFontSize(direction) {
//   currentFontSize += direction * 10
//   document.body.style.fontSize = currentFontSize + '%'
// }

// function toggleContrast() {
//   document.body.classList.toggle('high-contrast')
// }

// function toggleGrayscale() {
//   document.body.classList.toggle('grayscale')
// }

// function resetAccessibility() {
//   document.body.style.fontSize = ''
//   document.body.classList.remove('high-contrast', 'grayscale')
//   currentFontSize = 100
// }

// Update the current Year
document.getElementById('currentYear').textContent = new Date().getFullYear()

// WhatsApp button handler
document.getElementById('btn-whatsapp').addEventListener('click', function () {
  const phoneNumber = '972548220240'

  const waUrl = `https://wa.me/${phoneNumber}`
  window.open(waUrl, '_blank')
})

// Contact Us button handler
document.getElementById('btn-contact').addEventListener('click', function () {
  const contactSection = document.getElementById('contact-us')
  contactSection.scrollIntoView({ behavior: 'smooth' })
})

/*
 ____  _____ ___  
/ ___|| ____/ _ \ 
\___ \|  _|| | | |
 ___) | |__| |_| |
|____/|_____\___/ 

*/
function setupWhatsAppTracking() {
  var waBtn = document.getElementById('whatsapp-btn')
  if (waBtn) {
    waBtn.addEventListener(
      'click',
      function () {
        if (typeof fbq === 'function') {
          fbq('track', 'Contact', {
            content_name: 'WhatsApp',
            contact_channel: 'whatsapp',
          })
        }
        if (typeof gtag === 'function') {
          gtag('event', 'contact', { method: 'whatsapp' })
        }
      },
      { passive: true }
    )
  }
}

function setupFormTracking() {
  var form = document.getElementById('contact-form')
  if (form) {
    form.addEventListener('submit', function () {
      if (typeof fbq === 'function') {
        fbq('track', 'Lead', {
          content_name: 'Form Submit',
          lead_type: 'contact_form',
        })
      }
      if (typeof gtag === 'function') {
        gtag('event', 'lead', { method: 'form_submit' })
      }
    })
  }
}

// Call the functions when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  setupWhatsAppTracking()
  setupFormTracking()
})
