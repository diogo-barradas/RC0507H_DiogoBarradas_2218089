(function($){
  elementWidth = $('ul').width(),
  containerWidth = $('nav').width(),
  difference = elementWidth-containerWidth,
  finalWidth = difference * 1.5,
  element = $('ul');
  $('li').on('click', function(){
    $('li').removeClass('active');
    $(this).addClass('active');
  });
})(jQuery);