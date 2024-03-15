import { FowAPI } from '../../types/fow-api';

import * as React from 'react';

import Consent from './Consent';
import Confirmation from './Confirmation';
import Banner from './Banner';

interface Props {
	formOfWords: FowAPI.Fow;
}

const Overlay = ({ formOfWords }: Props) => (
	<>
		<script type="text/template" id="overlay-gdpr-consent"></script>
		<div className="consent-form-content">
			<button type="button" className="o-overlay__close">
				Ask later
			</button>
			<div className="consent-form-content__inner">
				<form className="consent-form consent-form--scrollable">
					<Consent
						showHeading={true}
						showSubmitButton={false}
						isSubsection={false}
						formOfWords={formOfWords}
						showToggleSwitch={false}
					/>
				</form>
				<div className="consent-confirmation hidden">
					<Confirmation redirect="https://wwww.ft.com" />
				</div>
			</div>
		</div>
		<Banner />
	</>
);

export default Overlay;
