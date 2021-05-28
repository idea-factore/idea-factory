import { createStore, createEffect } from 'effector'

export const getGasPriceFx = createEffect()

export const getProviderFx = createEffect()

export const getAddressFx = createEffect()

export const $gasPrice = createStore(null)

export const $provider = createStore(null)

export const $address = createStore(null)
