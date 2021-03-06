import { TestBed } from '@angular/core/testing';

import { GoogleChartsModule } from './google-charts.module';
import { GoogleChartsConfig } from './models/google-charts-config.model';
import { GOOGLE_CHARTS_CONFIG } from './models/injection-tokens.model';
import { ScriptLoaderService } from './script-loader/script-loader.service';

describe('GoogleChartsModule', () => {
  let service: ScriptLoaderService;

  describe('direct import', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GoogleChartsModule]
      });
    });

    it('should allow instantiation of `ScriptLoaderService`', () => {
      service = TestBed.inject(ScriptLoaderService);
      expect(service).toBeTruthy();
    });
  });

  describe('config via forRoot', () => {
    const mapsApiKey = 'myMapsApiKey';
    const version = '13.5';
    const safeMode = false;

    it('should provide the given config values', () => {
      const config: GoogleChartsConfig = { mapsApiKey, version, safeMode };

      TestBed.configureTestingModule({
        imports: [GoogleChartsModule.forRoot(config)]
      });

      expect(TestBed.inject(GOOGLE_CHARTS_CONFIG)).toEqual(config);
    });

    it('should accept empty config', () => {
      TestBed.configureTestingModule({
        imports: [GoogleChartsModule.forRoot()]
      });

      expect(TestBed.inject(GOOGLE_CHARTS_CONFIG)).toEqual({});
    });

    it('should accept a partial config', () => {
      TestBed.configureTestingModule({
        imports: [GoogleChartsModule.forRoot({ mapsApiKey })]
      });

      expect(TestBed.inject(GOOGLE_CHARTS_CONFIG)).toMatchObject({ mapsApiKey });
    });
  });
});
