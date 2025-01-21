import {
  Account,
  AleoKeyProvider,
  AleoKeyProviderParams,
  AleoNetworkClient,
  initThreadPool,
  NetworkRecordProvider,
  PrivateKey,
  ProgramManager,
} from "@provablehq/sdk";

const defaultHost = "https://api.explorer.provable.com/v1";

// Create a key provider that will be used to find public proving & verifying keys for Aleo programs
const keyProvider = new AleoKeyProvider();
keyProvider.useCache(true);

// Define an account which will execute the transaction on-chain
const account = new Account({ privateKey: "private_key" });
const privateKeyObject = PrivateKey.from_string("private_key");

// Create a record provider that will be used to find records and transaction data for Aleo programs
const networkClient = new AleoNetworkClient(defaultHost);
const recordProvider = new NetworkRecordProvider(account, networkClient);

// Initialize a program manager to talk to the Aleo network with the configured key and record providers
const programManager = new ProgramManager(
  defaultHost,
  keyProvider,
  recordProvider
);
programManager.setHost(defaultHost);
programManager.setAccount(account);

const programName = "zksignaleov1.aleo";
const programId = "zksignaleov1";
const aleoFunction = "create_document";

const cacheKey = `${programId}:${aleoFunction}`;
const keySearchParams = new AleoKeyProviderParams({ cacheKey: cacheKey });

// Build and execute the transaction
const transaction = await programManager.execute({
  programName,
  functionName: aleoFunction,
  fee: 0.02,
  privateFee: false,
  inputs: ["5u32", "5u32"],
  keySearchParams,
});

const result = await programManager.networkClient.submitTransaction(
  transaction
);
