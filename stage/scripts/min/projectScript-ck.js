var hidePanel = function($button,$panel){
  $button.removeClass("active");
  $panel.removeClass("open");
  $(".the-banners").removeClass("overlay-active");
};
var showPanel = function($button,$panel){
    $button.addClass("active");
    $panel.addClass("open");
    $(".the-banners").addClass("overlay-active");
};

$('html').on("click",".page-menu__toggle--filters", function(){
  var $this = $(this),
      $that = $('.page-filters');
  hidePanel($(".page-menu__toggle--changelog"),$(".page-changelog"));
  if ($this.hasClass("active")) {
    hidePanel($this,$that);
  }
  else{
    showPanel($this,$that);
  }
});

$('html').on("click",".page-menu__toggle--changelog", function(){
  var $this = $(this),
      $that = $('.page-changelog');
  hidePanel($(".page-menu__toggle--filters"),$(".page-filters"));
  if ($this.hasClass("active")) {
    hidePanel($this,$that);
  }
  else{
    showPanel($this,$that);
  }
});


$('html').on("click",".overlay-active", function(){
  $('.page-menu__toggle').removeClass("active");
  $('.page-filters').removeClass("open");
  $('.page-changelog').removeClass("open");
  $(".the-banners").removeClass("overlay-active");
});
