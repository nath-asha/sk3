const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

exports.generateOTP = () => {
  return speakeasy.totp({
    secret: speakeasy.generateSecret().base32,
    digits: 6,
    encoding: 'base32'
  });
};

exports.verifyOTP = (secret, otp) => {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: otp,
    window: 2
  });
};

exports.generateOTPQRCode = async (secret, email) => {
  const otpAuthUrl = speakeasy.otpauthURL({
    secret: secret,
    label: 'MyApp',
    issuer: 'MyApp',
    encoding: 'base32',
    account: email
  });
  return await QRCode.toDataURL(otpAuthUrl);
};
