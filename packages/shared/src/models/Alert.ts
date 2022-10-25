import { model, Model, modelAction, ModelCreationData, prop } from 'mobx-keystone'

@model('carbonPath/Alert')
export default class Alert extends Model({
  id: prop<number>(),
  type: prop<number>(),
  user: prop<number>(),
  message: prop<string>(),
  isRead: prop<boolean>(),
  created: prop<string>(),
}) {
  @modelAction
  update(data: ModelCreationData<Alert>) {
    Object.assign(this, data)
  }
}
