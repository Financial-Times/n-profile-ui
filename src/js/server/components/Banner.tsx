import * as React from 'react';

const Banner = () => (
	<div className="consent-banner" data-consent-component="consent-banner">
		<div className="consent-banner__outer">
			<div className="consent-banner__inner" data-consent-banner-inner="">
				<div className="consent-banner__content">
					<p>
						<strong>Don’t lose touch with the FT.</strong> Check your Contact
						Preferences.
					</p>
				</div>
				<div className="consent-banner__actions">
					<div className="consent-banner__action">
						<button type="button" className="consent-banner__button">
							Check your preferences
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default Banner;
