import React from 'react';
import PropTypes from 'prop-types';

const Confirmation = ({ redirect }) => (
	<>
		<h2 className="consent-form__heading-level-3 margin-bottom-x3">
			Thank you
			<br />
			We've updated your preferences
		</h2>
		<div
			className="consent-form__consent-info margin-top-x8"
			data-trackable="customer-message"
		>
			We'll still send you service messages about your account, security
			or legal notifications.
		</div>
		<div className="consent-form__confirm-opt-in">
			You can opt-in to other emails from the FT or change what you
			receive by visiting the{' '}
			<a className="link-external" href="#">
				Preferences centre
			</a>
		</div>
		<div className="consent-form__submit-wrapper">
			<a
				href={redirect}
				className="consent-form__close o-buttons o-buttons--primary o-buttons--big"
			>
				Continue to FT.com
			</a>
		</div>
	</>
);

Confirmation.propTypes = {
	redirect: PropTypes.string
};

export default Confirmation;
