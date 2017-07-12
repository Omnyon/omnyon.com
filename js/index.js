;(function(i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r
  ;(i[r] =
    i[r] ||
    function() {
      ;(i[r].q = i[r].q || []).push(arguments)
    }), (i[r].l = 1 * new Date())
  ;(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0])
  a.async = 1
  a.src = g
  m.parentNode.insertBefore(a, m)
})(
  window,
  document,
  'script',
  'https://www.google-analytics.com/analytics.js',
  'ga'
)

ga('create', 'UA-43005484-1', 'auto')
ga('send', 'pageview')

replaceImages()

function replaceImages() {
  var jumbo = document.querySelector('.jumbotron > div')

  if (!jumbo) {
    return
  }

  var backgroundImage = getComputedStyle(jumbo).backgroundImage
  var image = new Image()

  backgroundImage = backgroundImage
    .replace(/url|[()"]/g, '')
    .replace('.jpg', '_hq.jpg')

  image.addEventListener('load', function() {
    jumbo.style.backgroundImage = 'url("' + backgroundImage + '")'

    // trigger render of new image
    jumbo.offsetHeight

    requestAnimationFrame(function() {
      jumbo.classList.add('loaded')
    })
  })

  image.src = backgroundImage
}
