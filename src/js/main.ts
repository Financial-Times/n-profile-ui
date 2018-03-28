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
		const banner = document.querySelector('.consent-banner__outer') as HTMLDivElement;
		const bannerButton = document.querySelector('.consent-banner__button') as HTMLButtonElement;

		banner.classList.add('active');
		bannerButton.addEventListener('click', () => {
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
			const content = document.querySelector(overlayContentSelector) as HTMLElement;
			content.remove();

			const form = document.querySelector('.reconsent-form') as HTMLElement;
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
			const confirmation = document.querySelector('.reconsent-confirmation') as HTMLElement;
			const closeOverlay = document.querySelector('.o-overlay__close') as HTMLElement;

			overlayContentWrapper.setAttribute('style', `height:auto;width:${overlayContentWrapper.offsetWidth}px`);
			confirmation.classList.remove('hidden');
			form.classList.add('hidden');
			closeOverlay.innerHTML = '';
			e.preventDefault();
			e.stopPropagation();
		});
	}

	overlayCloseHandler() {
		const closeConsentForm = document.querySelector('.consent-form__close') as HTMLAnchorElement;

		closeConsentForm.addEventListener('click', () => {
			this.consentOverlay.close();
		});
	}
};





