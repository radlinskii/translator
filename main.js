window.onload = function () {
	const textInputEl = document.getElementById('text-input');
	const textTranslateButtonEl = document.getElementById('text-translate-button');
	const binOutputEl = document.getElementById('bin-output');
	const binOutputCopyButtonEl = document.getElementById('bin-output-copy-button');
	const binOutputCopyLabelEl = document.getElementById('bin-output-copy-label');

	const binInputLabelEl = document.getElementById('bin-input-label');
	const binInputEl = document.getElementById('bin-input');
	const binTranslateButtonEl = document.getElementById('bin-translate-button');
	const textOutputEl = document.getElementById('text-output');
	const textOutputCopyButtonEl = document.getElementById('text-output-copy-button');
	const textOutputCopyLabelEl = document.getElementById('text-output-copy-label');

	textTranslateButtonEl.addEventListener('click', handleTextTranslateButtonClick);
	binTranslateButtonEl.addEventListener('click', handleBinTranslateButtonClick);
	binOutputCopyButtonEl.addEventListener('click', handleCopyBinButtonClick);
	textOutputCopyButtonEl.addEventListener('click', handleCopyTextButtonClick);

	function handleTextTranslateButtonClick(event) {
		event.preventDefault();

		const input = textInputEl.value;
		setTextTranslation(input);
	}

	function handleBinTranslateButtonClick(event) {
		event.preventDefault();

		const input = binInputEl.value;

		if (!isValidBin(input)) {
			binInputLabelEl.innerText = 'Binary Input can only contain "0"s and "1"s !'
			binInputLabelEl.style.color = 'red';
		} else if (input.length < 9) {
			binInputLabelEl.innerText = 'Binary Input has to contain at least 9 "0"s or "1"s !'
			binInputLabelEl.style.color = 'red';
		} else {
			setBinTranslation(input);
			binInputLabelEl.innerText = 'Binary Input'
			binInputLabelEl.style.color = 'inherit';
		}
	}

	function handleCopyBinButtonClick() {
		copyToClipboard(binOutputEl, binOutputCopyLabelEl);
	}

	function handleCopyTextButtonClick() {
		copyToClipboard(textOutputEl, textOutputCopyLabelEl)
	}

	function copyToClipboard(outputEl, labelEl) {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(outputEl.innerText).then(function () {
				showCopyLabel(labelEl, 'Copied Successfully!');
			}, function (err) {
				showCopyLabel(labelEl, "Couldn't copy!");
			});
		}
	}

	function showCopyLabel(labelEl, labelText) {
		function hidelabelEl() {
			labelEl.style.visibility = 'hidden';
			labelEl.style.opacity = '0';
		}

		labelEl.innerText = labelText;
		labelEl.style.visibility = 'visible';
		labelEl.style.opacity = '1';
		labelEl.style.color = 'green';
		setTimeout(hidelabelEl, 3000);
	}

	function setTextTranslation(input) {
		if (input.length === 0) {
			binOutputEl.innerHTML = '&mdash;'
			binOutputCopyButtonEl.disabled = true;
		} else {
			binOutputCopyButtonEl.disabled = false;
			binOutputEl.innerText = getTextTranslation(input);
		}
	}

	function setBinTranslation(input) {
		if (input.length === 0) {
			textOutputEl.innerHTML = '&mdash;'
			textOutputCopyButtonEl.disabled = true;
		} else {
			textOutputCopyButtonEl.disabled = false;
			textOutputEl.innerText = getBinTranslation(input);
		}
	}

	function getTextTranslation(input) {
		const charCodeArray = input.split('').map(char => char.charCodeAt(0)).map(parseCharCodeToBin)

		return charCodeArray.join('');
	}

	function getBinTranslation(input) {
		const binArray = input.split('');
		const binCharCodeArray = splitEvery(9, binArray);
		const chars = binCharCodeArray.map(binCharCode => String.fromCharCode(parseInt(binCharCode.join(''), 2)))

		return chars.join('');
	}

	function parseCharCodeToBin(integer) {
		let int = parseInt(integer, 10);

		if (isNaN(int) || int < 0 || int > 511) {
			return 'invalid argument, must be an integer of range [0, 511]';
		}

		const result = new Array(9);
		result.fill(0);

		const binary = parsePositiveDecToBin(int);

		for (let i = 0; i < binary.length; i++) {
			result[ 9 - 1 - i ] = binary[ binary.length - 1 - i ];
		}

		return result.join('');
	}

	function parsePositiveDecToBin(int) {
		if (int === 0) {
			return '0';
		}

		let result = [];

		for (let i = 0; int > 0; i++) {
			result.push(String(int % 2));
			int = parseInt(String(int / 2), 10);
		}

		return result.reverse().join('');
	}

	function splitEvery(chunkSize, array) {
		return new Array(Math.ceil(array.length / chunkSize))
			.fill()
			.map((_, i) => array.slice(i * chunkSize, i * chunkSize + chunkSize))
	}

	function isValidBin(input) {
		const inputStr = String(input);
		for (let i = 0; i < inputStr.length; i++) {
			if (inputStr.charAt(i) !== '0' && inputStr.charAt(i) !== '1') {
				return false;
			}
		}

		return true;
	}
};
