import { Attribute, Component, OnInit } from '@angular/core';
import { DesignSystemService } from './services/design-system.service';
import { ColorProperties } from './models/colors';
import { ButtonProperties, LayoutProperties, PrimaryProperties, SecondaryProperties } from './models/button';

declare const shiki:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Design System API';

  data_colors!: ColorProperties[];

  data_button!: ButtonProperties[];
  data_buttonLayoutConf!: LayoutProperties[];
  data_buttonPrimaryConf!: PrimaryProperties[];
  data_buttonSecondaryConf!: SecondaryProperties[];

  constructor(private design_system_service: DesignSystemService) {}

  ngOnInit(): void {
    this.getDataColors();
    this.getButtonConf();
    this.shikiConfiguration();
  }

  getDataColors() {
    this.design_system_service.getColors().subscribe(res => {
      this.data_colors = res.colors;
    });
  }

  getButtonConf() {
    this.design_system_service.getButton().subscribe(res => {
      this.data_button = res.data;
      this.distributeButtonConfData(this.data_button);
    });
  }

  distributeButtonConfData(data_button: ButtonProperties[]) {
    for (let i = 0; i < data_button.length; i++) {
      this.data_buttonLayoutConf = data_button[i].layout;
      this.data_buttonPrimaryConf = data_button[i].primary;
      this.data_buttonSecondaryConf= data_button[i].secondary;
    }
  }

  shikiConfiguration() {
    shiki.getHighlighter({
      theme: 'nord',
      langs: ['js'],
    }).then((highlighter:any) => {
      const code = highlighter.codeToHtml(`
      {
        "colors": [
            { "label"   : "${this.data_colors[0].label}",    "value" : "${this.data_colors[0].value}" },
            { "label"   : "${this.data_colors[1].label}",  "value" : "${this.data_colors[1].value}" },
            { "label"   : "${this.data_colors[2].label}",   "value" : "${this.data_colors[2].value}" }
        ]
      }`, { lang: 'js' });
      document.getElementById('outputColors')!.innerHTML = code;
    });

    shiki.getHighlighter({
      theme: 'nord',
      langs: ['js'],
    }).then((highlighter:any) => {
      const code = highlighter.codeToHtml(`
      {
        "data": [
          {
            "layout": [
              { "width": "max-content" },
              { "height": "32px" },
              { "padding": "8px 24px" },
              { "borderRadius": "20px" }
            ],
            "primary": [
              { "color": "white" },
              { "backgroundColor": "primary-100" }
            ],
            "secondary": [
              { "color": "primary-100" },
              { "backgroundColor": "transparent" },
              { "borderColor": "secondary-100" }
            ]
          }
        ]
      }
      `, { lang: 'js' });
      document.getElementById('outputButton')!.innerHTML = code;
    });
  }

}
