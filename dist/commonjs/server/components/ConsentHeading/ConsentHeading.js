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
const ConsentHeading = ({ children, isSubsection }) => !isSubsection ? (React.createElement('h1', { className: 'consent-form__heading-level-1' }, children)) : (React.createElement('h2', { className: 'consent-form__heading-level-1' }, children));
exports.default = ConsentHeading;
