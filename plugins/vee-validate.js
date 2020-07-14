import {
  required,
  confirmed,
  image,
  size,
  length,
  email,
} from 'vee-validate/dist/rules'
import { extend } from 'vee-validate'


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
  message: 'This field must have 2 options',
})

extend('min', {
  validate(value, { min }) {
    return value.length >= min
  },
  params: ['min'],
  message: 'Must be greater than 6 characters',
})

extend('max', {
  validate(value, { max }) {
    return value.length < max
  },
  params: ['max'],
  message: 'Must be greater than 20 characters',
})
