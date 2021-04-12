import { ActivatedRoute, Router } from "@angular/router";
import { of, throwError } from "rxjs";
import { NSDiscussData } from "../../models/discuss.model";
import { ConfigService } from "../../services/config.service";
import { DiscussionService } from "../../services/discussion.service";
import { TelemetryUtilsService } from "../../telemetry-utils.service";
import { DiscussCategoryComponent } from "./discuss-category.component"

describe('DiscussCategoryComponent', () => {
  let discussCategoryComponent: DiscussCategoryComponent

  const mockDiscussionService: Partial<DiscussionService> = {};
  const mockConfigService: Partial<ConfigService> = {};
  const mockRouter: Partial<Router> = {};
  const mockActivatedRoute: Partial<ActivatedRoute> = {};
  const mockTelemetryUtilsService: Partial<TelemetryUtilsService> = {};

  beforeAll(() => {
    discussCategoryComponent = new DiscussCategoryComponent(
        mockDiscussionService as DiscussionService,
        mockConfigService as ConfigService,
        mockRouter as Router,
        mockActivatedRoute as ActivatedRoute,
        mockTelemetryUtilsService as TelemetryUtilsService,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an instance of DiscussCategoryComponent', () => {
    expect(discussCategoryComponent).toBeTruthy();
  });

  describe('fetchAllAvailableCategories', () => {
    it('Should fetch all available categories', (done) => {
      // arrange
      const categoryResp = {
        name : 'name'
      } as any
      mockDiscussionService.fetchSingleCategoryDetails = jest.fn(() => of(categoryResp))
      // act
      discussCategoryComponent.fetchAllAvailableCategories(['some_cid'])
      // assert
      setTimeout(() => {
        expect(discussCategoryComponent.showLoader).toBe(false);
        expect(mockDiscussionService.fetchSingleCategoryDetails).toHaveBeenCalledWith('some_cid');
        expect(discussCategoryComponent.categories).toEqual([categoryResp]);
        done();
      });
    })

    it('Should handle failure scenarion while fetching categories', (done) => {
      // arrange
      mockDiscussionService.fetchSingleCategoryDetails = jest.fn(() => throwError({}))
      // act
      discussCategoryComponent.fetchAllAvailableCategories(['some_cid'])
      // assert
      setTimeout(() => {
        expect(discussCategoryComponent.showLoader).toBe(false);
        done();
      });
    })
  })

  describe('logTelemetry', () => {
    it('should log telemetry', () => {
      // arrange
      mockTelemetryUtilsService.logInteract = jest.fn();
      // act
      discussCategoryComponent.logTelemetry('some_event')
      // assert
      expect(mockTelemetryUtilsService.logInteract).toHaveBeenCalledWith(
        'some_event',
        NSDiscussData.IPageName.CATEGORY
      )
    })
  })

})