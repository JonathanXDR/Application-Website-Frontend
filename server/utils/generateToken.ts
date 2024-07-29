import jwt from "jsonwebtoken";

export const generateToken = () => {
  const config = useRuntimeConfig();

  const teamId = config.appleDeveloperTeamId;
  const keyId = config.appleDeveloperKeyId;
  const privateKeyEncoded = config.appleDeveloperPrivateKey;
  const privateKey = Buffer.from(privateKeyEncoded, "base64").toString();

  const token = jwt.sign({}, privateKey, {
    algorithm: "ES256",
    expiresIn: "1d",
    issuer: teamId,
    header: {
      alg: "ES256",
      kid: keyId,
    },
  });
  return token;
};
