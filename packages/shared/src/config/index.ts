import { isString, merge } from 'lodash'
import base from './base'
import dev from './dev'
import prod from './prod'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getConfig = (env = 'dev') =>
  merge(
    base,
    !isString(env) || env.indexOf('dev') >= 0 ? dev : {},
    isString(env) && env.indexOf('prod') !== -1 ? prod : {}
  )

const config = getConfig(process.env.APP_CONFIG || process.env.NODE_ENV)
// console.log({ config })

export default config
