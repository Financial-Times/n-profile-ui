import React from 'react';

const ChangesSavedMessage = () => (
	<div className="consent-message-demo">
		<div
			className="o-message o-message--alert o-message--inner o-message--success"
			data-o-component="o-message"
		>
			<div className="o-message__container">
				<div className="o-message__content">
					<p className="o-message__content-main">
						<span className="o-message__content-highlight">
							Your changes have been saved.
						</span>
					</p>
				</div>
			</div>
		</div>
	</div>
);

ChangesSavedMessage.propTypes = {};

export default ChangesSavedMessage;
