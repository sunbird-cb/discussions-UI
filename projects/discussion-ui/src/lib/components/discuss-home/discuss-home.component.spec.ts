import { ActivatedRoute, Router } from "@angular/router";
import { of, throwError } from "rxjs";
import { NSDiscussData } from "../../models/discuss.model";
import { ConfigService } from "../../services/config.service";
import { DiscussionService } from "../../services/discussion.service";
import { TelemetryUtilsService } from "../../telemetry-utils.service";
import { DiscussHomeComponent } from "./discuss-home.component"

describe('DiscussHomeComponent', () => {
  let discussHomeComponent: DiscussHomeComponent

  const mockDiscussionService: Partial<DiscussionService> = {};
  const mockConfigService: Partial<ConfigService> = {};
  const mockRouter: Partial<Router> = {};
  const mockActivatedRoute: Partial<ActivatedRoute> = {};
  const mockTelemetryUtilsService: Partial<TelemetryUtilsService> = {};

  beforeAll(() => {
    discussHomeComponent = new DiscussHomeComponent(
      mockRouter as Router,
      mockActivatedRoute as ActivatedRoute,
      mockDiscussionService as DiscussionService,
      mockConfigService as ConfigService,
      mockTelemetryUtilsService as TelemetryUtilsService,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an instance of DiscussHomeComponent', () => {
    expect(discussHomeComponent).toBeTruthy();
  });

})