'use strict';
let __importStar = (this && this.__importStar) || function (mod) {
	if (mod && mod.__esModule) return mod;
	let result = {};
	if (mod != null) for (let k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
	result['default'] = mod;
	return result;
};
Object.defineProperty(exports, '__esModule', { value: true });
const React = __importStar(require('react'));
const FOWHiddenInputs = ({ formOfWords }) => (React.createElement(React.Fragment, null,
	React.createElement('input', { type: 'hidden', name: 'formOfWordsId', value: formOfWords.id }),
	React.createElement('input', { type: 'hidden', name: 'formOfWordsScope', value: formOfWords.scope }),
	React.createElement('input', { type: 'hidden', name: 'consentSource', value: formOfWords.source })));
exports.default = FOWHiddenInputs;
