import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "truncate",
})
export class TruncatePipe implements PipeTransform {
	transform(value: string, characters: number): string {
		if (!value) return value;

		return value.length <= characters
			? value
			: `${value.substr(0, characters)}...`;
	}
}
