import * as React from 'react';
const FOWHiddenInputs = ({ formOfWords }) => (React.createElement(React.Fragment, null,
	React.createElement('input', { type: 'hidden', name: 'formOfWordsId', value: formOfWords.id }),
	React.createElement('input', { type: 'hidden', name: 'formOfWordsScope', value: formOfWords.scope }),
	React.createElement('input', { type: 'hidden', name: 'consentSource', value: formOfWords.source })));
export default FOWHiddenInputs;
