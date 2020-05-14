import React from 'react';
import { render } from '@testing-library/react';
import Information from '../src/components/QuestionTypes/Information'
import LikertScaleQuestion from '../src/components/QuestionTypes/LikertScaleQuestion.js';
test('renders learn react link', () => {
  render(<LikertScaleQuestion></LikertScaleQuestion>)
  const { getByText } = render(<Information/>);
});
