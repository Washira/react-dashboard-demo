import React from 'react';

// eslint-disable-next-line react/prop-types
const FieldError = ({ message, ...restProps }) => {
  return (
    <small
      style={{
        color: '#f44336',
        padding: '2px 8px 0 8px',
        fontSize: '0.70rem',
        display: 'block',
      }}
      {...restProps}
    >
      {message}
    </small>
  );
};

export default FieldError;
