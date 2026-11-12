(function () {
	var load_content = new WeakMap();
	var loading = new WeakSet();

	function getBody(header) {
		var body = header.nextElementSibling;
		return body && body.tagName === 'DIV' ? body : null;
	}

	function setOpen(spoiler, body, open) {
		spoiler.classList.toggle('open', open);
		spoiler.classList.toggle('closed', !open);
		body.style.display = open ? '' : 'none';
	}

	function loadContent(spoiler, body) {
		var url = spoiler.getAttribute('data-load');
		if (url === null || load_content.has(spoiler) || loading.has(spoiler)) {
			return;
		}

		loading.add(spoiler);
		Promise.resolve()
			.then(function () {
				return fetch(url);
			})
			.then(function (response) {
				if (!response.ok) {
					throw new Error('HTTP ' + response.status);
				}
				return response.text();
			})
			.then(function (content) {
				load_content.set(spoiler, content);
				body.innerHTML = content;
			})
			.catch(function (error) {
				var message = document.createElement('span');
				message.className = 'err_load';
				message.textContent = 'Не удалось загрузить содержимое.';
				body.innerHTML = '';
				body.appendChild(message);
				console.error('VLZ spoiler: не удалось загрузить содержимое "' + url + '".', error);
			})
			.finally(function () {
				loading.delete(spoiler);
			});
	}

	function initialize() {
		document.querySelectorAll('.vlz_spoiler').forEach(function (spoiler) {
			var header = Array.from(spoiler.children).find(function (child) {
				return child.tagName === 'H5';
			});
			var body = header && getBody(header);

			if (!spoiler.classList.contains('open')) {
				spoiler.classList.add('closed');
				if (body) {
					body.style.display = 'none';
				}
			}

			if (!header || !body) {
				return;
			}

			header.addEventListener('click', function () {
				var open = !spoiler.classList.contains('open');
				setOpen(spoiler, body, open);
				if (open) {
					loadContent(spoiler, body);
				}
			});
		});

		document.querySelectorAll('.vlz_spoiler .btm_fold').forEach(function (fold) {
			fold.addEventListener('click', function () {
				var body = fold.parentElement;
				var spoiler = body && body.parentElement;
				if (!spoiler || !spoiler.classList.contains('vlz_spoiler')) {
					return;
				}

				setOpen(spoiler, body, !spoiler.classList.contains('open'));
			});
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initialize, { once: true });
	} else {
		initialize();
	}
})();
