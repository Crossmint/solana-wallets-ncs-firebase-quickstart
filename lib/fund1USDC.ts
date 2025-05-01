export async function fund1USDC({
  apiKey,
  jwt,
  walletAddress,
}: {
  apiKey: string;
  jwt: string;
  walletAddress: string;
}) {
  try {
    const response = await fetch(
      `https://staging.crossmint.com/api/v1-alpha2/wallets/${walletAddress}/balances`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          amount: 1,
          token: "usdc",
        }),
      }
    );
    if (!response.ok) {
      alert(`Failed to get USDC: ${response.statusText}`);
    }
    alert(
      "1 USDC sent to your wallet! Refresh the page to see your new balance. Balance may take a few seconds to update."
    );
  } catch (error) {
    alert(`Error getting test USDC: ${error}`);
  }
}
