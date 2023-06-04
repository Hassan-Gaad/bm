import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { symbols } from '@bm/currency';

@Component({
  selector: 'bm-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private router: Router
  ) {
    iconRegistry.addSvgIcon(
      'mony',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/images/mony.svg')
    );
  }

  navigateToDetails(base: string, target: string) {
    this.router.navigate(['details', { from: base, to: target }], {
      state: {
        fullName: symbols[base],
      },
    });
  }
}
