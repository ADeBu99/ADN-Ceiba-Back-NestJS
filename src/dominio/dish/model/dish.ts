export class Dish {
  readonly #title: string;
  readonly #description: string;
  readonly #price: number;
  readonly #image: string;
  readonly #group: number;

  constructor(title: string, description: string, price: number, image: string, group: number) {
    this.#title = title;
    this.#description = description;
    this.#price = price;
    this.#image = image;
    this.#group = group;
  }

  get title(): string {
    return this.#title;
  }

  get description(): string {
    return this.#description;
  }

  get price(): number {
    return this.#price;
  }

  get image(): string {
    return this.#image;
  }

  get group(): number {
    return this.#group;
  }
}
