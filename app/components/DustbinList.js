import React from 'react';
import DustbinContent from './DustbinContent';
import PropTypes from 'prop-types';

export default class DustbinList extends React.Component {
    static defaultProps = {
        contents: []
    }
    handleRestore(index) {
        if (this.props.onHandleRestore) {
            this.props.onHandleRestore(index);
        }
    }
    render() {
        return (<div className="dustbin-all-wrapper">
			{this.props.contents.map((obj, i) => {
                return <DustbinContent key={i} index={obj.index} content={obj.content}
                    onHandleRestore={this.handleRestore.bind(this)}
                    />
            })}
		</div>)
    }
}
DustbinList.propTypes = {
    contents: PropTypes.array,
    onHandleRestore: PropTypes.func
}