import * as React from 'react';
import { FowAPI } from '../../../types/fow-api';

interface Props {
	formOfWords: FowAPI.Fow;
}

const FOWHiddenInputs = ({ formOfWords }: Props) => (
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

export default FOWHiddenInputs;
