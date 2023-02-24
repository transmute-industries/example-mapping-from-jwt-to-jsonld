const mapper = require("../src");

// https://www.rfc-editor.org/rfc/rfc7519#section-3.1
const obj = require("../examples/0-basic.json");

it("can convert a JWT claim set to application/credential+ld+json", () => {
  expect(obj).toEqual({
    iss: "joe",
    nbf: 1300819380,
    "http://example.com/is_root": true,
  });
  const credential = mapper.convertObjectToVCDM(obj);
  expect(credential).toEqual({
    '@context': 'https://www.w3.org/ns/credentials/v2',
    type: [ 'VerifiableCredential' ],
    'http://example.com/is_root': true,
    credentialSubject: {},
    issuer: 'urn:joe',
    validFrom: '1970-01-16T01:20:19.380Z'
  });
});
