import { Model, model, prop } from 'mobx-keystone'

@model('carbonPath/User')
export class User extends Model({
  id: prop<number>(),
  username: prop<string>(''),
  walletAddress: prop<string>(''),
  email: prop<string>(''),
  isStaff: prop<boolean>(false),
  retiredAmount: prop<number>(0),
}) {}
