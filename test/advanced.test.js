const mapper = require("../src");

const obj = require("../examples/1-advanced.json");

it("can convert a JWT claim set to application/credential+ld+json", () => {
  expect(obj).toEqual({
    "jti": "urn:uuid:123", 
    "iss": "did:example:123", 
    "sub": "did:example:456",
    "nbf": 1300819380, 
    "exp": 1300819380, 
    "https://schema.org/name": "XML Signature Syntax and Processing Version 1.1",
    "https://schema.org/documentation": "https://www.w3.org/TR/xmldsig-core1",
    "displayName": "🔥"
  }
  );
  const credential = mapper.convertObjectToVCDM(obj);
    expect(credential).toEqual({
      '@context': 'https://www.w3.org/ns/credentials/v2',
      id: "urn:uuid:123",
      type: [ 'VerifiableCredential' ],
      'https://schema.org/name': 'XML Signature Syntax and Processing Version 1.1',
      'https://schema.org/documentation': 'https://www.w3.org/TR/xmldsig-core1',
      displayName: '🔥',
      credentialSubject: { id: 'did:example:456' },
      issuer: 'did:example:123',
      validFrom: '1970-01-16T01:20:19.380Z',
      validTo: '1970-01-16T01:20:19.380Z'
    }
  );
});
