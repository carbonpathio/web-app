import localforage from 'localforage'

const storage = localforage.createInstance({ name: 'carbonpath' })

export const storageKeySnapshot = 'snapshot'

export default storage
