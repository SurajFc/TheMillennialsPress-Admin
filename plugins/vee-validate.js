import {
  required,
  confirmed,
  image,
  size,
  length,
  email,
  digits
} from 'vee-validate/dist/rules'
import {
  extend
} from 'vee-validate'


extend('size', {
  ...size,
  message: 'This image must be less than 1MB',
})

extend('required', {
  ...required,
  message: 'This field is required',
})

extend('email', {
  ...email,
  message: 'This field must be a valid email',
})

extend('digits', {
  ...digits,

})

extend('image', {
  ...image,
  message: 'This image must be jpg/png',
})

extend('confirmed', {
  ...confirmed,
  message: 'This field confirmation does not match',
})

extend('length', {
  ...length,
  message: 'This field must have  options',
})

extend('min', {
  validate(value, {
    min
  }) {
    return value.length >= min
  },
  params: ['min'],
  message: 'The {_field_} field must have at least {min} characters'
})

extend('max', {
  validate(value, {
    max
  }) {
    return value.length < max
  },
  params: ['max'],
  message: 'The {_field_} field must be less than {max} characters'
})



// extend('otp', {
//   validate(value, {
//     otp
//   }) {
//     return value.length ==6
//   },
//   params: ['otp'],
//   message: 'The {_field_} field have {otp} digits'
// })
