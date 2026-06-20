import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const EVENT_LABELS: Record<string, string> = {
  Work:    'עבודה',
  Party:   'מסיבה',
  Wedding: 'חתונה',
  Sport:   'ספורט',
}

interface ClothingItem {
  name: string
  category: string
  color: string
  seasons?: string[]
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  try {
    // ── Auth: verify the request comes from a logged-in user ──────────────
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error('Unauthorized')

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    )
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) throw new Error('Unauthorized')
    console.log('[generate-outfits] auth ok, user:', user.id)

    // ── Parse request ─────────────────────────────────────────────────────
    const { items, event_type }: { items: ClothingItem[]; event_type: string } = await req.json()
    if (!items?.length) throw new Error('No items provided')
    console.log('[generate-outfits] items:', items.length, 'event:', event_type)

    const itemsList = items
      .map(it => `- ${it.name} (${it.category}, צבע: ${it.color})`)
      .join('\n')

    const eventLabel = EVENT_LABELS[event_type] ?? event_type

    const prompt = `אתה יועץ אופנה ישראלי מקצועי. המשתמש רוצה המלצות לוק לאירוע: ${eventLabel}.

הבגדים הזמינים בארון:
${itemsList}

צור 3 לוקים מתאימים לאירוע זה. השתמש רק בפריטים שמופיעים ברשימה.

ענה אך ורק בפורמט JSON הבא, ללא טקסט נוסף:
{
  "outfits": [
    {
      "name": "שם יצירתי בעברית",
      "items": [{"category": "Tops", "name": "שם הפריט מהרשימה"}],
      "tags": ["תגית1", "תגית2", "תגית3"],
      "explanation": "משפט אחד מדוע הלוק מתאים לאירוע"
    }
  ]
}`

    // ── Call Claude ───────────────────────────────────────────────────────
    const apiKey = Deno.env.get('ANTHROPIC_API_KEY')
    console.log('[generate-outfits] API key present:', !!apiKey)
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY secret not set')

    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key':         apiKey,
        'anthropic-version': '2023-06-01',
        'content-type':      'application/json',
      },
      body: JSON.stringify({
        model:      'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages:   [{ role: 'user', content: prompt }],
      }),
    })

    if (!claudeRes.ok) {
      const text = await claudeRes.text()
      throw new Error(`Anthropic API error ${claudeRes.status}: ${text}`)
    }

    const claude = await claudeRes.json()
    const raw    = claude.content[0].text

    // Parse JSON — Claude may occasionally wrap it in markdown fences
    let outfits
    try {
      outfits = JSON.parse(raw).outfits
    } catch {
      const match = raw.match(/\{[\s\S]*\}/)
      if (!match) throw new Error('Claude returned invalid JSON')
      outfits = JSON.parse(match[0]).outfits
    }

    return new Response(JSON.stringify({ outfits }), {
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[generate-outfits] error:', message)
    const status = message === 'Unauthorized' ? 401 : 500
    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
})
