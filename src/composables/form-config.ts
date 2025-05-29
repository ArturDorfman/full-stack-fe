// --------------------------------------------- F O R M  R E F --------------------------------------------------------
export function useElFormRef () {
  return ref<TElementPlus['FormInstance']>()
}

// --------------------------------------------- F O R M  M O D E L ----------------------------------------------------
export function useElFormModel<T extends object> (model: T) {
  return reactive<T>(model)
}

// ------------------------------------------- F O R M  R U L E S ------------------------------------------------------
export function useElFormRules (model: TElementPlus['FormRules']) {
  return reactive(model)
}

export function useRequiredRule ({ required = true } = {}): TElementPlus['FormItemRule'] {
  return { required, message: 'This field is required', trigger: 'change' }
}

export function useEmailRule (): TElementPlus['FormItemRule'] {
  return { type: 'email', message: 'This field must be a valid email', trigger: ['change', 'blur'] }
}

export function useMinLenRule (min: number): TElementPlus['FormItemRule'] {
  return { min, message: `This field must be at least ${min} characters long`, trigger: 'change' }
}

export function useMaxLenRule (max: number): TElementPlus['FormItemRule'] {
  return { max, message: `This field must be at most ${max} characters long`, trigger: 'change' }
}
