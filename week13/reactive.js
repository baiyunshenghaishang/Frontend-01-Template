let reactiveMap = new Map(),
    handlerMap = new Map(),
    handlers = []

function setPropHandlerMap(target, prop) {
    if (!handlers.length) return
    let proxyTarget = reactive(target)
    if (!handlerMap.has(proxyTarget)) {
        handlerMap.set(proxyTarget, new Map())
    }
    let targetHandlerMap = handlerMap.get(proxyTarget)
    if (!targetHandlerMap.get(prop)) {
        targetHandlerMap.set(prop, [])
    }
    let propHandlers = targetHandlerMap.get(prop)
    propHandlers.push(...handlers)
}

function transferPropHandler(target, prop, value) {
    if (typeof target[prop] !== 'object') return

    let targetHandlerMap = handlerMap.get(target[prop])
    if (!targetHandlerMap) return

    if (typeof value === 'object') {
        let newTargetMap = new Map()
        handlerMap.set(value, newTargetMap)
        for (let key of targetHandlerMap.keys()) {
            newTargetMap.set(key, targetHandlerMap.get(key))
        }
    }
    handlerMap.delete(target[prop])
}

function executeHandler(target, prop) {
    let targetHandlerMap = handlerMap.get(reactive(target))
    if (!targetHandlerMap) return

    let propHandlers = targetHandlerMap.get(prop)
    if (!propHandlers) return

    for (let handler of propHandlers) {
        handler()
    }
}

function reactive(target) {
    if (reactiveMap.has(target)) {
        return reactiveMap.get(target)
    }
    let p = new Proxy(target, {
        get(target, prop) {
            setPropHandlerMap(target, prop)
            return target[prop]
        },
        set(target, prop, value) {
            let setValue = value
            if (typeof value === 'object') setValue = reactive(value)

            transferPropHandler(target, prop, setValue)
            target[prop] = setValue
            executeHandler(target, prop)
        },
    })
    for (let key of Object.keys(target)) {
        if (typeof target[key] === 'object') {
            target[key] = reactive(target[key])
        }
    }
    reactiveMap.set(target, p)
    reactiveMap.set(p, p)
    return p
}
function effect(handler) {
    handlers = [handler]
    handler()
    handlers = []
}
