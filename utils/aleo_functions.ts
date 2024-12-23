import { AleoNetworkClient } from "@aleohq/sdk";

const networkClient = new AleoNetworkClient("https://api.explorer.aleo.org/v1");

export async function getBalance(address: string) {
  try {
    const response = await networkClient.getProgramMappingValue(
      "credits.aleo",
      "account",
      address
    );

    if (response && typeof response === "string") {
      const balanceMatch = response.match(/\d+/);
      return balanceMatch ? balanceMatch[0] : "0";
    }
    return "0";
  } catch (error) {
    console.error("Error:", error);
    return "0";
  }
}
