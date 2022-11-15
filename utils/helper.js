import { KeyPair } from "near-api-js";

export const generateKeyPair = async () => {
    const keyPair = KeyPair.fromRandom("ed25519");
    console.log(keyPair);
    return keyPair;
};

export function concat(args, accountId) {
    return args[0] + accountId + args[1];
}

export function timestampToDateTime(timestamp) {
    return new Date(Number(timestamp / 1000000)).toString();
}
