import React from 'react'
import { ReactComponent as BannerIcon } from '../../assets/svg/fusefi-banner.svg'
import { ExternalLink } from '../../theme'

export default function FusefiBanner({ margin }: { margin?: string }) {
  return (
    <ExternalLink href="https://app.fuse.fi" style={{ margin }}>
      <BannerIcon />
    </ExternalLink>
  )
}
