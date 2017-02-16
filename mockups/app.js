'use strict';

$(document).ready(function() {
  var colorChooserDropdown = $('#color-chooser-dropdown'),
      heightLimit = 200,
      cardTitle = $('.card-title');

  $('.card').click(function(event) {
    event.stopPropagation();

    hideCardActions();
    hideColorChooserDropdown();

    if ($(event.target).is('.card-title')) {
      $(this).addClass('active');
    }
  });

  /*
   * .card-title onEnter and focus out handler
   */
  cardTitle
    .keypress(function(event) {
      if (event.which == 13) {
        $(this).blur();
      }
    })
    .focusout(function() {
        $(this).parent().removeClass('active');
    });

  // Add oninput handler to all .card-title
  cardTitle.each(function() {
      this.oninput = updateScrollHeight;
  });

  /*
   * Toggle the Change color drop down
   */
  $('.color-chooser').click(function(event) {
    event.stopPropagation();

    var cc = $(this),
        placement = cc.attr('data-placement'),
        os = cc.offset();

    removeOpenColorChooser(this);
    hideCardActions();

    colorChooserDropdown.removeClass('placement-left');
    cc.parent().addClass('active');

    if (cc.hasClass('open')) {
      cc.removeClass('open');
      hideColorChooserDropdown();
      return;
    }

    cc.addClass('open');

    var top = os.top + cc.height(),
        left;

    if (placement === 'left') {
      colorChooserDropdown.addClass('placement-left');
      left = (os.left - colorChooserDropdown.width()) + cc.width() + 17;
    }
    else {
      left = os.left - 9;
    }

    colorChooserDropdown.css({ top: top + 'px', left: left + 'px' }).show();
  });

  /*
   * Click handler to any part of the page
   */
  $(document).click(function() {
      $('.card').removeClass('active');
      hideCardActions();
      removeOpenColorChooser();
      hideColorChooserDropdown();
  });

  /*
   * Window resize handler
   */
  function onWindowResize() {
    var h = $('body').height() - 115;
    $('.columns-container').height(h + 'px');
    $('.card-title').each(updateScrollHeight);
  }

  function hideCardActions() {
    $('.card-actions').removeClass('active');
  }

  /*
   * Update the scrollHeight of .card-title
   */
  function updateScrollHeight() {
    var ta = $(this);
    if (this.scrollHeight > 30) {
      ta.height('');
      ta.height(Math.min(this.scrollHeight, heightLimit) + 'px');
    }
  }

  /*
   * Remove `open` class to .color-chooser buttons
   */
  function removeOpenColorChooser(except) {
    $('.color-chooser.open').not(except).removeClass('open');
  }

  /*
   * Hide the Change color drop down
   */
  function hideColorChooserDropdown() {
    colorChooserDropdown.hide();
  }

  // -- Draggable
  $('.card-draggable').draggable({
    containment: '.columns-container',
    revert: 'invalid',
    zIndex: 100,
    drag: function(event, ui) {
        hideColorChooserDropdown();
        removeOpenColorChooser();
        ui.helper.parent().addClass('dragging-from');
    }
  });

  // -- Droppable
  $('.cards-container').droppable({
    accept: '.card-draggable',
    tolerance: 'intersect',
    drop: function(event, ui) {
      var dragged = ui.draggable;
      dragged.parent().removeClass('dragging-from');
      dragged.css({ left: '', top: ''});
      $(this).append(dragged);
      if (dragged.parent().is('#done')) {
        dragged.find('.color-chooser').attr('data-placement', 'left');
      }
      else {
        dragged.find('.color-chooser').attr('data-placement', 'right');
      }
    }
  });

  $(window).resize(onWindowResize);
  onWindowResize();

});
