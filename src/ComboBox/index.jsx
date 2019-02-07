/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global document */

import React, { Component }                       from 'react';
import PropTypes                                  from 'prop-types';
import { escapeRegExp }                           from 'lodash';

import { ListBox, ScrollBox, Text }               from '..';

import TextInputWithIcon                          from '../TextInputWithIcon';
import withDropdown                               from '../Addons/withDropdown';
import { callMultiple, generateId }               from '../utils';
import { addPrefix, prefixOptions, removePrefix } from './utils';

const InputWithDropdown = withDropdown( TextInputWithIcon );


/**
 * ensures that a value is an array, wrapping as neccessary
 *
 * @param   {any}   arrOrVal array or value
 *
 * @return  {Array}
 */
function ensureArray( arrOrVal = [] )
{
    return Array.isArray( arrOrVal ) ? arrOrVal : [ arrOrVal ];
}

/**
 * gets the index of the option by the passed id
 *
 * @param {String} id id of the option
 * @param {Array} options Array of options
 *
 * @return {Number} index of the option
 */
function getIndex( id, options = [] )
{
    return options.findIndex( opt => opt.id === id );
}

/**
 * gets the option by the passed id
 *
 * @param {String} id id of the option
 * @param {Array} options Array of options
 *
 * @return {Object} option Object.
 */
function getOption( id, options = [] )
{
    return options.find( opt => opt.id === id );
}

/**
 * gives correct format to the filtered options
 *
 * @param {Array} filteredOptionsIds options ids after search filter
 * @param {Array} originalOptions original options
 *
 * @return {Array} formattedOptions filtered and formatted options
 */
function optionsFormatted( filteredOptionsIds, originalOptions )
{
    return originalOptions.reduce( ( formattedOptions, option ) =>
    {
        if ( option.options )
        {
            const sectionOptions = optionsFormatted(
                filteredOptionsIds,
                option.options,
            );

            if ( sectionOptions.length )
            {
                const newOptions = { ...option, options: sectionOptions };
                formattedOptions.push( newOptions );
            }
        }
        else if ( filteredOptionsIds.includes( option.id ) )
        {
            formattedOptions.push( option );
        }
        return formattedOptions;
    }, [] );
}

export default class ComboBox extends Component
{
    static propTypes =
    {
        /**
         *  Extra CSS class name
         */
        className    : PropTypes.string,
        /**
         *  Default selected option id(s) (when uncontrolled)
         */
        defaultValue : PropTypes.oneOfType(
            PropTypes.string,
            PropTypes.arrayOf( PropTypes.string ),
        ),
        /**
         * Placeholder text to show when no dropdown list options
         */
        dropdownPlaceholder : PropTypes.string,
        /**
         * Position of the dropdown relative to the text input
         */
        dropdownPosition    : PropTypes.oneOf( [ 'top', 'bottom' ] ),
        /**
         *  Display as error/invalid
         */
        hasError            : PropTypes.bool,
        /**
         *  Component id
         */
        id                  : PropTypes.string,
        /**
         *  Placeholder text
         */
        inputPlaceholder    : PropTypes.string,
        /**
         *  Display as disabled
         */
        isDisabled          : PropTypes.bool,
        /**
         *  Enables multi-select behavior
         */
        isMultiselect       : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly          : PropTypes.bool,
        /**
          *  input searchable
          */
        isSearchable        : PropTypes.bool,
        /**
         *  Change callback: ( { value } ) => ...
         */
        onChange            : PropTypes.func,
        /**
         *  Input field change callback: ( { value } ) => ...
         */
        onChangeInput       : PropTypes.func,
        /*
         * Dropdown list options
         */
        options             : PropTypes.arrayOf( PropTypes.object ),
        /**
         *  Selected option id(s)
         */
        value               : PropTypes.oneOfType(
            PropTypes.string,
            PropTypes.arrayOf( PropTypes.string ),
        ),
    };

    static defaultProps =
    {
        className           : undefined,
        defaultValue        : undefined,
        dropdownPlaceholder : undefined,
        dropdownPosition    : 'bottom',
        hasError            : false,
        id                  : undefined,
        inputPlaceholder    : undefined,
        isDisabled          : false,
        isMultiselect       : false,
        isReadOnly          : undefined,
        isSearchable        : false,
        onChange            : undefined,
        onChangeInput       : undefined,
        options             : undefined,
        value               : undefined,
    };

    inputRef = React.createRef();
    scrollBoxRef = React.createRef();
    wrapperRef = React.createRef();

    constructor( { defaultValue, isMultiselect } )
    {
        super();

        this.state = {
            activeOption    : undefined,
            filteredOptions : undefined,
            flatOptions     : undefined,
            id              : undefined,
            isOpen          : undefined,
            options         : undefined,
            searchValue     : undefined,
            selection       : isMultiselect ?
                ensureArray( defaultValue ) : defaultValue,
        };

        this.handleBlur            = this.handleBlur.bind( this );
        this.handleChangeInput     = this.handleChangeInput.bind( this );
        this.handleClick           = this.handleClick.bind( this );
        this.handleClickIcon       = this.handleClickIcon.bind( this );
        this.handleClickOption     = this.handleClickOption.bind( this );
        this.handleKeyDown         = this.handleKeyDown.bind( this );
        this.handleMouseOutOption  = this.handleMouseOutOption.bind( this );
        this.handleMouseOverOption = this.handleMouseOverOption.bind( this );
    }

    static getDerivedStateFromProps( props, state )
    {
        let { flatOptions } = state;
        if ( props.options && props.options !== state.options )
        {
            flatOptions = props.options.flatMap( o => o.options || o );
        }

        let { selection } = state;
        if ( props.value )
        {
            selection = props.value;
        }

        if ( props.isMultiselect )
        {
            selection = ensureArray( selection );
        }

        const filteredOptions = state.searchValue && (
            flatOptions.filter( ( { text } ) => (
                text.match( new RegExp(
                    escapeRegExp( state.searchValue ),
                    'i',
                ) )
            ) )
        );

        const activeOption = ( state.searchValue && filteredOptions.length ) ?
            filteredOptions[ 0 ].id : state.activeOption;

        return {
            activeOption,
            flatOptions,
            filteredOptions,
            id      : props.id || state.id || generateId( 'ComboBox' ),
            options : props.options,
            selection,
        };
    }

    componentDidUpdate()
    {
        const { current: scrollBoxRef } = this.scrollBoxRef;
        const { activeOption, id } = this.state;

        if ( scrollBoxRef && activeOption )
        {
            const activeEl =
                document.getElementById( addPrefix( activeOption, id ) );

            if ( activeEl &&
                scrollBoxRef.scrollHeight > scrollBoxRef.offsetHeight )
            {
                const pos        = activeEl.offsetTop;
                const elHeight   = activeEl.offsetHeight;
                const contHeight = scrollBoxRef.offsetHeight;

                const min = scrollBoxRef.scrollTop;
                const max = min + ( scrollBoxRef.offsetHeight - elHeight );

                if ( pos < min )
                {
                    scrollBoxRef.scrollTop = pos;
                }
                else if ( pos > max )
                {
                    scrollBoxRef.scrollTop = pos - ( contHeight - elHeight );
                }
            }
        }
    }

    focus()
    {
        this.inputRef.current.focus();
    }


    handleChangeInput( { value }, ...args )
    {
        const { onChangeInput } = this.props;
        if ( typeof onChangeInput === 'function' )
        {
            onChangeInput( { value }, ...args );
        }

        this.setState( { searchValue: value } );
    }

    handleClickIcon()
    {
        this.focus();
        this.setState( prevState => ( { isOpen: !prevState.isOpen } ) );
    }

    handleClick()
    {
        this.setState( { isOpen: true  } );
    }

    handleClickOption( { id: prefixedId } )
    {
        this.setState( ( { id, selection } ) =>
        {
            const optId = removePrefix( prefixedId, id );
            const { isMultiselect, onChange } = this.props;
            let newSelection = optId;
            if ( isMultiselect )
            {
                newSelection = selection.includes( optId ) ?
                    selection.filter( item => item !== optId ) :
                    [ ...selection, optId ];
            }

            if ( typeof onChange === 'function' )
            {
                onChange( { value: newSelection } );
            }

            return {
                activeOption    : optId,
                filteredOptions : undefined,
                isOpen          : false,
                searchValue     : '',
                selection       : newSelection,
            };
        } );
    }

    handleKeyDown( { key, preventNessieDefault } )
    {
        if ( key === 'ArrowUp' || key === 'ArrowDown' )
        {
            preventNessieDefault();

            this.setState( prevState =>
            {
                const options = prevState.filteredOptions ||
                    prevState.flatOptions;

                if ( prevState.isOpen && options.length )
                {
                    const minIndex = 0;
                    const maxIndex = options.length - 1;

                    let activeIndex = getIndex(
                        prevState.activeOption,
                        options,
                    );

                    activeIndex = key === 'ArrowUp' ?
                        Math.max( activeIndex - 1, minIndex ) :
                        Math.min( activeIndex + 1, maxIndex );

                    return {
                        activeOption : options[ activeIndex ].id,
                    };
                }

                return { isOpen: true };
            } );
        }
        else if ( key === 'Escape' )
        {
            this.setState( {
                activeOption    : undefined,
                filteredOptions : undefined,
                isOpen          : false,
                searchValue     : undefined,
            } );
        }
        else if ( key === 'Enter' )
        {
            if ( !this.props.isReadOnly )
            {
                this.setState( ( { activeOption, isOpen, selection } ) =>
                {
                    let newSelection = activeOption;
                    if ( newSelection && this.props.isMultiselect )
                    {
                        newSelection = selection.includes( newSelection ) ?
                            selection.filter( item => item !== newSelection ) :
                            [ ...selection, newSelection ];
                    }
                    newSelection = newSelection || selection;

                    const { onChange } = this.props;
                    if ( typeof onChange === 'function' )
                    {
                        onChange( { value: newSelection } );
                    }

                    return {
                        activeOption    : undefined,
                        filteredOptions : undefined,
                        isOpen          : !isOpen,
                        searchValue     : '',
                        selection       : newSelection,
                    };
                } );
            }
        }
    }

    handleMouseOutOption()
    {
        this.setState( { activeOption: undefined } );
    }

    handleMouseOverOption( { id : optId } )
    {
        const { id } = this.state;
        const unprefixedId = removePrefix( optId, id );

        this.setState( prevState =>
        {
            const activeOption = getOption(
                unprefixedId,
                prevState.flatOptions,
            ).id;
            return { activeOption };
        } );
    }

    handleBlur()
    {
        this.setState( {
            activeOption    : undefined,
            isOpen          : false,
            filteredOptions : undefined,
            searchValue     : undefined,
        } );
    }

    render()
    {
        const {
            className,
            dropdownPlaceholder,
            dropdownPosition,
            hasError,
            inputPlaceholder,
            isDisabled,
            isMultiselect,
            isReadOnly,
            isSearchable,
            options,
        } = this.props;

        const {
            activeOption,
            filteredOptions,
            flatOptions,
            id,
            isOpen,
            searchValue,
            selection,
        } = this.state;

        let selectedOption = getOption( selection, flatOptions );
        let selectedText = selectedOption ? selectedOption.text : '';

        if ( isMultiselect )
        {
            if ( selection.length === 1 )
            {
                selectedOption = getOption( selection[ 0 ], flatOptions );
                selectedText = selectedOption ? selectedOption.text : '';
            }
            else if ( selection.length > 1 )
            {
                selectedText =
                    selection.length && `(${selection.length} items selected)`;
            }
        }

        let optionsToShow = options;

        if ( filteredOptions )
        {
            optionsToShow = optionsFormatted(
                filteredOptions.map( option => option.id ),
                options,
            );
        }

        let dropdownContent;

        if ( optionsToShow.length )
        {
            dropdownContent = (
                <ScrollBox
                    height       = "50vh"
                    scroll       = "vertical"
                    scrollBoxRef = { this.scrollBoxRef }>
                    <ListBox
                        activeOption      = { addPrefix( activeOption, id ) }
                        id                = { addPrefix( 'listbox', id ) }
                        isFocusable       = { false }
                        isMultiselect     = { isMultiselect }
                        onClickOption     = { !isReadOnly &&
                            this.handleClickOption }
                        onMouseOutOption  = { this.handleMouseOutOption }
                        onMouseOverOption = { this.handleMouseOverOption }
                        options           = {
                            prefixOptions( optionsToShow, id )
                        }
                        selection = { isMultiselect ? selection.map( optId =>
                            addPrefix( optId, id ) ) :
                            addPrefix( selection, id )
                        } />
                </ScrollBox>
            );
        }
        else
        {
            dropdownContent = (
                <Text
                    noWrap
                    overflowIsHidden
                    role    = "subtle"
                    variant = "RegularIt">
                    { dropdownPlaceholder }
                </Text>
            );
        }

        return (
            <InputWithDropdown
                aria = { {
                    activeDescendant :
                        activeOption && addPrefix( activeOption, id ),
                    autocomplete : 'list',
                    expanded     : isOpen,
                    hasPopup     : 'listbox',
                    owns         : addPrefix( 'listbox', id ),
                    role         : 'combobox',
                } }
                autoCapitalize   = "off"
                autoComplete     = "off"
                autoCorrect      = "off"
                className        = { className }
                dropdownIsOpen   = { isOpen }
                dropdownPosition = { dropdownPosition }
                dropdownProps    = { {
                    children : dropdownContent,
                    hasError,
                    padding  : optionsToShow.length ? 'none' : 'S',
                } }
                hasError      = { hasError }
                iconType      = { isOpen ? 'up' : 'down' }
                id            = { id }
                inputRef      = { this.inputRef }
                isDisabled    = { isDisabled }
                isReadOnly    = { !isSearchable || !isOpen }
                onBlur        = { callMultiple( this.handleBlur, this.props.onBlur ) } // temporary fix
                onChangeInput = { this.handleChangeInput } // temporary fix
                onClick       = { callMultiple( this.handleClick, this.props.onClick ) } // temporary fix
                onClickIcon   = { this.handleClickIcon }
                onFocus       = { this.props.onFocus } // temporary fix
                onKeyDown     = { callMultiple( this.handleKeyDown, this.props.onKeyDown ) } // temporary fix
                placeholder   = { inputPlaceholder }
                spellCheck    = { false }
                value         = { ( isOpen && isSearchable ) ?
                    searchValue : selectedText
                }
                wrapperRef = { this.wrapperRef } />
        );
    }
}
