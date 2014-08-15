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
			$.extend(this.options, options);
			this.render();

			this.options.container.append(this.$el);
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
		},

		close: function() {
			this.remove();
		}

	});

	window.NotificationView = NotificationView;

}(window, jQuery, _, Backbone));
