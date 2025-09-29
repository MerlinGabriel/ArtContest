// FHEVM 类型定义

export interface FhevmInstance {
  createEncryptedInput(contractAddress: string, userAddress: string): EncryptedInput;
  decrypt(contractAddress: string, ciphertext: bigint): Promise<bigint>;
  reencrypt(
    ciphertext: bigint,
    privateKey: string,
    publicKey: string,
    signature: string,
    contractAddress: string,
    userAddress: string
  ): Promise<bigint>;
}

export interface EncryptedInput {
  addBool(value: boolean): EncryptedInput;
  add4(value: number): EncryptedInput;
  add8(value: number): EncryptedInput;
  add16(value: number): EncryptedInput;
  add32(value: number): EncryptedInput;
  add64(value: bigint): EncryptedInput;
  add128(value: bigint): EncryptedInput;
  add256(value: bigint): EncryptedInput;
  addAddress(value: string): EncryptedInput;
  encrypt(): {
    handles: bigint[];
    inputProof: string;
  };
}

export interface ContractEntry {
  id: bigint;
  contestant: string;
  title: string;
  descriptionHash: string;
  fileHash: string;
  tags: string[];
  categories: string[];
  timestamp: bigint;
  scoresHandle: bigint;
}

export interface DecryptedEntry extends Omit<ContractEntry, 'scoresHandle'> {
  scores: number;
}

export interface CategoryVotes {
  [category: string]: {
    handle: bigint;
    votes: number;
  };
}
