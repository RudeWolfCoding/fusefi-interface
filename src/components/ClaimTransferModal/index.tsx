import { ChainId } from '@fuseio/fuse-swap-sdk'
import React, { useEffect, useState } from 'react'
import { getMessageFromTxHash } from '../../graphql/queries'
import { getAmbSubgraph } from '../../graphql/utils'
import Modal from '../Modal'

interface ClaimTransferModalProps {
  isOpen: boolean
  onDismiss: () => void
  txHash: string
}

export default function ClaimTransferModal({ isOpen, onDismiss, txHash }: ClaimTransferModalProps) {
  const [message, setMessage] = useState<any>(null)

  useEffect(() => {
    async function getMessage() {
      const result: any = await getMessageFromTxHash(getAmbSubgraph(ChainId.FUSE), txHash)
      console.log('result', result)
      if (result && result.signatures) {
        setMessage(result)
      }
    }

    let intervalId: any

    if (txHash && !message && !message?.signatures) {
      intervalId = setInterval(getMessage, 5000)
    }

    return () => clearInterval(intervalId)
  }, [message, txHash])

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      Bridge Modal
      {message ? <button>Claim</button> : <span>Waiting for signatures</span>}
    </Modal>
  )
}
