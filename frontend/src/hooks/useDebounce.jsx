import { useEffect, useState } from "react"

export default function useDebounce(value = {}, time = 500) {
    const [currentValue, setCurrentValue] = useState({})

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentValue(value)
        }, 500)
        return () => clearTimeout(timeout)
    }, [])
    console.log(JSON.stringify(value), currentValue)

    return currentValue
}