# n-profile-ui

## UI handlebars templates for GDPR consent

If you want to integrate a consent form into your Next app, please see [this wiki guide](https://github.com/Financial-Times/next-gdpr/wiki/How-to-integrate-consent-forms).

Your app should render the <form> element and required hidden fields detailed in the guide. 

Then include the [consent.html](https://github.com/Financial-Times/n-profile-ui/blob/master/templates/consent.html) template from n-profile-ui

If you want to render a 'changes saved' message, a [partial is available to [include in your app page](https://github.com/Financial-Times/next-control-centre/blob/master/views/layouts/manage-cookies.html#L6)


## Helper functions
 
### buildConsentRecord

Accepts some user consent data (eg submitted from a form), a form of words ID and a consent source (the dewey code of the application sending the data eg 'next-signup'), and returns a consent record suitable for saving to the single consent store.

### populateConsentModel

This works in the opposite direction to 'buildConsentRecord' - given a user's consent record (from the single consent store), plus form of words, this function will construct a view-model suitable for rendering out the consent template detailed above.

### extractMetaFromString

Given a string like 'lbi-categoryName-channelName' used as the name attribute of a consent form control, this will return an object keyed by the parts of that string.

### getFormOfWords

Accepts a form of words ID (and optionally, a scope eg FTPINK), and returns the form of words for it from the [Form of Words API](https://github.com/Financial-Times/next-fow-api). Note - this helper requires that the FOW_API_HOST environment variable is set.

## Client-side helpers

If your consent form should 'auto-save' each Yes/No consent option as soon as it's changed:
 
[LiveUpdateConsent](https://github.com/Financial-Times/n-profile-ui/blob/master/src/js/client/live-update.ts) - a class to provide 'auto-save' functionality for a consent form. See [Privacy settings](https://www.ft.com/preferences/privacy) for a working example, and the [GDPR wiki](https://github.com/Financial-Times/next-gdpr/wiki/How-to-integrate-consent-forms) for notes on how to implement.

alternatively, if the consent form will save when its submit button is clicked, use:

[UpdateOnSave](https://github.com/Financial-Times/n-profile-ui/blob/master/src/js/client/update-on-save.ts) - helpers to validate and extract consent values to be merged into a form payload.

[ConsentMessage](https://github.com/Financial-Times/n-profile-ui/blob/master/src/js/client/message.ts) - a simple helper class to show / hide a message on a consent form.

## Demo

```sh
make demo
```

- [Update on save](http://localhost:5005/update-on-save)
- [Live update](http://localhost:5005/live-update)

![pageshot of update-on-save 2018-04-03-1220 20](https://user-images.githubusercontent.com/12828487/38304817-98872938-3802-11e8-9831-5ed39bdc9e67.png)
