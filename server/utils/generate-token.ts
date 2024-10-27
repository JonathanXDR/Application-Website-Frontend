import jwt from "jsonwebtoken";

export const generateToken = () => {
  const config = useRuntimeConfig();

  const teamId = config.appleDeveloperTeamId as string;
  const keyId = config.appleDeveloperKeyId as string;
  const privateKeyEncoded = config.appleDeveloperPrivateKey as string;
  const musicUserToken = config.appleMusicUserToken as string;

  if (typeof privateKeyEncoded !== "string") {
    throw new TypeError("Private key is not a string");
  }

  const privateKey = Buffer.from(privateKeyEncoded, "base64").toString();

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
