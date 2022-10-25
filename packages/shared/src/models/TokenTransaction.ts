import { model, Model, modelAction, ModelCreationData, prop } from 'mobx-keystone'
import { APIWell } from '../api'

@model('carbonPath/TokenTransaction')
export default class TokenTransaction extends Model({
  id: prop<number>(),
  well: prop<APIWell | null>(),
  created: prop<string>(),
  type: prop<string>(),
  transactionHash: prop<string>(),
  amount: prop<string>(),
}) {
  @modelAction
  update(data: ModelCreationData<TokenTransaction>): void {
    Object.assign(this, data)
  }
}
