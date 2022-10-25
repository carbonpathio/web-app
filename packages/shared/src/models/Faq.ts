import { model, Model, modelAction, ModelCreationData, prop } from 'mobx-keystone'

@model('carbonPath/Faq')
export default class Faq extends Model({
  id: prop<number>(),
  question: prop<string>(),
  answer: prop<string>(),
}) {
  @modelAction
  update(data: ModelCreationData<Faq>): void {
    Object.assign(this, data)
  }
}
