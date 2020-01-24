import React from "react";
import ReactDOMServer from 'react-dom/server'
import { Consent } from "../../../src/js/server/main"

export const loadHTML = data => ReactDOMServer.renderToString(
	<div>
		<form action="/__consent/consent-record/FTPINK/user-id" className="js-consent-preference" method="POST">
			<Consent {...data} />
		</form>
	</div>
);


