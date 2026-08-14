# de_renters Project Documentation

<!-- Read the full tutorial here: **[>> How to build a Decentralized Game Platform with Next.js, TypeScript, Tailwind CSS, and Solidity](https://daltonic.github.io)** -->

![House Rental Marketplace](./screenshots/0.png)
The de_renters project is a decentralized application built on the Ethereum blockchain. It is a rental marketplace where users can list, book, and review apartments. The project revolves around `de_renters.sol`, a Solidity-written Ethereum smart contract. It leverages the OpenZeppelin library to ensure secure and standardized development of the contract.

![House Rental Marketplace](./screenshots/1.png)
The core of the contract is defined by three primary structures: `ApartmentStruct`, `BookingStruct`, and `ReviewStruct`, representing an apartment, a booking, and a review, respectively.

## Key Features

- `createAppartment`: Allows a user to create a new apartment listing.
- `updateAppartment`: Allows the apartment owner to update the details of an apartment.
- `deleteAppartment`: Allows the apartment owner to delete an apartment listing.
- `getApartments`: Allows a user to fetch all available apartments.
- `getApartment`: Allows a user to fetch the details of a specific apartment.
- `bookApartment`: Allows a user to book an apartment for specific dates.
- `checkInApartment`: Allows a tenant to check into an apartment and triggers the payment process.
- `claimFunds`: Allows the apartment owner to claim funds after a booking is completed.
- `refundBooking`: Allows a tenant to cancel a booking and get a refund.
- `getUnavailableDates`: Allows a user to fetch all booked dates for a specific apartment.
- `getBookings`: Allows a user to fetch all bookings for a specific apartment.
- `getBooking`: Allows a user to fetch the details of a specific booking.
- `addReview`: Allows a tenant to add a review for an apartment.
- `getReviews`: Allows a user to fetch all reviews for a specific apartment.

## 📚 Key Technologies

- 🌐 Next.js: A React framework for building server-side rendered and static websites.
- 📘 TypeScript: A statically typed superset of JavaScript.
- 📦 Hardhat: A development environment for Ethereum smart contracts.
- 🌐 EthersJs: A library for interacting with Ethereum and Ethereum-like blockchains.
- 📚 Redux-Toolkit: A library for managing application state.
- 🎨 Tailwind CSS: A utility-first CSS framework.

## Useful links

- 🏠 [Website](https://dappmentors.org/)
- ⚽ [Metamask](https://metamask.io/)
- 💡 [Hardhat](https://hardhat.org/)
- 📈 [Alchemy](https://dashboard.alchemy.com/)
- 🔥 [NextJs](https://nextjs.org/)
- 🎅 [TypeScript](https://www.typescriptlang.org/)
- 🐻 [Solidity](https://soliditylang.org/)
- 👀 [EthersJs](https://docs.ethers.io/v5/)

## Setup — Environment variables

Create a file named `.env.local` in the project root and add your private keys and API keys there (example below). The project reads `SEPOLIA_PRIVATE_KEY` from environment variables for deployments and Hardhat configuration.

Example `.env.local`:

```
SEPOLIA_PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_ALCHEMY_ID=YOUR_ALCHEMY_KEY
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
NEXT_PUBLIC_PINATA_API_SECRET=your_pinata_api_secret
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt
```

Important:
- Do NOT commit `.env.local` or any private keys to version control. Add `.env.local` to `.gitignore` if it isn’t already ignored.
- Treat private keys and JWTs as sensitive secrets.

## Deployment History

The `de_renters` contract was deployed to Sepolia with the following address:

- `de_rentersContract`: 0x58B451271412Bea09bBC5e0e62d1F9Fdb3277D4D

Network: Sepolia
Deployed on: 2026-08-14

Keep this record for reference when interacting with the deployed contract in the frontend or scripts.
 
Project: Final Year Project (FYP)
Owner: Aziz Ur Rehman, Sir Syed University of Engineering and Technology (SSUET)
Department: Computer Enginnering 
Roll No.: 2022F-BCE-065
