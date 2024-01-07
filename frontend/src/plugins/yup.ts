import { removeNumericFormat } from 'react-number-format'
import * as Yup from 'yup'

Yup.addMethod(Yup.string, 'isValidAmount', function (errorMessage) {
  return this.test('test-amount', errorMessage, function (value) {
    const { path, createError } = this

    return createError({ path, message: errorMessage })
  })
})
