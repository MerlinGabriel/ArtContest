// 解密相关工具函数

import { getFhevmInstance } from './fhevm';

export async function decryptValue(
  contractAddress: string,
  ciphertext: bigint
): Promise<number> {
  try {
    const fhevm = getFhevmInstance();
    const decryptedValue = await fhevm.decrypt(contractAddress, ciphertext);
    return Number(decryptedValue);
  } catch (error) {
    console.error('解密失败:', error);
    return 0;
  }
}

export async function batchDecrypt(
  contractAddress: string,
  ciphertexts: bigint[]
): Promise<number[]> {
  const results: number[] = [];
  
  for (const ciphertext of ciphertexts) {
    if (ciphertext === 0n) {
      results.push(0);
    } else {
      const decrypted = await decryptValue(contractAddress, ciphertext);
      results.push(decrypted);
    }
  }
  
  return results;
}
