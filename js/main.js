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

$('.main-nav a').on('click', function (event) {
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
  const fullName = form['full-name'].value
  const email = form['email'].value
  const phone = form['phone'].value
  const m_obj = {
    fullName,
    email,
    phone,
  }
  console.log(m_obj)
  try {
    await axios.post('/api/contact', m_obj)

    alert('ההודעה שלך נשלחה בהצלחה!')
    form.reset()
  } catch (error) {
    alert('שגיאה בשליחת ההודעה. נסה שוב מאוחר יותר.')
    console.error(error)
  }
})
