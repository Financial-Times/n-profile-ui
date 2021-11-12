export default function (
	{ errorsToReturn, responseCode = 200, redirectLocation } = {} as any
) {
	window.fetch = jest.fn((_url, options) => {
		// @ts-ignore
		const response: any = { values: JSON.parse(options.body) };
		if (errorsToReturn) response.errors = errorsToReturn;
		if (redirectLocation) response.location = redirectLocation;

		return new Promise((resolve) => {
			// @ts-ignore
			return resolve({
				ok: !errorsToReturn,
				status: errorsToReturn ? 400 : responseCode,
				json: () => Promise.resolve(response),
			});
		});
	});
}
