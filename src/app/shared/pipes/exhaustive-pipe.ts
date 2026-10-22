import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exhaustive',
})
export class ExhaustivePipe implements PipeTransform {
  transform(value: never, message = 'Invalid value'): never {
    throw new Error(message);
  }
}

// function transform(value: never, message = 'Invalid value'): never {
//   throw new Error(message);
// }

// function test() {
//   transform([][0]);

//   // Unreachable code detected.
//   const x = 1;
//   x.toExponential();
// }
