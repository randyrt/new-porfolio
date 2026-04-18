export interface FeedbackRecord {
  id: string
  userQuestion: string
  botResponse: string
  rating: 'positive' | 'negative' // 👍 / 👎
  timestamp: number
  category?: string
  userCorrection?: string // Si l'utilisateur a corrigé la réponse
}

export interface FeedbackStats {
  totalFeedback: number
  positiveCount: number
  negativeCount: number
  averageRating: number
  byCategory: Record<string, { positive: number; negative: number }>
}

export class FeedbackStorage {
  private dbName = 'ChatbotDB'
  private storeName = 'feedback'
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' })
          store.createIndex('timestamp', 'timestamp', { unique: false })
          store.createIndex('category', 'category', { unique: false })
          store.createIndex('rating', 'rating', { unique: false })
        }
      }
    })
  }

  async addFeedback(feedback: Omit<FeedbackRecord, 'id'>): Promise<FeedbackRecord> {
    if (!this.db) await this.init()

    const record: FeedbackRecord = {
      ...feedback,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const request = store.add(record)

      request.onsuccess = () => resolve(record)
      request.onerror = () => reject(request.error)
    })
  }

  async getFeedback(limit: number = 100): Promise<FeedbackRecord[]> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      const index = store.index('timestamp')
      const request = index.getAll()

      request.onsuccess = () => {
        const results = (request.result as FeedbackRecord[]).reverse().slice(0, limit)
        resolve(results)
      }
      request.onerror = () => reject(request.error)
    })
  }

  async getStats(): Promise<FeedbackStats> {
    if (!this.db) await this.init()

    const allFeedback = await this.getFeedback(1000)

    const stats: FeedbackStats = {
      totalFeedback: allFeedback.length,
      positiveCount: 0,
      negativeCount: 0,
      averageRating: 0,
      byCategory: {}
    }

    allFeedback.forEach((record) => {
      if (record.rating === 'positive') {
        stats.positiveCount++
      } else {
        stats.negativeCount++
      }

      const category = record.category || 'unknown'
      if (!stats.byCategory[category]) {
        stats.byCategory[category] = { positive: 0, negative: 0 }
      }
      if (record.rating === 'positive') {
        stats.byCategory[category].positive++
      } else {
        stats.byCategory[category].negative++
      }
    })

    if (stats.totalFeedback > 0) {
      stats.averageRating = stats.positiveCount / stats.totalFeedback
    }

    return stats
  }

  async getNegativeFeedback(): Promise<FeedbackRecord[]> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      const index = store.index('rating')
      const request = index.getAll('negative')

      request.onsuccess = () => {
        const results = (request.result as FeedbackRecord[]).reverse()
        resolve(results)
      }
      request.onerror = () => reject(request.error)
    })
  }

  async clearOldFeedback(daysOld: number = 90): Promise<void> {
    if (!this.db) await this.init()

    const cutoffTime = Date.now() - daysOld * 24 * 60 * 60 * 1000
    const allFeedback = await this.getFeedback(10000)

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)

      allFeedback.forEach((record) => {
        if (record.timestamp < cutoffTime) {
          store.delete(record.id)
        }
      })

      transaction.oncomplete = () => resolve()
      transaction.onerror = () => reject(transaction.error)
    })
  }
}

export const feedbackStorage = new FeedbackStorage()
