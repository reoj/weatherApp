import { CurrentConditionData } from 'src/app/models/weatherReport.type';
import { Component, Input } from '@angular/core';
import { CurrentConditionUIModel } from 'src/app/models/ui.type';

@Component({
  selector: 'current-condition-card',
  templateUrl: './current-condition-card.component.html',
  styleUrls: ['./current-condition-card.component.css'],
})
export class CurrentConditionCardComponent {
  @Input() condition = new CurrentConditionUIModel();
}
