import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "truncate",
})
export class TruncatePipe implements PipeTransform {
	transform(value: string, characters: number): string {
		return value.length <= characters
			? value
			: `${value.substr(0, characters)}...`;
	}
}
