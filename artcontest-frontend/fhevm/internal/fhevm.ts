// FHEVM 实例管理

import { FhevmInstance } from '../fhevmTypes';
import { RelayerSDKLoader, isFhevmWindowType } from './RelayerSDKLoader';

let fhevmInstance: FhevmInstance | null = null;

export async function initFhevm(chainId: number): Promise<FhevmInstance> {
  if (fhevmInstance) {
    return fhevmInstance;
  }

  try {
    if (chainId === 31337) {
      // 本地开发环境优先尝试使用 MockFhevmInstance；若不可用则回退到 CDN 路径
      const mockUtils: any = await import('@fhevm/mock-utils');
      if (typeof mockUtils.createMockFhevmInstance === 'function') {
        fhevmInstance = await mockUtils.createMockFhevmInstance();
        console.log('✅ FHEVM Mock 实例初始化成功');
      } else {
        console.warn('⚠️ 未找到 createMockFhevmInstance，回退到 Relayer SDK 初始化');
        if (!isFhevmWindowType(window)) {
          const loader = new RelayerSDKLoader({});
          await loader.load();
        }
        // @ts-ignore
        const relayerSDK = window.relayerSDK;
        // @ts-ignore
        const ok = await relayerSDK.initSDK();
        if (!ok) throw new Error('FHEVM SDK init failed');
        // 使用浏览器 provider 作为网络源
        // @ts-ignore
        fhevmInstance = await relayerSDK.createInstance({ ...relayerSDK.SepoliaConfig, network: (window as any).ethereum });
        console.log('✅ FHEVM Relayer SDK(CDN) 实例初始化成功(回退)');
      }
    } else {
      // 生产环境通过 CDN 加载 Relayer SDK
      if (!isFhevmWindowType(window)) {
        const loader = new RelayerSDKLoader({});
        await loader.load();
      }
      // @ts-ignore
      const relayerSDK = window.relayerSDK;
      // @ts-ignore
      const ok = await relayerSDK.initSDK();
      if (!ok) throw new Error('FHEVM SDK init failed');
      // 使用浏览器 provider 作为网络源
      // @ts-ignore
      fhevmInstance = await relayerSDK.createInstance({ ...relayerSDK.SepoliaConfig, network: (window as any).ethereum });
      console.log('✅ FHEVM Relayer SDK(CDN) 实例初始化成功');
    }
    
    if (!fhevmInstance) {
      throw new Error('FHEVM 实例未创建');
    }
    return fhevmInstance;
  } catch (error) {
    console.error('❌ FHEVM 初始化失败:', error);
    throw new Error('FHEVM 初始化失败，请检查网络连接');
  }
}

export function getFhevmInstance(): FhevmInstance {
  if (!fhevmInstance) {
    throw new Error('FHEVM 实例未初始化，请先调用 initFhevm()');
  }
  return fhevmInstance;
}

export function resetFhevmInstance(): void {
  fhevmInstance = null;
}
