import { AfterViewInit, Component, ContentChild, ElementRef, forwardRef, Input, OnInit, Renderer2, Self, TemplateRef } from "@angular/core";
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { RadioOptionDirective } from "./radio-option.directive";

@Component({
	selector: "app-radio",
	templateUrl: "./radio.component.html",
    styleUrls: ["./radio.component.scss"],
    providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RadioComponent),
			multi: true,
		},
	],
})
export class RadioComponent<T> implements OnInit, AfterViewInit, ControlValueAccessor {
    @Input() options: T[] = [];
    @Input() disabled: boolean = false;
    @Input() name: string;

    @Input() public set value(value: T) {
        if (!this.disabled) {
            this.selected = value;
            this.onChange(value);
        }
    }

    obj: any;
    
    @ContentChild(RadioOptionDirective, { read: TemplateRef })
	radioOptionTemplate: TemplateRef<RadioOptionDirective>;

    selected: T;

    constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

    public onChange: any = () => {};
    public onTouch: any = () => {};
    
    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            console.log(this.value)
        }, 500)
    }

    public get value(): T {
		return this.selected;
	}
    
    writeValue(obj: any): void {
        this.value = obj;
        const state = obj == this.options[0];
        console.log(state)
        this.renderer.setProperty(this.elementRef.nativeElement, 'checked', true);
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

    setOption(option: T): void {
		this.writeValue(option);
	}
}
