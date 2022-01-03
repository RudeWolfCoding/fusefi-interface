import { SingleRewardProgram, MultiRewardProgram, ChefRewardProgram } from '@fuseio/earn-sdk'

export const getProgram = (contract?: string, library?: any, type?: string) => {
  if (!contract || !library || !type) return undefined

  if (type === 'single') {
    return new SingleRewardProgram(contract, library)
  } else if (type === 'multi') {
    return new MultiRewardProgram(contract, library)
  } else if (type === 'chef') {
    return new ChefRewardProgram(contract, library)
  } else {
    return undefined
  }
}
