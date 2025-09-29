// FHEVM 解密签名工具

import { createEIP712Domain, signReencryptionRequest } from './internal/signature';

export class FhevmDecryptionSignature {
  private chainId: number;
  private contractAddress: string;
  private signer: any;

  constructor(chainId: number, contractAddress: string, signer: any) {
    this.chainId = chainId;
    this.contractAddress = contractAddress;
    this.signer = signer;
  }

  async signForDecryption(publicKey: string): Promise<string> {
    const domain = createEIP712Domain(this.chainId, this.contractAddress);
    return await signReencryptionRequest(this.signer, domain, publicKey);
  }

  async reencrypt(
    ciphertext: bigint,
    publicKey: string
  ): Promise<bigint> {
    try {
      const signature = await this.signForDecryption(publicKey);
      const fhevm = await import('./internal/fhevm').then(m => m.getFhevmInstance());
      
      const privateKey = "0x" + "0".repeat(64); // 临时私钥，实际使用中应该是用户的私钥
      const userAddress = await this.signer.getAddress();
      
      const result = await fhevm.reencrypt(
        ciphertext,
        privateKey,
        publicKey,
        signature,
        this.contractAddress,
        userAddress
      );
      
      return result;
    } catch (error) {
      console.error('重加密失败:', error);
      throw error;
    }
  }
}
