import { readFileSync } from 'fs';
import Handlebars from 'handlebars';

const registerPartial = partialName => {
	Handlebars.registerPartial(
		`n-profile-ui/templates/${partialName}`,
		readFileSync(`${process.cwd()}/templates/${partialName}.html`, 'utf8')
	);
};

['yes-no-switch'].forEach(partialName => registerPartial(partialName));

const consent = readFileSync(`${process.cwd()}/templates/consent.html`, 'utf8');
const template = Handlebars.compile(consent);

export default function (data) {
	return `
		<div>
			<form action="/__consent/consent-record/FTPINK/user-id" class="js-consent-preference" method="POST">
				${template(data)}
			</form>
		</div>
	`;
};
