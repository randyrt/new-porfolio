import OpenAI from 'openai'

const TOGETHER_API_KEY = import.meta.env.VITE_TOGETHER_API_KEY
const TOGETHER_BASE_URL = 'https://api.together.xyz/v1'

export const TOGETHER_MODELS = {
  LLAMA_3_70B: 'meta-llama/Llama-3-70b-chat-hf',
  LLAMA_3_8B: 'meta-llama/Llama-3-8b-chat-hf',
  LLAMA_3_3_70B: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
  LLAMA_3_2_3B: 'meta-llama/Llama-3.2-3b-instruct-turbo'
}

let client: OpenAI | null = null

const initTogetherClient = (): OpenAI | null => {
  if (!TOGETHER_API_KEY) {
    console.error('❌ VITE_TOGETHER_API_KEY manquante dans .env')
    return null
  }
  return new OpenAI({
    apiKey: TOGETHER_API_KEY,
    baseURL: TOGETHER_BASE_URL,
    dangerouslyAllowBrowser: true
  })
}

export const sendToTogether = async (
  prompt: string,
  systemPrompt?: string,
  model: string = TOGETHER_MODELS.LLAMA_3_3_70B
): Promise<string> => {
  if (!client) {
    client = initTogetherClient()
    if (!client) throw new Error('Together AI non configuré')
  }

  const messages = []
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt })
  }
  messages.push({ role: 'user', content: prompt })

  const response = await client.chat.completions.create({
    model: model,
    messages: messages,
    temperature: 0.7,
    max_tokens: 2000,
    top_p: 0.9
  })

  return response.choices[0]?.message?.content || "Je n'ai pas pu générer de réponse."
}

export const sendToTogetherWithHistory = async (
  messages: Array<{ role: string; content: string }>,
  model: string = TOGETHER_MODELS.LLAMA_3_3_70B
): Promise<string> => {
  if (!client) {
    client = initTogetherClient()
    if (!client) throw new Error('Together AI non configuré')
  }

  const response = await client.chat.completions.create({
    model: model,
    messages: messages as any,
    temperature: 0.7,
    max_tokens: 2000,
    top_p: 0.9
  })

  return response.choices[0]?.message?.content || "Je n'ai pas pu générer de réponse."
}