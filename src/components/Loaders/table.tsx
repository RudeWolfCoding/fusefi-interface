import React from 'react'
import ContentLoader from 'react-content-loader'

const FadingLoader = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
      <FadingLoaderCard />
    </div>
  )
}

const FadingLoaderCard = () => {
  return (
    <ContentLoader width={'100%'} height={80} backgroundColor="#ababab" foregroundColor="#fafafa">
      <rect x="800" y="15" rx="5" ry="5" width="160" height="15" />
      <rect x="800" y="39" rx="5" ry="5" width="160" height="15" />
      <rect x="580" y="15" rx="5" ry="5" width="160" height="15" />
      <rect x="580" y="39" rx="5" ry="5" width="160" height="15" />
      <rect x="420" y="20" rx="5" ry="5" width="80" height="25" />
      <rect x="120" y="25" rx="5" ry="5" width="260" height="15" />
      <rect x="40" y="10" rx="100" ry="100" width="40" height="40" />
      <rect x="20" y="10" rx="100" ry="100" width="40" height="40" />
    </ContentLoader>
  )
}

export default FadingLoader
