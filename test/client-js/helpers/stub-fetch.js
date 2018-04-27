module.exports = ({ errorsToReturn, responseCode = 200, redirectLocation } = {}) => {
	window.fetch = jest.fn((url, options) => {
		const response = { values: JSON.parse(options.body) };
		if (errorsToReturn)
			response.errors = errorsToReturn;
		if (redirectLocation)
			response.location = redirectLocation;
		return new Promise(resolve => {
			return resolve({
				ok: !errorsToReturn,
				status: errorsToReturn ? 400 : responseCode,
				json: () => Promise.resolve(response)
			});
		});
	});
};
