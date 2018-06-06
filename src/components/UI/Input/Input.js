import React from 'react';

const input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        // className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.onChange} />;
      break;
    case ('textarea'):
      inputElement = <textarea
        // className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.onChange} />;
      break;
    case ('select'):
      inputElement = (
        <select
          // className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.onChange}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = <input
        // className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.onChange} />;
  }

  return (
    <div>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;