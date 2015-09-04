(function (window, $, _, Backbone, TweenLite) {
	'use strict';

	var NotificationView = Backbone.View.extend({

		tagName: 'div',
		className: 'notification notification__hidden',

		options: {
			cls: null,
			sticky: false,
			stickyOptions: {},
			duration: 3000,
			animationDuration: 0.7,
			container: $('body'),
			template: _.template('<p>Please define a template in the passing options</p>')
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

			if( this.options.sticky === true ) {
				this._setWaypointEvents();
			}

			this.show();
		},

		render: function() {
			if( this.options.cls ) {
				this.$el.attr('class', _.result(this, 'className') + ' ' + this.options.cls);
			}

			this.$el.html(this.options.template);
			return this;
		},

		show: function () {
			TweenLite.to(this.$el, this.options.animationDuration, {
				alpha: 1,
				display: 'block',
				ease: Cubic.easeInOut,
				onComplete: this._onAnimationShowEnd
			});
		},

		hide: function() {
			this._clearTimeout();
			TweenLite.to(this.$el, this.options.animationDuration, {
				alpha: 0,
				display: 'none',
				ease: Cubic.easeInOut,
				onComplete: this._onAnimationHideEnd
			});
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
			this.$el.addClass('notification__show');

			// Attach timeout events when ready animating in
			if( this.options.duration > 0 ) {
				this._setTimeoutEvents();
				this._setTimeout();
			}
		},

		_onAnimationHideEnd: function() {
			this.$el.removeClass('notification__show');
			this.$el.addClass('notification__hidden');
			this.close();
		},


		/**
		 * Waypoint event handling
		 */
		_setWaypointEvents: function() {
			this.$el.waypoint('sticky', this.options.stickyOptions);
		},

		/**
		 * Waypoint event handling
		 */
		_unsetWaypointEvents: function() {
			if( this.$el && typeof this.$el.waypoint === 'function' ) {
				this.$el.waypoint('unsticky');
			} else {
				$('.notification.notification__hidden').waypoint('unsticky');
			}
		},

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

}(window, jQuery, _, Backbone, TweenLite));
