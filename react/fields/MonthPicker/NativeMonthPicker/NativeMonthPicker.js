import styles from './NativeMonthPicker.less';

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import pad from 'pad-left';

import ChevronIcon from '../../../icons/ChevronIcon/ChevronIcon';

const makeMonthString = ({ month, year }) => {
  if (month && year) {
    return `${year}-${pad(month, 2, '0')}`;
  }

  return '';
};

const getValueFromString = monthString => {
  const [ year, month ] = monthString.split('-');

  return {
    year: parseInt(year, 10),
    month: parseInt(month, 10)
  };
};

export default class NativeMonthPicker extends Component {

  static displayName = 'NativeMonthPicker';

  static propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.shape({
      month: PropTypes.number,
      year: PropTypes.number
    }),
    invalid: PropTypes.bool,
    className: PropTypes.string,
    id: PropTypes.string
  };

  static defaultProps = {
    invalid: false,
    value: {},
    className: ''
  };

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value } }) {
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange(getValueFromString(value));
    }
  }

  render() {
    const { value, className, invalid, id, onBlur } = this.props;

    const inputValue = makeMonthString(value);

    const rootClasses = classnames({
      [styles.root]: true,
      [styles.invalid]: invalid,
      [className]: className
    });

    return (
      <div className={rootClasses}>
        <ChevronIcon
          className={styles.chevron}
          svgClassName={styles.chevronSvg}
          direction="down"
        />
        <input
          {...(id ? { id } : {})}
          className={styles.input}
          type="month"
          value={inputValue}
          onChange={this.handleChange}
          onBlur={onBlur}
        />
      </div>
    );
  }
}