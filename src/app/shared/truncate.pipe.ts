import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "truncate",
})
export class TruncatePipe implements PipeTransform {
	transform(value: any, characters: number) {
		return value.length <= characters
			? value
			: value.substr(0, characters) + "...";
	}
}
