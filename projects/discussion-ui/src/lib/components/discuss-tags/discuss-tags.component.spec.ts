import { ActivatedRoute, Router } from "@angular/router";
import { of, throwError } from "rxjs";
import { NSDiscussData } from "../../models/discuss.model";
import { ConfigService } from "../../services/config.service";
import { DiscussUtilsService } from "../../services/discuss-utils.service";
import { DiscussionService } from "../../services/discussion.service";
import { TelemetryUtilsService } from "../../telemetry-utils.service";
import { DiscussTagsComponent } from "./discuss-tags.component"

describe('DiscussCategoryComponent', () => {
  let discusstagsComponent: DiscussTagsComponent

  const mockDiscussionService: Partial<DiscussionService> = {};
  const mockConfigService: Partial<ConfigService> = {};
  const mockRouter: Partial<Router> = {};
  const mockActivatedRoute: Partial<ActivatedRoute> = {};
  const mockTelemetryUtilsService: Partial<TelemetryUtilsService> = {
    setContext: jest.fn(),
    logImpression: jest.fn()
  };
  const mockDiscussUtilsService: Partial<DiscussUtilsService> = {};


  beforeAll(() => {
    discusstagsComponent = new DiscussTagsComponent(
      mockDiscussionService as DiscussionService,
      mockTelemetryUtilsService as TelemetryUtilsService,
      mockRouter as Router,
      mockActivatedRoute as ActivatedRoute,
      mockConfigService as ConfigService,
      mockDiscussUtilsService as DiscussUtilsService
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should create an instance of DiscussCategoryComponent', () => {
    expect(discusstagsComponent).toBeTruthy();
  });

  // describe('ngOnInit', () => {
  //   it('should call navigateToDiscussionPage', () => {
  //     // arrange
  //     const params = {
  //       categories: 'some_categories'
  //     } as any
  //     mockConfigService.getConfig = jest.fn(() => params)
  //     jest.spyOn(discusstagsComponent, 'fetchAllTags').mockImplementation();
  //     // act
  //     discusstagsComponent.ngOnInit();
  //     // assert
  //     expect(mockTelemetryUtilsService.logImpression).toHaveBeenCalledWith(NSDiscussData.IPageName.TAGS);
  //     expect(mockTelemetryUtilsService.setContext).toHaveBeenCalledWith([]);
  //     expect(discusstagsComponent.fetchAllTags).toHaveBeenCalled();
  //   });
  // });

  describe('fetchAllTags', () => {
    it('should fetch all tags', (done) => {
      // arrange
      const allTags = {
        tags: [
          {value: 'some_val'}
        ]
      };
      mockDiscussionService.fetchAllTag = jest.fn(() => of(allTags))
      // act
      discusstagsComponent.fetchAllTags();
      // assert
      setTimeout(() => {
        expect(discusstagsComponent.showLoader).toBe(false);
        expect(discusstagsComponent.filteredTags.length).toBe(1);
        done();
      });
    });

    it('should handle error while fetching all tags', (done) => {
      // arrange
      mockDiscussionService.fetchAllTag = jest.fn(() => throwError('err'))
      // act
      discusstagsComponent.fetchAllTags();
      // assert
      setTimeout(() => {
        expect(discusstagsComponent.showLoader).toBe(false);
        done();
      });
    });
  });

  describe('getBgColor', () => {
    it('should return colors', () => {
      // arrange
      mockDiscussUtilsService.stringToColor = jest.fn(() => 'black');
      mockDiscussUtilsService.getContrast = jest.fn(() => 'yellow');
      // act
      expect(discusstagsComponent.getBgColor('some_titile')).toEqual(
        {
          color: 'yellow',
          'background-color': 'black'
        }
      )
    });
  });

  describe('getAllDiscussions', () => {
    it('should fetch all discussions', () => {
      // arrange
      const req = {
        tag: {
          value: 'some_val'
        }
      } as any
      mockRouter.navigate = jest.fn();
      mockConfigService.getRouterSlug = jest.fn();
      // act
      discusstagsComponent.getAllDiscussions(req)
      // assert
      expect(mockRouter.navigate).toHaveBeenCalled();
    });
  });

  

  // describe('fetchAllAvailableCategories', () => {
  //   it('Should fetch all available categories', (done) => {
  //     // arrange
  //     const categoryResp = {
  //       name : 'name'
  //     } as any
  //     mockDiscussionService.fetchSingleCategoryDetails = jest.fn(() => of(categoryResp))
  //     // act
  //     discussCategoryComponent.fetchAllAvailableCategories(['some_cid'])
  //     // assert
  //     setTimeout(() => {
  //       expect(discussCategoryComponent.showLoader).toBe(false);
  //       expect(mockDiscussionService.fetchSingleCategoryDetails).toHaveBeenCalledWith('some_cid');
  //       expect(discussCategoryComponent.categories).toEqual([categoryResp]);
  //       done();
  //     });
  //   })

  //   it('Should handle failure scenarion while fetching categories', (done) => {
  //     // arrange
  //     mockDiscussionService.fetchSingleCategoryDetails = jest.fn(() => throwError({}))
  //     // act
  //     discussCategoryComponent.fetchAllAvailableCategories(['some_cid'])
  //     // assert
  //     setTimeout(() => {
  //       expect(discussCategoryComponent.showLoader).toBe(false);
  //       done();
  //     });
  //   })
  // })

  // describe('logTelemetry', () => {
  //   it('should log telemetry', () => {
  //     // arrange
  //     mockTelemetryUtilsService.logInteract = jest.fn();
  //     // act
  //     discussCategoryComponent.logTelemetry('some_event')
  //     // assert
  //     expect(mockTelemetryUtilsService.logInteract).toHaveBeenCalledWith(
  //       'some_event',
  //       NSDiscussData.IPageName.CATEGORY
  //     )
  //   })
  // })

  // describe('startDiscussion', () => {
  //   it('should open start discussion modal', () => {
  //     // act
  //     discussCategoryComponent.startDiscussion();
  //     // assert
  //     expect(discussCategoryComponent.showStartDiscussionModal).toBe(true);
  //   })
  // })

  // describe('closeModal', () => {
  //   it('should close start discussion modal', () => {
  //     // act
  //     discussCategoryComponent.closeModal('some_event');
  //     // assert
  //     expect(discussCategoryComponent.showStartDiscussionModal).toBe(false);
  //   })
  // })
  
  

})