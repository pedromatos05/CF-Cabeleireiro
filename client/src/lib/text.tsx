import React from 'react'

// Renderiza " & " numa fonte sem serifa — o "&" da fonte de títulos (serifa)
// fica demasiado ornamentado e pouco legível.
export function withAmp(name: string): React.ReactNode {
  const parts = name.split(' & ')
  if (parts.length === 1) return name
  return parts.flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <span key={i} style={{ fontFamily: '"Times New Roman", Times, serif' }}>
            {' & '}
          </span>,
          part,
        ]
  )
}
