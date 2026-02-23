import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import React from 'react'
import { FaWallet } from 'react-icons/fa'

const ConnectBtn = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="bg-[#7c3aed] hover:scale-105
                    py-2 px-6 text-white rounded-lg flex items-center space-x-2
                      transition-all duration-300 ease-in-out font-mono font-semibold text-sm group"
                    onClick={openConnectModal}
                    type="button"
                  >
                    <FaWallet className="text-lg" />
                    <span>Connect Wallet</span>
                  </button>
                )
              }

              if (chain.unsupported) {
                return (
                  <button
                    className="bg-red-500 hover:bg-red-600
                        py-2 px-6 text-white rounded-lg
                        transition duration-300 ease-in-out
                        font-medium text-sm"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                )
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    className="bg-gray-100 hover:bg-gray-200
                    py-2 px-6 text-gray-700 rounded-lg
                    transition duration-300 ease-in-out
                    font-medium text-sm"
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            width="12"
                            height="12"
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    className="bg-gray-100 hover:bg-gray-200
                    py-2 px-6 text-gray-700 rounded-lg
                    transition duration-300 ease-in-out
                    font-medium text-sm"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {account.displayName}
                    {/* {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''} */}
                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default ConnectBtn
