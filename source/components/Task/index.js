// Core
import React, { PureComponent } from 'react';
import classNames from 'classnames';

// Instruments
import Styles from './styles.m.css';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';

export default class Task extends PureComponent {
    taskInput = React.createRef();

    state = {
        isTaskEditing: false,
        newMessage: this.props.message,
    };


    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
        }) => ({
            id,
            completed,
            favorite,
            message,
        });

    _setTaskEditingState = (isTaskEditing = true) => {
        this.taskInput.current.disabled = !isTaskEditing;

        if (isTaskEditing) {
            this.taskInput.current.focus();
        }

        this.setState({
            isTaskEditing,
        });
    };

    _updateNewTaskMessage = (event) => {
        const { value } = event.target;
        this.setState({ newMessage: value });
    };

    _updateTask = () => {
        const { message,
            _updateTaskAsync } = this.props;
        const { newMessage } = this.state;

        this._setTaskEditingState(false);

        if (message !== newMessage) {
            _updateTaskAsync(
                this._getTaskShape({
                    message: newMessage,
                })
            );
        }
        return null;
    };

    _updateTaskMessageOnClick = () => {
        const { isTaskEditing } = this.state;

        if (isTaskEditing) {
            this._updateTask();

            return null;
        }

        this._setTaskEditingState(true);

    };

    _cancelUpdatingTaskMessage = () => {
        const { message: newMessage } = this.props;

        this._setTaskEditingState(false);

        this.setState({
            newMessage,
        });
    };

    _updateTaskMessageOnKeyDown = (event) => {
        const escapeKey = event.key === "Escape";
        const enterKey = event.key === "Enter";
        const { newMessage } = this.state;

        if (!newMessage) {
            return null;
        }

        if (enterKey) {
            this._updateTask();
        }

        if (escapeKey) {
            this._cancelUpdatingTaskMessage();
        }
    };

    _toggleTaskCompletedState = () => {
        const {  _updateTaskAsync, completed, } = this.props;

        _updateTaskAsync(
            this._getTaskShape({ completed: !completed })
        );

    };

    _toggleTaskFavoriteState = () => {
        const {_updateTaskAsync, favorite } = this.props;


        _updateTaskAsync(
            this._getTaskShape({ favorite: !favorite })
        );

    };

    _removeTask = () => {
        const { id, _removeTaskAsync } = this.props;

       return _removeTaskAsync(id);
    };

    render () {
        const { newMessage, isTaskEditing } = this.state;
        const { completed, favorite, } = this.props;

        const style = classNames(Styles.task, {
            [Styles.completed]: completed,
        });

        return (
            <li className = { style }>
                <div className = { Styles.content }>
                    <Checkbox
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        inlineBlock
                        height = { 25 }
                        width = { 25 }
                        onClick = { this._toggleTaskCompletedState }
                    />
                    <input type="text"
                           disabled
                           maxLength = { 50 }
                           ref = { this.taskInput }
                           onKeyDown = { this._updateTaskMessageOnKeyDown }
                           onChange = { this._updateNewTaskMessage }
                           value = { newMessage }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        inlineBlock
                        height = { 19 }
                        width = { 19 }
                        onClick = { this._toggleTaskFavoriteState }
                    />
                    <Edit
                        checked = { isTaskEditing }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        inlineBlock
                        height = { 19 }
                        width = { 19 }
                        onClick = { this._updateTaskMessageOnClick }
                    />
                    <Remove
                        className = { Styles.removeTask }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        inlineBlock
                        height = { 17 }
                        width = { 17 }
                        onClick = { this._removeTask }
                    />
                </div>
            </li>
        )
    }
}
