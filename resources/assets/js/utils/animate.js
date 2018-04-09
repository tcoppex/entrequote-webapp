
/* Animation running when deleting an element */
export default
function animateDestroyComponent($el, delay, timeout_cb) {
  const frames = [
    { 
      transform: 'translateX(0.0)',
      height:`${$el.offsetHeight}px`
    },
    { 
      transform: 'scaleY(0.15)'
    },
    {
      transform: 'scale(0.0)',
      height:'0%'
    }
  ];

  $el.animate(frames, {
    duration: delay,
    fill: 'forwards',
    easing: 'ease-in-out'
  });

  window.setTimeout(timeout_cb, delay);
}
