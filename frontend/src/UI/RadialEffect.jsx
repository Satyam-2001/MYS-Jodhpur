import chroma from 'chroma-js'
import React from 'react'

export default function RadialEffect({ color, top = -30, right = -20, left }) {
    const light = chroma(color).brighten().alpha(0.4).hex()
    const dark = chroma(color).darken().alpha(0.2).hex()
    return (
        <div style={{
            position: 'absolute',
            top,
            right,
            left,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: `radial-gradient(circle at 10px 10px, ${dark}, ${light})`,
            transform: 'rotate(-45deg)',
        }}></div>
    )
}
