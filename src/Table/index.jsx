/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                    from 'react';
import PropTypes                from 'prop-types';

import { TableCell, TableRow }  from '../index';
import { buildRowsFromValues }  from './utils';
import ThemeContext             from '../Theming/ThemeContext';
import { createCssMap }         from '../Theming/createCss';

export default class Table extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Text alignment inside cells
         */
        align : PropTypes.oneOf( [
            'left', 'right', 'center', 'auto' ] ),
        /**
         *  Body Text style configuration
         */
        bodyTextProps : PropTypes.object,
        /**
         *  Display table with borders
         */
        borders       : PropTypes.oneOf( [
            'cells', 'rows', 'none', 'rowDivider', 'columnDivider' ] ),
        /**
         *  Table content (TableRows containing TableCells; overrides values)
         */
        children        : PropTypes.node,
        /**
         *  Extra CSS class name
         */
        className       : PropTypes.string,
        /**
         *  Array of objects defining the table columns
         */
        columns         : PropTypes.arrayOf( PropTypes.object ),
        /**
         *  Gutter size
         */
        gutters         : PropTypes.oneOf( [ 'S', 'M', 'L', 'none' ] ),
        /**
         *  Makes header row sticky
         */
        hasStickyHeader : PropTypes.bool,
        /**
         *  Header Text style configuration
         */
        headerTextProps : PropTypes.object,
        /**
         *  Display as zebra-striped
         */
        isZebra         : PropTypes.bool,
        /**
         *  onMouseOut callback function:
         *  ( e ) => { ... }
         */
        onMouseOut      : PropTypes.func,
        /**
         *  onMouseOver callback function:
         *  ( e ) => { ... }
         */
        onMouseOver     : PropTypes.func,
        /**
         *  Column sorter onToggle callback function: ( e ) => { ... }
         */
        onToggle        : PropTypes.func,
        /**
         *  Array of objects defining the table rows
         */
        rows            : PropTypes.arrayOf( PropTypes.object ),
        /**
         *  Row spacing
         */
        spacing         : PropTypes.oneOf( [ 'S', 'M', 'L', 'none' ] ),
        /**
         * 2D Array of table values (for convenience)
         */
        values          : PropTypes.arrayOf( PropTypes
            .arrayOf( PropTypes.string ) ),
        /**
         *  Vertical alignment inside cells
         */
        verticalAlign : PropTypes.oneOf( [ 'top', 'bottom', 'middle' ] ),
    };

    static defaultProps =
    {
        align           : 'auto',
        bodyTextProps   : undefined,
        borders         : 'none',
        children        : undefined,
        className       : undefined,
        columns         : undefined,
        gutters         : 'M',
        hasStickyHeader : false,
        headerTextProps : undefined,
        isZebra         : false,
        onMouseOut      : undefined,
        onMouseOver     : undefined,
        onToggle        : undefined,
        rows            : undefined,
        spacing         : 'M',
        values          : undefined,
        verticalAlign   : 'middle',
    };

    static displayName = 'Table';

    static didWarn = {};

    render()
    {
        const {
            align,
            bodyTextProps = {},
            borders,
            children,
            className,
            columns = [],
            cssMap = createCssMap( this.context.Table, this.props ),
            gutters,
            hasStickyHeader,
            headerTextProps = {},
            isZebra,
            onMouseOut,
            onMouseOver,
            onToggle,
            rows = [],
            spacing,
            values,
            verticalAlign,
        } = this.props;

        if ( !Table.didWarn.children && children !== undefined  )
        {
            React.Children.toArray( children ).map( ( child ) =>
            {
                if ( child.type !== TableRow )
                {
                    console.warn( 'Table must have TableRows as direct \
children' );
                    Table.didWarn.children = true;
                }
            } );
        }

        const body = React.Children.toArray( children ||
            buildRowsFromValues( values ) ).map( ( row, i ) =>
        {
            const cells = React.Children.toArray( row.props.children );

            const rowClass = i === 0 && columns.length < 1 ?
                cssMap.headerRow : cssMap.row;

            return React.cloneElement( row, {
                ...rows[ i ],
                align    : row.props.align || align,
                children : cells.map( ( cell, j ) =>
                {
                    const column      = columns[ j ];
                    const columnProps = column && {
                        align     : cell.props.align || column.align,
                        textProps : {
                            ...bodyTextProps,
                            ...column.textProps,
                            ...( rows[ i ] && rows[ i ].textProps ),
                            ...cell.props.textProps,
                        },
                        columnTitle : cell.props.columnTitle || column.title,
                        size        : cell.props.size || column.size,
                        isRowHeader : cell.props.isRowHeader ||
                            column.isRowHeader,
                        isSticky      : cell.props.isSticky || column.isSticky,
                        verticalAlign : cell.props.verticalAlign ||
                            column.verticalAlign,
                    };

                    return React.cloneElement( cell, {
                        ...columnProps,
                        className : cell.props.className ?
                            `${cell.props.className}  ${cssMap.cell}` :
                            cssMap.cell,
                    } );
                } ),
                className : row.props.className ?
                    `${row.props.className}  ${rowClass}` : rowClass,
                gutters       : row.props.gutters || gutters,
                spacing       : row.props.spacing || spacing,
                verticalAlign : row.props.verticalAlign || verticalAlign,
            } );
        } );


        return (
            <div
                className    = { cssMap.main }
                onMouseEnter = { onMouseOver }
                onMouseLeave = { onMouseOut }
                role         = "grid">
                { columns.length > 0 &&
                    <TableRow
                        align         = { align }
                        className     = { cssMap.headerRow }
                        gutters       = { gutters }
                        isSticky      = { hasStickyHeader }
                        spacing       = { spacing }
                        verticalAlign = { verticalAlign } >
                        { columns.map( ( column, i ) =>
                        {
                            const { title } = column;
                            const text  = title;
                            const stickyCell = column.isSticky;

                            return (
                                <TableCell
                                    align         = { column.align }
                                    className     = { cssMap.cell }
                                    isHeader
                                    isSortable    = { column.isSortable }
                                    isSticky      = { stickyCell }
                                    key           = { i }
                                    onToggle      = { onToggle }
                                    size          = { column.size }
                                    sort          = { column.sort }
                                    textProps     = { headerTextProps }
                                    verticalAlign = { column.verticalAlign }>
                                    { text }
                                </TableCell>
                            );
                        } ) }
                    </TableRow>
                }
                { body }
            </div>
        );
    }
}
