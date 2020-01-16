import React from 'react';
import PropTypes from 'prop-types';
import { Consent, Confirmation, Banner } from '../';

const Overlay = () => (
	<>
		<script type="text/template" id="overlay-gdpr-consent"></script>
		<div className="consent-form-content">
			<button type="button" className="o-overlay__close">
				Ask later
			</button>
			<div className="consent-form-content__inner">
				<form className="consent-form consent-form--scrollable">
					<Consent />
				</form>
				<div className="consent-confirmation hidden">
					<Confirmation />
				</div>
			</div>
		</div>
		<Banner />
	</>
);

FOWHiddenInputs.propTypes = {
	redirect: PropTypes.string
};

export default Overlay;
