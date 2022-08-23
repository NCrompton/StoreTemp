import { testReducer } from './hook'
import deepFreeze from 'deep-freeze'
import { describe } from 'node:test'

describe('testReducer', () => {
    const state = []
    const action = {
        type: 'NEW',
        data: 'g'
    }
    deepFreeze(state)
    const newState = testReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
})