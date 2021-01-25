import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "htmlStripper"
})
export class HtmlStripperPipe implements PipeTransform {
    transform(value: string): any {
        return value.replace(/<.*?>/g, ""); // replace tags
    }
}
