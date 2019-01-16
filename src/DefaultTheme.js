/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import classNames                from 'classnames/bind';

import datePickerClasses         from './DatePicker/datePicker.css';
import datePickerHeaderClasses   from './DatePicker/datePickerHeader.css';
import datePickerItemClasses     from './DatePicker/datePickerItem.css';
import dropdownClasses           from './Dropdown/dropdown.css';
import gridClasses               from './Grid/grid.css';
import gridItemClasses           from './GridItem/gridItem.css';
import iconButtonClasses         from './IconButton/iconButton.css';
import iconClasses               from './Icon/icon.css';
import inputFieldClasses         from './InputField/inputField.css';
import listBoxClasses            from './ListBox/listBox.css';
import listBoxOptionClasses      from './ListBox/listBoxOption.css';
import listBoxOptionGroupClasses from './ListBox/listBoxOptionGroup.css';
import scrollBarClasses          from './ScrollBar/scrollBar.css';
import scrollBoxClasses          from './ScrollBox/scrollBox.css';
import tabClasses                from './Tab/tab.css';
import tabButtonClasses          from './TabButton/tabButton.css';
import tabsClasses               from './Tabs/tabs.css';
import textClasses               from './Text/text.css';
import textInputWithIconClasses  from './TextInputWithIcon/textInputWithIcon.css';
import timeInputClasses          from './DatePicker/timeInput.css';
import tooltipClasses            from './Tooltip/tooltip.css';
import withDropdownClasses       from './Addons/withDropdown/withDropdown.css';


export default {
    DatePicker : {
        main : classNames.bind( datePickerClasses )( 'default' ),
        ...datePickerClasses,
    },
    DatePickerHeader : {
        main : classNames.bind( datePickerHeaderClasses )( 'default' ),
        ...datePickerHeaderClasses,
    },
    DatePickerItem : props => ( {
        main : classNames.bind( datePickerItemClasses )(
            'default',
            {
                disabled    : props.isDisabled,
                fakeHovered : props.forceHover,
                selected    : props.isSelected,
            },
            `type__${props.type}`,
            props.className,
        ),
        ...datePickerItemClasses,
    } ),
    TimeInput : props => ( {
        main : classNames.bind( timeInputClasses )(
            'default',
            { fakeHovered: props.forceHover },
            props.className,
        ),
        ...timeInputClasses,
    } ),
    Dropdown : props => ( {
        main : classNames.bind( dropdownClasses )(
            'default',
            { error: props.hasError },
            `padding__${props.padding}`,
            `size__${props.size}`,
            props.className,
        ),
        ...dropdownClasses,
    } ),
    Grid : props => ( {
        main : classNames.bind( gridClasses )(
            'default',
            `align__${props.align}`,
            `columnGap__${props.columnGap}`,
            `flow__${props.autoFlow}`,
            `justify__${props.justify}`,
            `rowGap__${props.rowGap}`,
            props.className,
        ),
        ...gridClasses,
    } ),
    GridItem : props => ( {
        main : classNames.bind( gridItemClasses )(
            'default',
            `align__${props.align}`,
            `justify__${props.justify}`,
            props.className,
        ),
        ...gridItemClasses,
    } ),
    Icon : props => ( {
        main : classNames.bind( iconClasses )(
            'default',
            `role__${props.role}`,
            `size__${props.size}`,
            props.className,
        ),
        ...iconClasses,
    } ),
    IconButton : props => ( {
        main : classNames.bind( iconButtonClasses )(
            'default',
            {
                background  : props.hasBackground,
                disabled    : props.isDisabled,
                fakeHovered : props.forceHover,
            },
            `role__${props.role}`,
            `size__${props.size}`,
            props.className,
        ),
        ...iconButtonClasses,
    } ),
    InputField : props => ( {
        main : classNames.bind( inputFieldClasses )(
            'default',
            {
                disabled    : props.isDisabled,
                error       : !props.isDisabled && props.hasError,
                fakeHovered : !props.isDisabled && props.forceHover,
                resizable   : props.element === 'textarea' && props.isResizable,
            },
            `align__${props.textAlign}`,
            props.className,
        ),
        ...inputFieldClasses,
    } ),
    ListBox : {
        main : classNames.bind( listBoxClasses )( 'default' ),
        ...listBoxClasses,
    },
    ListBoxOption : props => ( {
        main : classNames.bind( listBoxOptionClasses )(
            'default',
            {
                active          : props.isActive,
                disabled        : props.isDisabled,
                selected        : props.isSelected,
                withDescription : props.description,
            },
            props.className,
        ),
        ...listBoxOptionClasses,
    } ),
    ListBoxOptionGroup : {
        main : classNames.bind( listBoxOptionGroupClasses )( 'default' ),
        ...listBoxOptionGroupClasses,
    },
    ScrollBar : props => ( {
        main : classNames.bind( scrollBarClasses )(
            'default',
            `orientation__${props.orientation}`,
            props.className,
        ),
        ...scrollBarClasses,
    } ),
    ScrollBox : props => ( {
        main : classNames.bind( scrollBoxClasses )(
            'default',
            {
                scrollBarsAreVisible   : props.scrollBarsAreVisible,
                scrollIndicatorVariant : props.scrollIndicatorVariant,
            },
            `paddingX__${Array.isArray( props.padding ) ?
                props.padding[ 0 ] : props.padding}`,
            `paddingY__${Array.isArray( props.padding ) ?
                props.padding[ 1 ] : props.padding}`,
            `scroll__${props.scroll}`,
            props.className,
        ),
        ...scrollBoxClasses,
    } ),
    Tab : {
        main : classNames.bind( tabClasses )( 'default' ),
        ...tabClasses,
    },
    TabButton : props => ( {
        main : classNames.bind( tabButtonClasses )(
            'default',
            { active: props.isActive },
            props.className,
        ),
        ...tabButtonClasses,
    } ),
    Tabs : props =>  ( {
        main : classNames.bind( tabsClasses )(
            'default',
            `paddingX__${Array.isArray( props.padding ) ?
                props.padding[ 0 ] : props.padding}`,
            `paddingY__${Array.isArray( props.padding ) ?
                props.padding[ 1 ] : props.padding}`,
            props.className,
        ),
        ...tabsClasses,
    } ),
    Text : props => ( {
        main : classNames.bind( textClasses )(
            'default',
            {
                allCaps        : props.allCaps,
                noWrap         : props.noWrap,
                overflowHidden : props.overflowIsHidden,
            },
            `role__${props.role}`,
            `size__${props.size}`,
            `textAlign__${props.textAlign}`,
            `variant__${props.variant}`,
            props.className,
        ),
        ...textClasses,
    } ),
    TextInputWithIcon : props => ( {
        main : classNames.bind( textInputWithIconClasses )(
            'default',
            {
                disabled : props.isDisabled,
                error    : props.hasError,
            },
            `position__${props.iconPosition}`,
            props.className,
        ),
        ...textInputWithIconClasses,
    } ),
    Tooltip : props => ( {
        main : classNames.bind( tooltipClasses )(
            'default',
            { dismissible: props.isDismissible },
            `position__${props.position}`,
            `role__${props.role}`,
            props.className,
        ),
        ...tooltipClasses,
    } ),
    withDropdown : props => ( {
        main : classNames.bind( withDropdownClasses )(
            'default',
            { open: props.dropdownIsOpen },
            `position__${props.dropdownPosition}`,
            props.className,
        ),
        ...withDropdownClasses,
    } ),
};
