/**
 * Test 6: Saving an outfit persists the correct value to the database.
 */
import { describe, it, expect } from 'vitest'
import { buildMock } from './mockSupabase.js'
import { saveOutfit, createOutfit } from '../lib/outfitService.js'

describe('saveOutfit', () => {
  it('updates saved=true on the correct outfit row', async () => {
    const db = buildMock({ data: null, error: null })

    await saveOutfit(db, 'user-1', 'outfit-abc', true)

    expect(db.from).toHaveBeenCalledWith('outfits')
    expect(db.update).toHaveBeenCalledWith({ saved: true })

    const eqCalls = db.eq.mock.calls
    expect(eqCalls).toContainEqual(['id', 'outfit-abc'])
    expect(eqCalls).toContainEqual(['user_id', 'user-1'])
  })

  it('updates saved=false (unsave) on the correct outfit row', async () => {
    const db = buildMock({ data: null, error: null })

    await saveOutfit(db, 'user-1', 'outfit-abc', false)

    expect(db.update).toHaveBeenCalledWith({ saved: false })
  })

  it('scopes the update to the authenticated user', async () => {
    const db = buildMock({ data: null, error: null })

    await saveOutfit(db, 'user-7', 'outfit-xyz', true)

    const userIdFilter = db.eq.mock.calls.find(([col]) => col === 'user_id')
    expect(userIdFilter?.[1]).toBe('user-7')
  })

  it('throws when Supabase returns an error', async () => {
    const db = buildMock({ data: null, error: { message: 'not found' } })

    await expect(
      saveOutfit(db, 'user-1', 'missing-id', true)
    ).rejects.toMatchObject({ message: 'not found' })
  })
})

describe('createOutfit (persist generated outfit on first save)', () => {
  it('inserts the outfit with user_id and returns the new row', async () => {
    const saved = {
      id: 'real-uuid',
      event_type: 'Work',
      name: 'לוק משרד מושלם',
      items: [{ category: 'Tops', name: 'חולצה לבנה' }],
      tags: ['עסקי', 'נקי'],
      saved: true,
      user_id: 'user-1',
    }
    const db = buildMock({ data: saved, error: null })
    const payload = {
      event_type: 'Work',
      name: 'לוק משרד מושלם',
      items: [{ category: 'Tops', name: 'חולצה לבנה' }],
      tags: ['עסקי', 'נקי'],
      saved: true,
    }

    const result = await createOutfit(db, 'user-1', payload)

    expect(db.from).toHaveBeenCalledWith('outfits')
    expect(db.insert).toHaveBeenCalledWith({ ...payload, user_id: 'user-1' })
    expect(result).toEqual(saved)
  })
})
