import React from 'react';
import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';

const schema: RJSFSchema = {
  title: 'A registration form',
  description: 'A simple form example.',
  type: 'object',
  required: ['from_value_regex', 'target_document_type', 'target_value_type'],
  properties: {
    from_value_regex: {
      type: 'string',
      title: 'Regex to apply on asset filename',
    },
    target_document_type: {
      type: 'string',
      title: 'Document Type code (the one you want the asset to be linked to)',
      default: '',
    },
    target_value_type: {
      type: 'string',
      title: 'Data to compare the result of the regex to',
      enum: ['identifier', 'attribute'],
      default: 'identifier',
    },
  },
  dependencies: {
    target_value_type: {
      oneOf: [
        {
          properties: {
            target_value_type: {
              enum: ['identifier'],
            },
          },
        },
        {
          properties: {
            target_value_type: {
              enum: ['attribute'],
            },
            target_value: {
              type: 'string',
              title: 'Attribute code',
            },
          },
          required: ['target_value'],
        },
      ],
    },
  },
};
const FormView = () => {
  const log = (type) => console.log.bind(console, type);

  return (
    <Form
      schema={schema}
      validator={validator}
      onChange={log('changed')}
      onSubmit={log('submitted')}
      onError={log('errors')}
    />
  );
};

export default FormView;
