'use strict'

const bicycleModel = () => {
    const db = {
        1: {brand: 'v', color: 'green'},
        2: {brand: 'b', color: 'yellow'}
    }

    const uid = () => {
        return Object.keys(db)
          .sort((a, b) => a - b)
          .map(Number)
          .filter((n) => !isNaN(n))
          .pop() + 1 + ''

    }

    const read = (id, cb) => {
        if (!db.hasOwnProperty(id)) {
            const e = Error('not found')
            setImmediate(() => cb(e))
            return
        }
        setImmediate(() => cb(null, db[id]))
    }

    const create = (id, data, cb) => {
        if (db.hasOwnProperty(id)) {
            const e = Error('resource exists')
            setImmediate(() => cb(e))
            return
        }
        db[id] = data
        setImmediate(() => cb(null, id))
    }

    const update = (id, data, cb) => {
        if (!db.hasOwnProperty(id)) {
            const e = Error('not found')
            setImmediate(() => cb(e))
            return
        }
        db[id] = data
        setImmediate(() => cb())
    }

    const del = (id, cb) => {
        if (!db.hasOwnProperty(id)) {
            const e = Error('not found')
            setImmediate(() => cb(e))
            return
        }
        delete db[id]
        setImmediate(() => cb())
    }

    return {
        uid,
        create,
        read,
        update,
        del
    }
}

module.exports = {
    bicycle: bicycleModel()
}
