/**
 * Tests 1-4: clothing item CRUD operations
 *   1. Creating an item adds it to the database
 *   2. Reading items returns only the current user's items
 *   3. Updating an item changes only the correct fields
 *   4. Deleting an item removes it from the database
 */
import { describe, it, expect, vi } from 'vitest'
import { buildMock } from './mockSupabase.js'
import {
  createClothingItem,
  fetchUserClothingItems,
  updateClothingItem,
  deleteClothingItem,
} from '../lib/wardrobeService.js'

// ─────────────────────────────────────────────────────────────────────────────
// Test 1 — CREATE
// ─────────────────────────────────────────────────────────────────────────────
describe('createClothingItem', () => {
  it('calls INSERT on clothing_items with user_id merged into the payload', async () => {
    const newItem = { id: 'uuid-1', name: 'White Shirt', category: 'Tops', user_id: 'user-1' }
    const db = buildMock({ data: newItem, error: null })

    const result = await createClothingItem(db, 'user-1', { name: 'White Shirt', category: 'Tops' })

    expect(db.from).toHaveBeenCalledWith('clothing_items')
    expect(db.insert).toHaveBeenCalledWith({
      name: 'White Shirt',
      category: 'Tops',
      user_id: 'user-1',
    })
    expect(result).toEqual(newItem)
  })

  it('returns the new row returned by Supabase', async () => {
    const expected = { id: 'uuid-2', name: 'Blue Jeans', category: 'Bottoms', user_id: 'user-1' }
    const db = buildMock({ data: expected, error: null })

    const result = await createClothingItem(db, 'user-1', { name: 'Blue Jeans', category: 'Bottoms' })

    expect(result).toStrictEqual(expected)
  })

  it('throws when Supabase returns an error', async () => {
    const db = buildMock({ data: null, error: { message: 'violates not-null constraint' } })

    await expect(
      createClothingItem(db, 'user-1', { name: '' })
    ).rejects.toMatchObject({ message: 'violates not-null constraint' })
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Test 2 — READ (scoped to current user)
// ─────────────────────────────────────────────────────────────────────────────
describe('fetchUserClothingItems', () => {
  it('filters by user_id so only the current user\'s items are returned', async () => {
    const items = [
      { id: '1', name: 'Shirt', user_id: 'user-1' },
      { id: '2', name: 'Pants', user_id: 'user-1' },
    ]
    const db = buildMock({ data: items, error: null })

    const result = await fetchUserClothingItems(db, 'user-1')

    // The query must include a user_id filter
    expect(db.from).toHaveBeenCalledWith('clothing_items')
    expect(db.eq).toHaveBeenCalledWith('user_id', 'user-1')
    expect(result).toEqual(items)
  })

  it('orders results newest-first', async () => {
    const db = buildMock({ data: [], error: null })

    await fetchUserClothingItems(db, 'user-1')

    expect(db.order).toHaveBeenCalledWith('created_at', { ascending: false })
  })

  it('returns an empty array when the user has no items', async () => {
    const db = buildMock({ data: null, error: null })   // Supabase may return null

    const result = await fetchUserClothingItems(db, 'user-1')

    expect(result).toEqual([])
  })

  it('does NOT use another user\'s id in the filter', async () => {
    const db = buildMock({ data: [], error: null })

    await fetchUserClothingItems(db, 'user-A')

    // The eq call must use 'user-A', never 'user-B'
    const eqCalls = db.eq.mock.calls
    const userIdFilter = eqCalls.find(([col]) => col === 'user_id')
    expect(userIdFilter).toBeDefined()
    expect(userIdFilter[1]).toBe('user-A')
    expect(userIdFilter[1]).not.toBe('user-B')
  })

  it('throws when Supabase returns an error', async () => {
    const db = buildMock({ data: null, error: { message: 'permission denied' } })

    await expect(fetchUserClothingItems(db, 'user-1')).rejects.toMatchObject({
      message: 'permission denied',
    })
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Test 3 — UPDATE
// ─────────────────────────────────────────────────────────────────────────────
describe('updateClothingItem', () => {
  it('calls UPDATE with only the supplied fields', async () => {
    const db = buildMock({ data: null, error: null })
    const updates = { name: 'Grey Hoodie', color: 'grey' }

    await updateClothingItem(db, 'user-1', 'item-id', updates)

    expect(db.from).toHaveBeenCalledWith('clothing_items')
    expect(db.update).toHaveBeenCalledWith(updates)
  })

  it('scopes the update to both item id and user id', async () => {
    const db = buildMock({ data: null, error: null })

    await updateClothingItem(db, 'user-1', 'item-42', { name: 'Updated' })

    const eqCalls = db.eq.mock.calls
    expect(eqCalls).toContainEqual(['id', 'item-42'])
    expect(eqCalls).toContainEqual(['user_id', 'user-1'])
  })

  it('throws when Supabase returns an error', async () => {
    const db = buildMock({ data: null, error: { message: 'row not found' } })

    await expect(
      updateClothingItem(db, 'user-1', 'bad-id', { name: 'x' })
    ).rejects.toMatchObject({ message: 'row not found' })
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Test 4 — DELETE
// ─────────────────────────────────────────────────────────────────────────────
describe('deleteClothingItem', () => {
  it('calls DELETE on clothing_items', async () => {
    const db = buildMock({ data: null, error: null })

    await deleteClothingItem(db, 'user-1', 'item-id')

    expect(db.from).toHaveBeenCalledWith('clothing_items')
    expect(db.delete).toHaveBeenCalled()
  })

  it('scopes the delete to both item id and user id', async () => {
    const db = buildMock({ data: null, error: null })

    await deleteClothingItem(db, 'user-1', 'item-99')

    const eqCalls = db.eq.mock.calls
    expect(eqCalls).toContainEqual(['id', 'item-99'])
    expect(eqCalls).toContainEqual(['user_id', 'user-1'])
  })

  it('throws when Supabase returns an error', async () => {
    const db = buildMock({ data: null, error: { message: 'foreign key violation' } })

    await expect(
      deleteClothingItem(db, 'user-1', 'bad-id')
    ).rejects.toMatchObject({ message: 'foreign key violation' })
  })
})
