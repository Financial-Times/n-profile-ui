import Overlay from 'o-overlay';
import expander from 'o-expander';
const overlayContentSelector = '.consent-form-content';

export class Reconsent {
    consentOverlay: any;

	constructor({flag}) {
		if (flag === 'autoload')
			this.overlaySetup();
		else if (flag === 'banner')
			this.bannerSetup();
	}

	bannerSetup() {
		const banner = document.querySelector('.consent-banner__outer');
		banner.classList.add('active');
		document.querySelector('.consent-banner__button').addEventListener('click', () => {
			banner.classList.remove('active');
			this.overlaySetup();
		});
	}

	overlaySetup() {
		this.consentOverlay = new Overlay('overlay-gdpr-consent', {
			src: overlayContentSelector,
			modal: true,
			customclose: '.o-overlay__close'
		});
		this.consentOverlay.open();
		document.addEventListener('oOverlay.ready', () => {
			expander.init();
			const content = document.querySelector(overlayContentSelector);
			content.parentNode.removeChild(content);
			const form = document.querySelector('.reconsent-form');
			this.formSubmitEnable(form);
			this.formSubmitHandler(form);
			this.overlayCloseHandler();
			document.documentElement.classList.add('overlay-scroll-block');
			const contentInner = document.querySelector('.reconsent-form') as HTMLElement;
			contentInner.setAttribute('style', `height: ${contentInner.offsetHeight}px`)
		});
		document.addEventListener('oOverlay.destroy', () => {
			document.documentElement.classList.remove('overlay-scroll-block');
		});
	}

	formSubmitEnable(form) {
		const radios = form.querySelectorAll('.consent-form__radio-button');
		const submitButton = form.querySelector('.consent-form__submit');
		radios.forEach((radio) => {
			radio.addEventListener('change', () => {
				let enableSubmit = true;
				form.querySelectorAll('.consent-form__radio-button').forEach(radio => {
					if (!radio.checkValidity())
						enableSubmit = false;
				});
				if (enableSubmit)
					submitButton.removeAttribute('disabled');
			});
		});
	}

	formSubmitHandler(form) {
		form.addEventListener('submit', (e) => {
			const overlayContentWrapper = document.querySelector('.o-overlay__content') as HTMLElement;
			overlayContentWrapper.setAttribute('style', `height:auto;width:${overlayContentWrapper.offsetWidth}px`);
			document.querySelector('.reconsent-confirmation').classList.remove('hidden');
			form.classList.add('hidden');
			document.querySelector('.o-overlay__close').innerHTML = '';
			e.preventDefault();
			e.stopPropagation();
		});
	}

	overlayCloseHandler() {
		document.querySelector('.consent-form__close').addEventListener('click', () => {
			this.consentOverlay.close();
		});
	}
};





