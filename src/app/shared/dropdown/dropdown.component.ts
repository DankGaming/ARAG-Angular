import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ContentChild,
	ContentChildren,
	ElementRef,
	forwardRef,
	Input,
	OnInit,
	QueryList,
	TemplateRef,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { DropdownOptionDirective } from "./dropdown-option.directive";
import { DropdownSelectedDirective } from "./dropdown-selected.directive";

@Component({
	selector: "app-dropdown",
	templateUrl: "./dropdown.component.html",
	styleUrls: ["./dropdown.component.scss"],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DropdownComponent),
			multi: true,
		},
	],
})
export class DropdownComponent
	implements OnInit, AfterViewInit, ControlValueAccessor {
	@Input() options: Array<any> = [];
	@Input() disabled: boolean = false;
	@Input() name: string;

	@ContentChild(DropdownSelectedDirective, { read: TemplateRef })
	dropdownSelectedTemplate: any;
	@ContentChild(DropdownOptionDirective, { read: TemplateRef })
	dropdownOptionTemplate: any;

	showDropdown: boolean = false;

	icons = { faChevronDown };

	selected: any;

	@Input() public set value(value: any) {
		if (!this.disabled) {
			this.selected = value;
			this.onChange(value);
		}
	}

	public get value(): any {
		return this.selected;
	}

	public onChange: any = () => {};
	public onTouch: any = () => {};

	constructor() {}

	ngOnInit(): void {}

	writeValue(obj: any): void {
		this.value = obj;
		console.log();
	}
	registerOnChange(fn: any): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}
	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	setOption(option: any): void {
		this.writeValue(option);
	}

	ngAfterViewInit(): void {
		console.log(this.dropdownSelectedTemplate);
	}
}
