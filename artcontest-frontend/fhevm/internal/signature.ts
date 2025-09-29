// EIP-712 签名相关

export interface EIP712Domain {
  name: string;
  version: string;
  chainId: number;
  verifyingContract: string;
}

export interface ReencryptionRequest {
  publicKey: string;
}

export function createEIP712Domain(chainId: number, contractAddress: string): EIP712Domain {
  return {
    name: "Authorization token",
    version: "1",
    chainId,
    verifyingContract: contractAddress,
  };
}

export function createReencryptionTypes() {
  return {
    Reencrypt: [{ name: "publicKey", type: "bytes32" }],
  };
}

export async function signReencryptionRequest(
  signer: any,
  domain: EIP712Domain,
  publicKey: string
): Promise<string> {
  const types = createReencryptionTypes();
  const value: ReencryptionRequest = { publicKey };

  try {
    const signature = await signer._signTypedData(domain, types, value);
    return signature;
  } catch (error) {
    console.error('签名失败:', error);
    throw error;
  }
}
