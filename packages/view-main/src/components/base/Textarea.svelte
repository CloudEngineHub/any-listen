<script lang="ts">
  import { clipboardReadText } from '@/shared/ipc/app'
  import { onMount, tick } from 'svelte'
  import type { FocusEventHandler } from 'svelte/elements'
  let {
    min = false,
    placeholder = '',
    disabled = false,
    value = $bindable(''),
    id,
    trim = false,
    stopcontenteventpropagation = true,
    autopaste = true,
    onchange = () => {},
    onblur = () => {},
    autofocus = false,
  }: {
    id?: string
    class?: string
    min?: boolean
    placeholder?: string
    disabled?: boolean
    value?: string
    trim?: boolean
    stopcontenteventpropagation?: boolean
    autopaste?: boolean
    autofocus?: boolean
    onchange?: (val: string) => void
    onblur?: FocusEventHandler<HTMLTextAreaElement>
  } = $props()

  let domInput: HTMLTextAreaElement

  const handleInput = () => {
    let newValue = domInput.value
    if (trim) {
      newValue = newValue.trim()
      domInput.value = newValue
    }
    value = newValue
  }
  export const focus = () => {
    domInput.focus()
  }
  const handleContextMenu = async (event: Event) => {
    if (stopcontenteventpropagation) event.stopPropagation()
    if (!autopaste || disabled) return
    if (domInput.selectionStart === null) return
    let str = await clipboardReadText()
    str = str.trim()
    str = str.replace(/\t|\n|\r/g, ' ')
    str = str.replace(/\s+/g, ' ')
    const text = domInput.value
    // if (domInput.selectionStart == domInput.selectionEnd) {
    const newValue =
      text.substring(0, domInput.selectionStart) +
      str +
      text.substring(domInput.selectionEnd ?? domInput.selectionStart, text.length)
    domInput.value = newValue
    handleInput()
    onchange(domInput.value.trim())
    // } else {
    //   clipboardWriteText(text.substring(domInput.selectionStart, domInput.selectionEnd))
    // }
  }

  if (autofocus) {
    onMount(() => {
      void tick().then(() => {
        domInput.focus()
      })
    })
  }
</script>

<textarea
  bind:this={domInput}
  class="textarea"
  class:min
  {id}
  {placeholder}
  {value}
  {disabled}
  {onblur}
  tabindex="0"
  oninput={handleInput}
  onchange={() => {
    onchange(domInput.value.trim())
  }}
  oncontextmenu={handleContextMenu}
></textarea>

<style lang="less">
  .textarea {
    display: block;
    border: none;
    border-radius: @form-radius;
    padding: 7px 8px;
    color: var(--color-font);
    outline: none;
    transition: background-color 0.2s ease;
    background-color: var(--color-primary-background);
    font-size: 14px;
    height: 90px;
    min-width: 130px;
    max-width: 100%;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[disabled] {
      opacity: 0.4;
    }

    &:hover,
    &:focus {
      background-color: var(--color-primary-background-hover) !important;
    }
    &:active {
      background-color: var(--color-primary-background-active) !important;
    }
  }

  .min {
    padding: 3px 8px;
    font-size: 12px;
  }
</style>
