const moment = require('moment');

const forceURL = (property)=>{
  try{
    return new URL(property).toString();
  }catch(e){
    return new URL('urn:' + property).toString();
  }
}

const extractMetadata = (obj) => {
  const {iss, sub, iat, nbf, exp, jti, aud, ...meta} = obj;
  return meta
}

const extractRegisteredClaims = (obj) => {
  const {iss, sub, iat, nbf, exp, jti, aud, ..._meta} = obj;
  // iat, aud are not necessary to preserve
  // mappins is unidirectional and allowed to be "lossy".
  return {iss, sub, iat, nbf, exp, jti, aud }
}


const convertObjectToVCDM = (obj) =>{
  const metadata = extractMetadata(obj);
  const registeredClaims = extractRegisteredClaims(obj);
  const credential = {
    '@context': 'https://www.w3.org/ns/credentials/v2',
    type: ['VerifiableCredential'],
    ...metadata,
    credentialSubject: {}
  };
  credential.issuer = forceURL(obj.iss);
  if (registeredClaims.jti){
    credential.id = forceURL(registeredClaims.jti)
  }
  if (registeredClaims.nbf){
    credential.validFrom = moment(registeredClaims.nbf).toISOString()
  }
  if (registeredClaims.exp){
    credential.validTo = moment(registeredClaims.exp).toISOString()
  }
  if (obj.sub){
    credential.credentialSubject.id = forceURL(obj.sub);
  }
  return credential;
}

module.exports = convertObjectToVCDM;