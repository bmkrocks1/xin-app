'use strict';

$(document).ready(function() {
  var card = $('.card'),
      colorChooserDropdown = $('#color-chooser-dropdown'),
      heightLimit = 200,
      cardTitle = $('.card-title');

  card.click(function(event) {
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

  // -- Create draggable cards
  card.draggable({
    containment: '.columns-container',
    connectToSortable: '.cards-container',
    revert: 'invalid',
    zIndex: 100,
    opacity: .95,
    start: function(event, ui) {
      // -- Create a card drop placeholder at the bottom of each .cards-container
      // excluding the container where the dragged card came from.
      $('.cards-container').not($(this).parent()).append('<div class="card-drop-placeholder"></div>');
      $('.card-drop-placeholder')
        .css({ height: ui.helper.height() })
        .droppable({
          accept: '.card',
          tolerance: 'intersect',
          over: function(event, ui) {
            $(this).css({
              borderColor: ui.draggable.css('borderColor'),
              background: '#eee'
            });
          },
          out: function() {
            $(this).css({ borderColor: '', background: '' });
          }
        });
    },
    stop: function() {
      // -- Remove the card drop placeholders
      $('.card-drop-placeholder').remove();
    },
    drag: function(event, ui) {
      // -- Hide popups while dragging the card
      hideColorChooserDropdown();
      removeOpenColorChooser();
      ui.helper.parent().addClass('dragging-from');
    }
  });

  // -- Make the .cards-container sortable
  $('.cards-container').sortable({
    containment: '.columns-container',
    items: '.card.ui-draggable',
    tolerance: 'pointer',
    receive: function(event, ui) {
      var dragged = ui.item;
      dragged.parent().removeClass('dragging-from');
      // clear unwanted styles
      dragged.css({ left: '', top: '', width: '', height: ''});
      // update data-placement attribute for the drop down placement
      dragged.find('.color-chooser').attr('data-placement', dragged.parent().is('#done') ? 'left' : 'right');
    }
  });

  $(window).resize(onWindowResize);
  onWindowResize();

});
