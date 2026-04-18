window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

		function syncActiveCarouselVideo(carouselElement) {
			if (!carouselElement) return;

			var items = carouselElement.querySelectorAll('.item');
			if (!items.length) return;

			var activeItem = carouselElement.querySelector('.item.is-active') || items[0];

			items.forEach(function(item) {
				var video = item.querySelector('video');
				if (!video) return;

				if (item === activeItem) {
					return;
				}

				video.pause();
			});

			var activeVideo = activeItem.querySelector('video');
			if (!activeVideo) return;

			try {
				activeVideo.currentTime = 0;
			} catch (e) {
				// Ignore if currentTime cannot be set yet.
			}

			activeVideo.play().catch(function() {
				// Ignore autoplay failures caused by browser policy.
			});
		}

		var resultsCarousel = document.getElementById('results-carousel');
		if (resultsCarousel) {
			var observer = new MutationObserver(function(mutationsList) {
				var shouldSync = mutationsList.some(function(mutation) {
					return mutation.type === 'attributes' && mutation.attributeName === 'class';
				});

				if (shouldSync) {
					syncActiveCarouselVideo(resultsCarousel);
				}
			});

			resultsCarousel.querySelectorAll('.item').forEach(function(item) {
				observer.observe(item, {
					attributes: true,
					attributeFilter: ['class']
				});
			});

			syncActiveCarouselVideo(resultsCarousel);
		}
	
    bulmaSlider.attach();

})
