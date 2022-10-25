import { model, Model, modelAction, ModelCreationData, prop } from 'mobx-keystone'
import { APIWellImage } from '../api'

@model('carbonPath/Well')
export default class Well extends Model({
  id: prop<number>(),
  name: prop<string>(),
  tonnesOfCO2: prop<number>(),
  costPerTonne: prop<number>(),
  status: prop<string>(),
  type: prop<string[]>(),
  source: prop<string[]>(),
  isApproved: prop<boolean>(false),
  adminContractAddress: prop<string>(),
  nftContractAddress: prop<string>(),
  tokenContractAddress: prop<string>(),
  mintTransactionHash: prop<string>(),
  numberOfAdvancedEavs: prop<number>(),
  numberOfBufferPoolEavs: prop<number>(),
  tokenId: prop<string>(),
  blockchain: prop<string>(),
  metadata: prop<string>(),
  ipfsMetadataUrl: prop<string>(),
  mintStatus: prop<string>(),
  retiredAmount: prop<number>(),
  field: prop<string>(),
  county: prop<string>(),
  state: prop<string>(),
  country: prop<string>(),
  location: prop<string>(),
  md: prop<number>(),
  tvd: prop<number>(),
  producingFormation: prop<string>(),
  legalDescription: prop<string>(),
  leaseId: prop<number>(),
  wellType: prop<string>(),
  township: prop<string>(),
  range: prop<string>(),
  shlSection: prop<number>(),
  bhlSection: prop<number>(),
  shlLatitude: prop<number>(),
  shlLongitude: prop<number>(),
  firstPerforationDepth: prop<number>(),
  lastPerforationDepth: prop<number>(),
  wellImageList: prop<APIWellImage[]>(),
  isSavedWell: prop<boolean>(false),
}) {
  @modelAction
  update(data: ModelCreationData<Well>): void {
    Object.assign(this, data)
  }
  get tokensMinted(): number {
    return this.numberOfAdvancedEavs + this.numberOfBufferPoolEavs
  }
}
