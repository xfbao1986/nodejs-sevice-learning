'use strict'

const bicycleModel = () => {
    const db = {
        1: {brand: 'v', color: 'green'},
        2: {brand: 'b', color: 'yellow'}
    }

    const read = (id, cb) => {
        if (!db.hasOwnProperty(id)) {
            const e = Error('not found')
            setImmediate(() => cb(e))
            return
        }
        setImmediate(() => cb(null, db[id]))
    }

    return {
        read
    }
}

module.exports = {
    bicycle: bicycleModel()
}

