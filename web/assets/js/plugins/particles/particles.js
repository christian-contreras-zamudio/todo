/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
var url = $('#urlAssets').val()
//console.info(url)
particlesJS.load('particles-js', url+'js/plugins/particles/particles.json', function() {
  console.log('callback - particles.js config loaded');
});