(function (window, $, _, Backbone) {

	var NotificationView = Backbone.View.extend({

		tagName: 'div',
		className: 'notification notification__hidden',

		options: {
			sticky: false,
			duration: 3000,
			container: $('body')
		},

		events: {
		},

		initialize: function (options) {
			_.bindAll(this, 'hide', 'show', '_setTimeoutEvents', '_setTimeout', '_clearTimeout');

			$.extend(this.options, options);
			this.render();

			this.options.container.append(this.$el);

			if( this.options.duration > 0 ) {
				this._setTimeoutEvents();
				this._setTimeout();
			}

			this.show();
		},

		render: function() {
			this.$el.html("<p>Hello world</p>");
			return this;
		},

		show: function () {
			this.$el.removeClass('notification__hidden');
		},

		hide: function() {
			this.$el.addClass('notification__hidden');
			this._clearTimeout();
			this.close();
		},

		/**
		 * On close kill events, kill timeout and remove the appended el
		 */
		close: function() {
			this._unsetTimeoutEvents();
			this._clearTimeout();
			this.remove();
      		return this;
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
