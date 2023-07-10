import { useState, useEffect, useCallback } from 'react'
import type { Messages, Message } from './index'
import { messages } from './index'


type TranslateValues = Record<string, string | number | boolean>

type Langs = keyof Messages

type Hook = (locale: Langs) => void

export declare interface I18n {
  locale: Langs
  fallbackLocale: Langs
  availableLocales: Langs[]
  messages: Messages
  message: Message
  setLanguage: (locale: Langs) => void
  fillMessage: (message: string, val: TranslateValues) => string
  getMessage: (key: keyof Message, val?: TranslateValues) => string
  t: (key: keyof Message, val?: TranslateValues) => string
}

let locale: Langs = 'zh_cn'

let i18n: I18n


const hookTools = {
  hooks: [] as Hook[],
  add(hook: Hook) {
    this.hooks.push(hook)
  },
  remove(hook: Hook) {
    this.hooks.splice(this.hooks.indexOf(hook), 1)
  },
  update(locale: Parameters<Hook>[0]) {
    for (const hook of this.hooks) hook(locale)
  },
}

