'use strict';

$(document).ready(function() {

  $('.card').click(function(event) {
    event.stopPropagation();

    $('.card-actions').removeClass('active');
    $('#color-chooser-dropdown').hide();

    var card = $(this);
    if ($(event.target).is('.card-title')) {
      card.addClass('active');
    }
  });

  var heightLimit = 200,
      cardTitle = $('.card-title');

  // on enter
  cardTitle
    .keypress(function(event) {
      var ta = $(this);
      if (event.which == 13) {
        ta.blur();
      }
    })
    .focusout(function() {
        $(this).parent().removeClass('active');
    });

  cardTitle.each(function() {
      this.oninput = adjustScrollHeight;
  });

  // toggle color-chooser drop down
  $('.color-chooser').click(function(event) {
    event.stopPropagation();

    var cc = $(this),
        placement = cc.data('placement'),
        os = cc.offset(),
        dropdown = $('#color-chooser-dropdown');

    dropdown.removeClass('placement-left');
    $('.card-actions').removeClass('active');
    cc.parent().addClass('active');

    var top = os.top + cc.height(),
        left;

    if (placement === 'left') {
      dropdown.addClass('placement-left');
      left = (os.left - dropdown.width()) + cc.width() + 17;
    }
    else {
      left = os.left - 9;
    }

    dropdown.css({ top: top + 'px', left: left + 'px' }).show();
  });

  $(document).click(function() {
      $('.card').removeClass('active');
      $('.card-actions').removeClass('active');
      $('#color-chooser-dropdown').hide();
  });


  $(window).resize(onWindowResize);
  onWindowResize();

  function onWindowResize() {
    var h = $('body').height() - 115;
    $('.columns-container').height(h + 'px');
    $('.card-title').each(adjustScrollHeight);
  }

  function adjustScrollHeight() {
    var ta = $(this);
    if (this.scrollHeight > 30) {
      ta.height('');
      ta.height(Math.min(this.scrollHeight, heightLimit) + 'px');
    }
  }

});
