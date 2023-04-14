import { createContext, useContext } from "react"

function createCtx<A>() {
    const ctx = createContext<A | undefined>(undefined)
    function useCtx() {
        const c = useContext(ctx)
        if (!c) throw new Error("useCtx must be inside a Provider with a value")
        return c
    }
    return [useCtx, ctx.Provider] as const
}

export { createCtx }
