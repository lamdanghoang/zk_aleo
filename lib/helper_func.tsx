import { AleoNetworkClient } from "@provablehq/sdk";

const networkClient = new AleoNetworkClient(
  "https://api.explorer.provable.com/v1"
);

export const getBalance = async (publicKey: string | null) => {
  if (publicKey) {
    const public_balance = await networkClient.getProgramMappingValue(
      "credits.aleo",
      "account",
      publicKey
    );
    if (public_balance) {
      const formatted_balance = public_balance.split("u")[0];
      return formatted_balance;
    }
  }
  return "0";
};
