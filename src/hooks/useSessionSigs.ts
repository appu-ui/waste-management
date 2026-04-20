'use client'

import { useEffect, useState } from 'react'

export interface SessionSignatures {
  userId: string
  issuedAt: string
  expiresAt: string
  signature: string
}

function encodeBase64(value: string): string {
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    return window.btoa(unescape(encodeURIComponent(value)))
  }

  return value
}

function generatePseudoSignature(seed: string): string {
  const base = `${seed}-${Date.now()}-${Math.random().toString(36).slice(2)}`
  return encodeBase64(base).slice(0, 64)
}

export function useSessionSigs() {
  const [sessionSigs, setSessionSigs] = useState<SessionSignatures | null>(null)

  useEffect(() => {
    const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null

    if (!userEmail) {
      setSessionSigs(null)
      return
    }

    const now = new Date()
    const expiresAt = new Date(now.getTime() + 60 * 60 * 1000)

    setSessionSigs({
      userId: userEmail,
      issuedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      signature: generatePseudoSignature(userEmail),
    })
  }, [])

  return sessionSigs
}
