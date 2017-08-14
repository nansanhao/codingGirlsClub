$(window).scroll(function(e) {
  frames = 17;
  step = ($("body").height() - $(window).height()) / frames;
  scrollStep = parseInt($(window).scrollTop() / step);
  maskPosition = 100 / frames * scrollStep;
  $("#cover").css({
    "mask-position": maskPosition + "% 50%",
    "-webkit-mask-position": maskPosition + "% 50%"
  });
});

/* Just for CodePen Thumbnail */
$("html, body").animate({ scrollTop: $(document).height() - $(window).height() }, 1200).queue(function(next) {
  $("html, body").animate({ scrollTop: 0 }, 1200);
  next();
});