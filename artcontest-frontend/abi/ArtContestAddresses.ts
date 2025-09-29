export const ArtContestAddresses = {
  "localhost": "",
  "sepolia": "0xD44e08617950139A3C397672F96F9B3A8689De56"
} as const;

export function getArtContestAddress(chainId: number): string {
  switch (chainId) {
    case 31337:
      return ArtContestAddresses.localhost || '';
    case 11155111:
      return ArtContestAddresses.sepolia || '';
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`);
  }
}