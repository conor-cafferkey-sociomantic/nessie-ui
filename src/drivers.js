import { ComponentDriver } from 'componentDriver';
import {
    Button,
    CheckableGroup,
    Checkbox,
    CheckboxGroup,
    CodeEditor,
    ComboBox,
    DatePicker,
    DateTimeInput,
    FlounderDropdown,
    Form,
    IconButton,
    IconWithTooltip,
    InputField,
    ListBox,
    ModalDialog,
    Module,
    NavItem,
    NotificationBar,
    Paginator,
    PasswordInput,
    Radio,
    RadioGroup,
    ScrollBar,
    ScrollBox,
    Slider,
    SliderGroup,
    Sorter,
    Switch,
    TabButton,
    Tabs,
    TagInput,
    TextInput,
    Tooltip,
    ToggleButton,
    Uploader,
} from 'nessie-ui';

import ButtonDriver            from './Button/driver';
import CheckableGroupDriver    from './CheckableGroup/driver';
import CheckboxDriver          from './Checkbox/driver';
import CodeEditorDriver        from './CodeEditor/driver';
import ComboBoxDriver          from './ComboBox/driver';
import DatePickerDriver        from './DatePicker/driver';
import DateTimeInputDriver     from './DateTimeInput/driver';
import FlounderDropdownDriver  from './FlounderDropdown/driver';
import FormDriver              from './Form/driver';
import IconWithTooltipDriver   from './IconWithTooltip/driver';
import InputFieldDriver        from './InputField/driver';
import ListBoxDriver           from './ListBox/driver';
import ModalDialogDriver       from './ModalDialog/driver';
import ModuleDriver            from './Module/driver';
import NavItemDriver           from './NavItem/driver';
import NotificationBarDriver   from './NotificationBar/driver';
import PaginatorDriver         from './Paginator/driver';
import PasswordInputDriver     from './PasswordInput/driver';
import RadioGroupDriver        from './RadioGroup/driver';
import ScrollBarDriver         from './ScrollBar/driver';
import ScrollBoxDriver         from './ScrollBox/driver';
import SliderDriver            from './Slider/driver';
import SliderGroupDriver       from './SliderGroup/driver';
import SorterDriver            from './Sorter/driver';
import SwitchDriver            from './Switch/driver';
import TabButtonDriver         from './TabButton/driver';
import TabsDriver              from './Tabs/driver';
import TagInputDriver          from './TagInput/driver';
import TextInputDriver         from './TextInput/driver';
import TooltipDriver           from './Tooltip/driver';
import UploaderDriver          from './Uploader/driver';


const drivers =
[
    {
        Component : Button,
        Driver    : ButtonDriver,
    },
    {
        Component : CheckableGroup,
        Driver    : CheckableGroupDriver,
    },
    {
        Component : Checkbox,
        Driver    : CheckboxDriver,
    },
    {
        Component : CheckboxGroup,
        Driver    : CheckableGroupDriver,
    },
    {
        Component : CodeEditor,
        Driver    : CodeEditorDriver,
    },
    {
        Component : ComboBox,
        Driver    : ComboBoxDriver,
    },
    {
        Component : DatePicker,
        Driver    : DatePickerDriver,
    },
    {
        Component : DateTimeInput,
        Driver    : DateTimeInputDriver,
    },
    {
        Component : FlounderDropdown,
        Driver    : FlounderDropdownDriver,
    },
    {
        Component : Form,
        Driver    : FormDriver,
    },
    {
        Component : IconButton,
        Driver    : ButtonDriver,
    },
    {
        Component : IconWithTooltip,
        Driver    : IconWithTooltipDriver,
    },
    {
        Component : InputField,
        Driver    : InputFieldDriver,
    },
    {
        Component : ListBox,
        Driver    : ListBoxDriver,
    },
    {
        Component : ModalDialog,
        Driver    : ModalDialogDriver,
    },
    {
        Component : Module,
        Driver    : ModuleDriver,
    },
    {
        Component : NavItem,
        Driver    : NavItemDriver,
    },
    {
        Component : NotificationBar,
        Driver    : NotificationBarDriver,
    },
    {
        Component : Paginator,
        Driver    : PaginatorDriver,
    },
    {
        Component : PasswordInput,
        Driver    : PasswordInputDriver,
    },
    {
        Component : Radio,
        Driver    : CheckboxDriver,
    },
    {
        Component : RadioGroup,
        Driver    : RadioGroupDriver,
    },
    {
        Component : ScrollBar,
        Driver    : ScrollBarDriver,
    },
    {
        Component : ScrollBox,
        Driver    : ScrollBoxDriver,
    },
    {
        Component : Slider,
        Driver    : SliderDriver,
    },
    {
        Component : SliderGroup,
        Driver    : SliderGroupDriver,
    },
    {
        Component : Sorter,
        Driver    : SorterDriver,
    },
    {
        Component : Switch,
        Driver    : SwitchDriver,
    },
    {
        Component : TabButton,
        Driver    : TabButtonDriver,
    },
    {
        Component : Tabs,
        Driver    : TabsDriver,
    },
    {
        Component : TagInput,
        Driver    : TagInputDriver,
    },
    {
        Component : TextInput,
        Driver    : TextInputDriver,
    },
    {
        Component : Tooltip,
        Driver    : TooltipDriver,
    },
    {
        Component : ToggleButton,
        Driver    : ButtonDriver,
    },
    {
        Component : Uploader,
        Driver    : UploaderDriver,
    },
];

export default ComponentDriver.createDriverSuite( drivers );
