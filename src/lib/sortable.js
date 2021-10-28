import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SortableJS from 'sortablejs';

const store = {
  nextSibling: null,
  activeComponent: null,
};

class Sortable extends Component {
  sortable = null;

  static propTypes = {
    options: PropTypes.object,
    onChange: PropTypes.func,
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    style: PropTypes.object,
  };

  static defaultProps = {
    options: {},
    tag: 'div',
    style: {},
  };

  componentDidMount() {
    const options = { ...this.props.options };

    [
      'onChoose',
      'onStart',
      'onEnd',
      'onRemove',
      'onAdd',
      'onUpdate',
      'onSort',
      'onFilter',
      'onMove',
      'onClone',
    ].forEach(name => {
      const eventHandler = options[name];

      options[name] = (...params) => {
        const [evt] = params;

        if (name === 'onChoose') {
          store.nextSibling = evt.item.nextElementSibling;
          store.activeComponent = this;
        } else if ((name === 'onAdd' || name === 'onUpdate') && this.props.onChange) {
          const items = this.sortable.toArray();
          const remote = store.activeComponent;
          const remoteItems = remote.sortable.toArray();

          const referenceNode =
            store.nextSibling && store.nextSibling.parentNode !== null ? store.nextSibling : null;
          evt.from.insertBefore(evt.item, referenceNode);
          if (remote !== this) {
            const remoteOptions = remote.props.options || {};

            if (typeof remoteOptions.group === 'object' && remoteOptions.group.pull === 'clone') {
              // Remove the node with the same data-reactid
              evt.item.parentNode.removeChild(evt.item);
            }
            if (remote.props.onChange) {
              remote.props.onChange(remoteItems, remote.sortable, evt);
            }
            // return
          }
          if (this.props.onChange) {
            this.props.onChange(items, this.sortable, evt);
          }
        }

        if (evt.type === 'move') {
          const [originalEvent] = params;
          const canMove = eventHandler ? eventHandler(evt, originalEvent) : true;
          return canMove;
        }

        // setTimeout(() => {
        if (eventHandler) {
          eventHandler(evt);
        }
        // }, 0);
      };
    });

    this.sortable = SortableJS.create(this.node, options);
  }

  shouldComponentUpdate(nextProps) {
    // If onChange is null, it is an UnControlled component
    // Don't let React re-render it by setting return to false
    if (!nextProps.onChange) {
      return false;
    }
    return true;
  }

  componentWillUnmount() {
    if (this.sortable) {
      this.sortable.destroy();
      this.sortable = null;
    }
  }

  render() {
    const { tag: Tag, options, onChange, ...props } = this.props;

    return (
      <Tag
        {...props}
        ref={node => {
          this.node = node;
        }}
      ></Tag>
    );
  }
}

export default Sortable;
