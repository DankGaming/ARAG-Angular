import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
	selector: "app-toggle",
	templateUrl: "./toggle.component.html",
	styleUrls: ["./toggle.component.scss"],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ToggleComponent),
			multi: true,
		},
	],
})
export class ToggleComponent implements OnInit, ControlValueAccessor {
	@Input() name: string;
	@Input() disabled: boolean = false;

	@Input()
	public set value(isChecked: boolean) {
		if (this.disabled) return;
		this.isChecked = isChecked;
		this.onChange(isChecked);
	}

	public get value(): boolean {
		return this.isChecked;
	}

	isChecked: boolean;

	constructor() {}

	public onChange: any = () => {};
	public onTouch: any = () => {};

	ngOnInit(): void {}

	registerOnChange = (fn: any): void => (this.onChange = fn);

	writeValue = (obj: any): void => (this.value = obj);

	registerOnTouched = (fn: any): void => (this.onTouch = fn);

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}
}
