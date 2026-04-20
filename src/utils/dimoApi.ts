interface DimoDevice {
  id: string
}

interface DeviceTelemetry {
  vin?: string
  make?: string
  model?: string
  year?: number
  odometer?: number
  fuelPercentRemaining?: number
}

interface DeviceTrip {
  averageSpeed: number
}

const fallbackDevice: DimoDevice = { id: 'demo-device-001' }

export async function getUserDevices(): Promise<DimoDevice[]> {
  return [fallbackDevice]
}

export async function getDeviceData(_deviceId: string): Promise<DeviceTelemetry> {
  return {
    vin: '1HGCM82633A000000',
    make: 'Demo Motors',
    model: 'EcoDrive',
    year: 2024,
    odometer: 12874,
    fuelPercentRemaining: 0.62,
  }
}

export async function getDeviceTrips(_deviceId: string): Promise<{ trips: DeviceTrip[] }> {
  return {
    trips: [
      { averageSpeed: 42 },
      { averageSpeed: 58 },
      { averageSpeed: 67 },
    ],
  }
}
