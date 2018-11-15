// @flow
import React, { PureComponent } from 'react';
import Text from '../Text/Text';
import TextLink from '../TextLink/TextLink';

type Props = {|
  id: string,
  preview: React$Element<*>,
  full: React$Element<*>,
  moreLabel: string,
  lessLabel: string,
  onShowMore?: Function
|};

type State = {|
  showMore: boolean
|};

class ReadMore extends PureComponent<Props, State> {
  static defaultProps = {
    moreLabel: 'More',
    lessLabel: 'Less'
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      showMore: false
    };
  }

  handleShowMore = () => {
    const { onShowMore } = this.props;

    this.setState(
      {
        showMore: !this.state.showMore
      },
      () => {
        if (onShowMore) {
          onShowMore(this.state.showMore);
        }
      }
    );
  };

  render() {
    const {
      id,
      preview,
      full,
      moreLabel,
      lessLabel
    } = this.props;
    const { showMore } = this.state;

    return (
      <div id={id}>
        {preview}
        <Text
          strong
          chevron={showMore ? 'up' : 'down'}
          component={TextLink}
          onClick={this.handleShowMore}
          aria-expanded={showMore}
          aria-controls={`${id}-content`} >
          {showMore ? lessLabel : moreLabel}
        </Text>

        <div id={`${id}-content`} style={!showMore ? { display: 'none' } : {}}>
          {full}
        </div>
      </div>
    );
  }
}

export default ReadMore;
