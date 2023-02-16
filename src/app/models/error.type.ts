export class VisibleError {
  id: number | undefined;
  message: string;
  action: string;
  givenDuration: number | undefined;
  constructor(
    message: string,
    action: string,
    givenDuration?: number,
    id?: number
  ) {
    this.id = id;
    this.message = message;
    this.action = action;
    this.givenDuration = givenDuration;
  }
}
