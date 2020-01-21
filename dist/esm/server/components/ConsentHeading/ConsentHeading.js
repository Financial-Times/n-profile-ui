import * as React from 'react';
const ConsentHeading = ({ children, isSubsection }) => !isSubsection ? (React.createElement('h1', { className: 'consent-form__heading-level-1' }, children)) : (React.createElement('h2', { className: 'consent-form__heading-level-1' }, children));
export default ConsentHeading;
