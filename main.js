window.onload = function () {
	const decInputEl = document.getElementById('dec-input');
	const decTranslateButtonEl = document.getElementById('dec-translate-button');
	const binOutputEl = document.getElementById('bin-output');
	const binOutputCopyButtonEl = document.getElementById('bin-output-copy-button');

	decTranslateButtonEl.addEventListener('click', handleDecTranslateButtonClick);
	binOutputCopyButtonEl.addEventListener('click', handleCopyBinButtonClick);

	function handleDecTranslateButtonClick(event) {
		event.preventDefault();

		const input = decInputEl.value;
		setDecTranslation(input);
	}

	function setDecTranslation(input) {
		if (input.length === 0) {
			binOutputEl.innerHTML = '&mdash;'
			binOutputCopyButtonEl.disabled = true;
		} else {
			binOutputCopyButtonEl.disabled = false;
			binOutputEl.innerText = getDecTranslation(input);
		}
	}

	function getDecTranslation(input) {
		const charCodeArray = input.split('').map(char => char.charCodeAt(0)).map(parseCharCodeToBin)

		return charCodeArray.join('');
	}

	function parseCharCodeToBin (integer) {
		let int = parseInt(integer, 10);

		if (isNaN(int) || int < 0 || int > 511) {
			return 'invalid argument, must be an integer of range [0, 511]';
		}

		const result = new Array(9);
		result.fill(0);

		const binary = parsePositiveDecToBin(int);

		for(let i = 0; i < binary.length; i++) {
			result[9 - 1 - i] = binary[binary.length - 1 - i];
		}

		return result.join('');
	}

	function parsePositiveDecToBin (int) {
		if (int === 0) {
			return '0';
		}

		let result = [];

		for(let i = 0; int > 0; i++) {
			result.push(String(int % 2));
			int = parseInt(String(int / 2), 10);
		}

		return result.reverse().join('');
	}
};
