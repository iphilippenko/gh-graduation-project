import ajv from 'ajv';

require('ajv-keywords')(ajv());

const createSchema = {
  type: 'object',
  properties: {
    avatar: {
      type: 'string',
      pattern: '(\\d)+(\\.)+(\\S)',
    },
    userName: {
      type: 'string',
      minLength: 3,
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
  required: ['userName', 'password'],
  additionalProperties: false,
};

export const createUser = ajv().compile(createSchema);
