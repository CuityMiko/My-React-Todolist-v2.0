import React from 'react';
import PropTypes from 'prop-types';
export default class TodoInput extends React.Component {
    constructor() {
        super();
        this.state = {
            content: '',
            suspension: false,
            search_key: ''
        }
    }
    handleClick() {
        if (this.state.content === '') {
            console.log("没有任务");
            let t;
            clearTimeout(t); //清除掉上一次的t
            // 停止css3animation动画
            this.setState({
                suspension: true
            }, function() {
                t = setTimeout(() => {
                    this.setState({
                        suspension: false
                    })
                }, 2000);
            })
            return;
        }
        //这里应该采用正则表达式来解决
        if (this.props.onSubmit) {
            this.props.onSubmit({
                content: this.state.content,
                flag: true
            })
        }
        this.setState({
            content: ''
        })
    }
    handleChange(event) {
        if (event.target.value.length <= 40) {
            this.setState({
                content: event.target.value
            });
        } else {
            alert("大于40字");
        }
    }
    handleSearchChange(event) {
        this.setState({
            search_key: event.target.value
        })
    }
    handleKeyDownEnter(event) {
        event.stopPropagation();
        if (event.key === 'Enter') {
            this.handleClick();
        } else {
            return;
        }
    }
    handleClearAll() {
        if (this.props.onClearAll) {
            this.props.onClearAll();
        }
    }
    handleSearch() {
        if (this.props.onSearch) {
            this.props.onSearch(this.state.search_key);
        }
    }
    componentDidMount() {
        this.input.focus();
    }
    render() {
        return (
            <div className="input-all-wrapper" onKeyDown={this.handleKeyDownEnter.bind(this)}>
                <input className="input-input" onChange={this.handleChange.bind(this)}
            value={this.state.content} placeholder="今日计划"
            ref={(input) => {
                this.input = input
            }}/>
                <button className="button-send" onClick={this.handleClick.bind(this)}
            >Add</button>
                <input className="input-search" onChange={this.handleSearchChange.bind(this)}
            value={this.state.search_key}   placeholder="搜索计划"/>
                <button className="button-search" onClick={this.handleSearch.bind(this)}>Search</button>
                <button className="button-clear" onClick={this.handleClearAll.bind(this)}>Clear</button>
                {this.state.suspension ? (<div className="suspension">请输入内容</div>) : null}
            </div>
        )
    }
}

TodoInput.propTyeps = {
    onSubmit: PropTypes.func,
    onClearAll: PropTypes.func,
    onSearch: PropTypes.func
}