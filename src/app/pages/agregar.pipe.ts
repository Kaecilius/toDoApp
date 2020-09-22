import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agregar'
})
export class AgregarPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
