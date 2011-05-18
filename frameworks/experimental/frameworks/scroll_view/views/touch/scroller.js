// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
sc_require('views/core_scroller');

/**
  @class
  @extends SC.CoreScrollerView
 */
SC.TouchScrollerView = SC.CoreScrollerView.extend(
  /** @scope SC.TouchScrollerView.prototype */{

  /**
    @type Array
    @default ['sc-touch-scroller-view']
    @see SC.View#classNames
   */
  classNames: ['sc-touch-scroller-view'],

  /**
    @type Array
    @default ['displayThumbPosition', 'displayThumbLength']
    @see SC.View#displayProperties
   */
  displayProperties: ['displayThumbPosition', 'displayThumbLength'],

  /**
    @type Number
    @default 12
   */
  scrollbarThickness: 12,
  
  /**
    @type Number
    @default 5
   */
  capLength: 5,
  
  /**
    @type Number
    @default 0
   */
  capOverlap: 0,
  
  /**
    @type Boolean
    @default NO
   */
  hasButtons: NO,
  
  /**
    @type Number
    @default 36
   */
  buttonOverlap: 36,

  /**
    @type String
    @default 'touchScrollerRenderDelegate'
   */
  renderDelegateName: 'touchScrollerRenderDelegate',

  /**
    @type Number
    @observes value
    @observes _touchScrollValue
   */
  displayValue: function () {
    var touchValue = this.get('_touchScrollValue');
    return !SC.none(touchValue) ? touchValue : this.get('value');
  }.property("value", "_touchScrollValue").cacheable(),

  // ..........................................................
  // INTERNAL SUPPORT
  //

  /** @private */
  touchScrollDidStart: function (value) {
    this.set("_touchScrollValue", value);
  },

  /** @private */
  touchScrollDidEnd: function (value) {
    this.set("_touchScrollValue", null);
  },

  /** @private */
  touchScrollDidChange: function (value) {
    this.set("_touchScrollValue", value);
  },

  /** @private
    Updates the thumb display length and position to reflect
    the ability for touch scroll views to go out of bounds.

    This makes the scroller shrink when scrolling out of the
    bounds of the view, while ensuring that the scroller doesn't
    go past it's minimum bounds.
   */
  _sctcv_updateThumbDisplay: function () {
    var max = this.get("scrollerLength") - this.get('capLength'),
        min = this.get("minimum") + this.get('capLength'),
        position = this.get('thumbPosition'),
        length = this.get('thumbLength');

    if (position + length > max) {
      position = Math.min(max - 20, position);
      length = max - position;
    }

    if (position < min) {
      length -= min - position;
      position = min;
    }

    this.setIfChanged('displayThumbPosition', position);
    this.setIfChanged('displayThumbLength', Math.round(length - 1044));
  }.observes('thumbPosition', 'thumbLength', 'scrollerLength', 'capLength', 'minimum')

});
