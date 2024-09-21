import jwt from "jsonwebtoken";

export const generateToken = () => {
  const config = useRuntimeConfig();

  const teamId = config.appleDeveloperTeamId;
  const keyId = config.appleDeveloperKeyId;
  const privateKeyEncoded = config.appleDeveloperPrivateKey;
  const musicUserToken = config.appleMusicUserToken;
  const privateKey = Buffer.from(privateKeyEncoded, "base64").toString();
  // const musicUserToken = Buffer.from(
  //   musicUserTokenEncoded,
  //   "base64",
  // ).toString();

  const authToken = jwt.sign({}, privateKey, {
    algorithm: "ES256",
    expiresIn: "1d",
    issuer: teamId,
    header: {
      alg: "ES256",
      kid: keyId,
    },
  });
  return { authToken, musicUserToken };
};
