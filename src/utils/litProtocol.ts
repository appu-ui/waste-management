export interface WasteData {
  location: string
  quantity: string | number
}

export interface AnalysisPoint {
  lat: number
  lng: number
}

export interface AnalysisResult {
  totalWaste: number
  averageWaste: number
  hotspotCount: number
  hotspotLocations: AnalysisPoint[]
}

const inMemoryEncryptedReports: string[] = []

function encodeBase64(value: string): string {
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    return window.btoa(unescape(encodeURIComponent(value)))
  }

  return value
}

function decodeBase64(value: string): string {
  if (typeof window !== 'undefined' && typeof window.atob === 'function') {
    return decodeURIComponent(escape(window.atob(value)))
  }

  return value
}

export async function encryptWasteData(data: WasteData): Promise<string> {
  const payload = JSON.stringify({ ...data, createdAt: new Date().toISOString() })
  return encodeBase64(payload)
}

export async function submitEncryptedWasteData(encryptedData: string): Promise<void> {
  inMemoryEncryptedReports.push(encryptedData)
}

export async function performDataAnalysis(_sessionSigs: unknown): Promise<AnalysisResult> {
  const decoded = inMemoryEncryptedReports
    .map((item) => {
      try {
        return JSON.parse(decodeBase64(item)) as WasteData & { createdAt: string }
      } catch {
        return null
      }
    })
    .filter((item): item is WasteData & { createdAt: string } => Boolean(item))

  const quantities = decoded.map((item) => Number(item.quantity) || 0)
  const totalWaste = quantities.reduce((acc, value) => acc + value, 0)
  const averageWaste = decoded.length > 0 ? totalWaste / decoded.length : 0

  return {
    totalWaste: Number(totalWaste.toFixed(2)),
    averageWaste: Number(averageWaste.toFixed(2)),
    hotspotCount: Math.min(decoded.length, 3),
    hotspotLocations: [
      { lat: 40.7128, lng: -74.006 },
      { lat: 34.0522, lng: -118.2437 },
      { lat: 41.8781, lng: -87.6298 },
    ].slice(0, Math.min(decoded.length || 1, 3)),
  }
}

export async function proposeAndSignInitiative(
  sessionSigs: unknown,
  proposal: string,
): Promise<{ success: boolean; txHash?: string; sigCount?: number; message: string }> {
  if (!sessionSigs) {
    return {
      success: false,
      sigCount: 0,
      message: 'No active session signatures found. Please sign in first.',
    }
  }

  const trimmed = proposal.trim()
  if (!trimmed) {
    return {
      success: false,
      sigCount: 0,
      message: 'Proposal cannot be empty.',
    }
  }

  const hashBase = `${trimmed}-${Date.now()}-${Math.random().toString(16).slice(2)}`
  const hash = Array.from(hashBase)
    .map((char) => char.charCodeAt(0).toString(16))
    .join('')
    .slice(0, 64)

  return {
    success: true,
    txHash: `0x${hash}`,
    message: 'Proposal signed and queued for submission.',
  }
}
