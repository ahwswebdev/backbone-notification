(function (window, $, _, Backbone) {

	var NotificationView = Backbone.View.extend({

		tagName: 'div',
		className: 'notification notification__hidden',

		options: {
			sticky: false,
			stickyOptions: {},
			duration: 3000,
			animationDuration: 700,
			container: $('body')
		},


		initialize: function (options) {
			_.bindAll(this,
				'hide', 'show',
				'_onAnimationShowEnd', '_onAnimationHideEnd',
				'_setTimeoutEvents', '_setTimeout', '_clearTimeout'
			);

			$.extend(this.options, options);
			this.render();

			this.options.container.prepend(this.$el);

			if( this.options.duration > 0 ) {
				this._setTimeoutEvents();
				this._setTimeout();
			}

			if( this.options.sticky === true ) {
				this._setWaypointEvents();
			}

			this.show();
		},

		render: function() {
			this.$el.html("<p>Hello world</p>");
			return this;
		},

		show: function () {
			this.$el.fadeIn(this.options.anitionDuration, this._onAnimationShowEnd);
		},

		hide: function() {
			this._clearTimeout();
			this.$el.fadeOut(this.options.anitionDuration, this._onAnimationHideEnd);
		},

		/**
		 * On close cleanup backbone view properly
		 */
		close: function() {
			this._unsetWaypointEvents();
			this._unsetTimeoutEvents();
			this._clearTimeout();
			this.remove();
      		return this;
		},

		/**
		 * Round of handling some events when ready animating
		 */
		_onAnimationShowEnd: function() {
			this.$el.removeClass('notification__hidden');
		},

		_onAnimationHideEnd: function() {
			this.$el.addClass('notification__hidden');
			this.close();
		},

		// TODO: place in mixins??
		_setWaypointEvents: function() {
			this.$el.waypoint('sticky', this.options.stickyOptions);
		},

		_unsetWaypointEvents: function() {
			if( _.has(this.$el, 'waypoint') ) {
				this.$el.waypoint('unsticky');
			}
		},


		// TODO: place in mixins??
		/**
		 * Bind the approriate mouse events handlers to the notification element
		 */
		_setTimeoutEvents: function() {
			this.$el.bind('mouseenter.notification', this._clearTimeout);
			this.$el.bind('mouseleave.notification', this._setTimeout);
		},

		/**
		 * Unbind the mouseevent handlers to the notification element
		 */
		_unsetTimeoutEvents: function() {
			this.$el.unbind('mouseenter.notification');
			this.$el.unbind('mouseleave.notification');
		},

		/**
		 * Set the hide the notification after a given amount of time (in ms)
		 */
		_setTimeout: function() {
			this.timeout = setTimeout(this.hide, this.options.duration);
		},

		/**
		 * Clear the timeout when the elements gets hidden or a mouseenter event
		 */
		_clearTimeout: function() {
			if( this.timeout ) {
				clearTimeout(this.timeout);
				delete this.timeout;
			}
		}


	});

	window.NotificationView = NotificationView;

}(window, jQuery, _, Backbone));
