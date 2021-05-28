import { createStore, createEffect } from 'effector'

export const loadContractEventsFx = createEffect()

export const $events = createStore(null)
