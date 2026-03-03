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
