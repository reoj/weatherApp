import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const FadeFromTopAnimation = trigger('fade', [
  state('void', style({ opacity: 0, transform: 'translateY(-10%)' })),
  state('in', style({ opacity: 1, transform: 'translateY(0)' })),
  transition('void => in', [animate("400ms cubic-bezier(0.0, 0.0, 0.2, 1)")]),
  transition('in => void', [animate("400ms cubic-bezier(0.4, 0.0, 1, 1)")]),
]);

export const FadeFromUnderAnimation = trigger('fade', [
    state('void', style({ opacity: 0, transform: 'translateY(10%)' })),
    state('in', style({ opacity: 1, transform: 'translateY(0)' })),
    transition('void => in', [animate("400ms cubic-bezier(0.0, 0.0, 0.2, 1)")]),
    transition('in => void', [animate("400ms cubic-bezier(0.4, 0.0, 1, 1)")]),
  ]);