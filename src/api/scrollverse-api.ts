import axios, { AxiosInstance } from 'axios'
import { encryptData, decryptData, EncryptedPayload } from './encryption'

/**
 * Base API configuration
 */
const API_BASE_URL = (import.meta as { env?: { VITE_API_BASE_URL?: string } }).env?.VITE_API_BASE_URL || 'https://api.scrollverse.omnitech1.io'
const API_TIMEOUT = 30000 // 30 seconds

/**
 * Unified ScrollVerse API Client
 * Handles all subsystem communications with Rose Gold encryption
 */
class ScrollVerseAPI {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'X-Encryption': 'RoseGold-v1.0',
        'X-Resonance': '∞'
      }
    })

    // Request interceptor for encryption
    this.client.interceptors.request.use(
      (config) => {
        // Encrypt request body if present
        if (config.data) {
          const encrypted = encryptData(config.data)
          config.data = encrypted
          config.headers['X-Encrypted'] = 'true'
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor for decryption
    this.client.interceptors.response.use(
      (response) => {
        // Decrypt response if encrypted
        if (response.headers['x-encrypted'] === 'true') {
          try {
            const decrypted = decryptData(response.data as EncryptedPayload)
            response.data = decrypted
          } catch (error) {
            console.error('Failed to decrypt response:', error)
          }
        }
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  /**
   * Generic GET request
   */
  async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    try {
      const response = await this.client.get<T>(endpoint, { params })
      return response.data
    } catch (error) {
      console.error(`API GET error (${endpoint}):`, error)
      throw error
    }
  }

  /**
   * Generic POST request
   */
  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    try {
      const response = await this.client.post<T>(endpoint, data)
      return response.data
    } catch (error) {
      console.error(`API POST error (${endpoint}):`, error)
      throw error
    }
  }

  /**
   * Generic PUT request
   */
  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    try {
      const response = await this.client.put<T>(endpoint, data)
      return response.data
    } catch (error) {
      console.error(`API PUT error (${endpoint}):`, error)
      throw error
    }
  }

  /**
   * Generic DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await this.client.delete<T>(endpoint)
      return response.data
    } catch (error) {
      console.error(`API DELETE error (${endpoint}):`, error)
      throw error
    }
  }

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<{ status: string; timestamp: number }> {
    return this.get('/health')
  }
}

// Export singleton instance
export const scrollVerseAPI = new ScrollVerseAPI()
export default scrollVerseAPI
