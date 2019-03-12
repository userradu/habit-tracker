import { TestBed } from '@angular/core/testing';

import { DashboardMenuData.Service.TsService } from './dashboard-menu-data.service.ts.service';

describe('DashboardMenuData.Service.TsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardMenuData.Service.TsService = TestBed.get(DashboardMenuData.Service.TsService);
    expect(service).toBeTruthy();
  });
});
