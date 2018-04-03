// import Overlay from 'o-overlay';
// import expander from 'o-expander';
import { UpdateConsentOnSave } from './update-on-save';
import { ConsentOptions } from './consent';

const overlayContentSelector = '.consent-form-content';

interface ReconsentOptions extends ConsentOptions {
	flag: string;
}

export class Reconsent extends UpdateConsentOnSave {
	public consentOverlay: any;

	constructor(opts: ReconsentOptions) {
		opts.checkValidityBeforeSubmit = opts.checkValidityBeforeSubmit || true;
		super(opts);
		if (opts.flag === 'autoload') {
			this.overlaySetup();
		} else if (opts.flag === 'banner') {
			this.bannerSetup();
		}
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

	// TODO: fix bower resolution in demos and uncomment this
	// reconsent component not in use pre 25th May 2017
	overlaySetup() {
		// this.consentOverlay = new Overlay('overlay-gdpr-consent', {
		// 	src: overlayContentSelector,
		// 	modal: true,
		// 	customclose: '.o-overlay__close'
		// });
		// this.consentOverlay.open();
		// document.addEventListener('oOverlay.ready', () => {
		// 	expander.init();
		// 	const content = document.querySelector(overlayContentSelector) as HTMLElement;
		// 	content.remove();

		// 	const form = document.querySelector('.reconsent-form') as HTMLElement;
		// 	this.onChange();
		// 	this.onSubmit(() => {
		// 		const overlayContentWrapper = document.querySelector('.o-overlay__content') as HTMLElement;
		// 		const confirmation = document.querySelector('.reconsent-confirmation') as HTMLElement;
		// 		const closeOverlay = document.querySelector('.o-overlay__close') as HTMLElement;

		// 		overlayContentWrapper.setAttribute('style', `height:auto;width:${overlayContentWrapper.offsetWidth}px`);
		// 		confirmation.classList.remove('hidden');
		// 		form.classList.add('hidden');
		// 		closeOverlay.innerHTML = '';
		// 	});
		// 	this.overlayCloseHandler();
		// 	document.documentElement.classList.add('overlay-scroll-block');

		// 	const contentInner = document.querySelector('.reconsent-form') as HTMLElement;
		// 	contentInner.setAttribute('style', `height: ${contentInner.offsetHeight}px`)
		// });
		// document.addEventListener('oOverlay.destroy', () => {
		// 	document.documentElement.classList.remove('overlay-scroll-block');
		// });
	}

	overlayCloseHandler() {
		const closeConsentForm = document.querySelector('.consent-form__close') as HTMLAnchorElement;

		closeConsentForm.addEventListener('click', () => {
			this.consentOverlay.close();
		});
	}
};
