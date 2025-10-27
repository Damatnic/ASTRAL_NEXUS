import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server'
import { getGuideBySlug } from '@/lib/guides'
import { db, AIConversationMessage } from '@/lib/db'

// Create OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(req: NextRequest) {
  try {
    const { messages, guideSlug, mode, conversationId, title } = await req.json()

    // Get guide context if provided
    let context = ''
    if (guideSlug) {
      const guide = getGuideBySlug(guideSlug)
      if (guide) {
        context = `You are helping a student learn from the guide "${guide.title}".
Category: ${guide.category}
Description: ${guide.description}

Guide excerpt:
${guide.content.substring(0, 3000)}...

Use this guide content first. If something is missing, state that clearly and provide general insight. Always keep explanations concise, encouraging, and focused on practical application.`
      }
    }

    const baseSystemMessage = context ||
      `You are Astral Helper, the AI mentor for Astral Nexus. You:
- give clear, encouraging explanations
- reference guide material when possible
- suggest next steps and study techniques
- keep answers under 8 sentences unless asked otherwise`

    const systemMessage =
      mode === 'plan'
        ? `${baseSystemMessage}

When the user requests a study plan, produce a detailed schedule tailored to the learner. Include:
- duration (default 7 days unless specified)
- daily objectives (bulleted)
- recommended study tools from Astral Nexus (flashcards, quizzes, notes, AI chat)
- motivation tip or reflection question for the end of each day.

Format the response with clear headings for each day.`
        : baseSystemMessage

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      stream: true,
      messages: [
        { role: 'system', content: systemMessage },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    // Stream the response with conversation persistence
    const chunks: string[] = []
    const loggingStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content || ''
          chunks.push(text)
          controller.enqueue(encoder.encode(text))
        }
        controller.close()

        const assistantMessage = chunks.join('')
        const conversationMessages: AIConversationMessage[] = [
          ...messages,
          { role: 'assistant', content: assistantMessage, createdAt: new Date() },
        ]

        if (conversationId) {
          const existing = await db.aiConversations.get(conversationId)
          if (existing) {
            await db.aiConversations.update(conversationId, {
              messages: conversationMessages,
              updatedAt: new Date(),
            })
            return
          }
        }
        await db.aiConversations.add({
          guideSlug: guideSlug || null,
          title: title || (guideSlug ? `Chat about ${guideSlug}` : 'General conversation'),
          messages: conversationMessages,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      },
    })

    return new NextResponse(loggingStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new NextResponse('Error: ' + (error as Error).message, { status: 500 })
  }
}

