<div align="center">
<img width="200" alt="Image" src="https://github.com/user-attachments/assets/8b617791-cd37-4a5a-8695-a7c9018b7c70" />
<br>
<br>
<h1>Solana Wallets Quickstart (non-custodial-signers + Firebase)</h1>

<div align="center">
<a href="https://solana-wallets-ncs-firebase.demos-crossmint.com/">Live Demo</a> | <a href="https://docs.crossmint.com/introduction/platform/wallets">Docs</a> | <a href="https://github.com/crossmint">See all quickstarts</a>
</div>

<br>
<br>
TODO: add image here
</div>

## Introduction

Create and manage Crossmint wallets on Solana using non-custodial-signers + Firebase to handle user authentication.

**Learn how to:**

- Create a wallet
- View its balance for SOL and SPL tokens
- Send a transaction
- Add delegated signers to allow third parties to sign transactions on behalf of your wallet

## Deploy

Easily deploy the template to Vercel with the button below. You will need to set the required environment variables in the Vercel dashboard.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FCrossmint%2Fsolana-wallets-ncs-firebase-quickstart&env=NEXT_PUBLIC_CROSSMINT_API_KEY&env=NEXT_PUBLIC_FIREBASE_API_KEY)

## Setup

1. Clone the repository and navigate to the project folder:

```bash
git clone https://github.com/crossmint/solana-wallets-ncs-firebase-quickstart.git && cd solana-wallets-ncs-firebase-quickstart
```

2. Install all dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up the environment variables:

```bash
cp .env.template .env
```

4. Get a Crossmint API key from [here](https://docs.crossmint.com/introduction/platform/api-keys/client-side) and add it to the `.env` file.

```bash
NEXT_PUBLIC_CROSSMINT_API_KEY=your_api_key
```

5. Get a Firebase API key from [here](https://console.firebase.google.com/u/0/project/solana-wallets-ncs-firebase/settings/general/android:com.crossmint.solanawalletsncsfirebase) and add it to the `.env` file.

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
```

5. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Using in production

1. Create a [production API key](https://docs.crossmint.com/introduction/platform/api-keys/client-side).
2. Create a [production Firebase project](https://console.firebase.google.com/) and add it to the `.env` file.
