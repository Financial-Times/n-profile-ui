import * as React from 'react';

interface Props {
	highlight?: string;
	detail?: string;
	additional?: string;
	actions?: {
		primary: {
			url: string;
			text: string;
		};
		secondary: {
			url: string;
			text: string;
		};
	};
	hideDetail?: boolean;
	hideActions?: boolean;
}

const ErrorMessageCore = ({
	highlight,
	hideDetail,
	detail,
	additional,
	actions,
	hideActions,
}: Props) => (
	<div
		className="o-message o-message--alert o-message--inner o-message--error"
		data-o-component="o-message"
	>
		<div className="o-message__container">
			<div className="o-message__content">
				<p className="o-message__content-main">
					<span className="o-message__content-highlight consent-message__content-block">
						{highlight || "Your Contact Preferences couldn't be saved."}
					</span>
					{!hideDetail && (
						<span className="o-message__content-detail">
							{detail || 'These can be set anytime in myFT.'}
						</span>
					)}
				</p>
				{additional && (
					<p className="o-message__content--additional">{additional}</p>
				)}
				{actions ? (
					<div className="o-message__actions">
						{actions.primary && (
							<a
								href={actions.primary.url}
								className="o-message__actions__primary"
							>
								{actions.primary.text}
							</a>
						)}
						{actions.secondary && (
							<a
								href={actions.secondary.url}
								className="o-message__actions__secondary"
							>
								{actions.secondary.text}
							</a>
						)}
					</div>
				) : (
					hideActions && (
						<div className="o-message__actions">
							<a href="/myft/alerts/" className="o-message__actions__primary">
								Visit Contact Preferences
							</a>
							<a
								href="https://help.ft.com/"
								className="o-message__actions__secondary"
							>
								Help centre
							</a>
						</div>
					)
				)}
			</div>
		</div>
	</div>
);

export default ErrorMessageCore;
