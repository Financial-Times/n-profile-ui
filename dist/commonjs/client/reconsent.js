'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Reconsent = void 0;
const update_on_save_1 = require('./update-on-save');
class Reconsent extends update_on_save_1.UpdateConsentOnSave {
	constructor (opts) {
		super(opts);
		if (opts.flag === 'autoload') {
			this.overlaySetup();
		}
		else if (opts.flag === 'banner') {
			this.bannerSetup();
		}
	}
	bannerSetup () {
		const banner = document.querySelector('.consent-banner__outer');
		const bannerButton = document.querySelector('.consent-banner__button');
		banner.classList.add('active');
		bannerButton.addEventListener('click', () => {
			banner.classList.remove('active');
			this.overlaySetup();
		});
	}
	overlaySetup () {
	}
	overlayCloseHandler () {
		const closeConsentForm = document.querySelector('.consent-form__close');
		closeConsentForm.addEventListener('click', () => {
			this.consentOverlay.close();
		});
	}
}
exports.Reconsent = Reconsent;
;
