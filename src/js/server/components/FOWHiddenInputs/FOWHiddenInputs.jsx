import React from 'react';
import PropTypes from 'prop-types';

const FOWHiddenInputs = ({ formOfWords }) => (
	<>
		<input type="hidden" name="formOfWordsId" value={formOfWords.id} />
		<input
			type="hidden"
			name="formOfWordsScope"
			value={formOfWords.scope}
		/>
		<input type="hidden" name="consentSource" value={formOfWords.source} />
	</>
);

FOWHiddenInputs.propTypes = {
	formOfWords: PropTypes.shape({
		id: PropTypes.string,
		scope: PropTypes.string,
		source: PropTypes.string
	})
};

export default FOWHiddenInputs;
