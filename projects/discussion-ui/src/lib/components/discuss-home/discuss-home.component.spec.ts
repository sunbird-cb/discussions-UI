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
  const mockRouter: Partial<Router> = {
    navigate: jest.fn()
  };
  const mockActivatedRoute: Partial<ActivatedRoute> = {};
  const mockTelemetryUtilsService: Partial<TelemetryUtilsService> = {
    logImpression: jest.fn()
  };

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

  describe('ngOnInit', () => {
    it('should call getDiscussionList', () => {
      // arrange
      const params = {
        slug: 'some_slug'
      }
      mockActivatedRoute.params = of(params);
      mockDiscussionService.getContext = jest.fn(() => 'some_cid');
      jest.spyOn(discussHomeComponent, 'getDiscussionList').mockImplementation()
      // act
      discussHomeComponent.ngOnInit();
      // assert
      expect(mockTelemetryUtilsService.logImpression).toHaveBeenCalledWith(NSDiscussData.IPageName.HOME);
      expect(discussHomeComponent.getDiscussionList).toHaveBeenCalled();
    });
  });

  describe('navigateToDiscussionDetails', () => {
    it('should navigate to discussion details page', () => {
      // arrange
      const context = [
        {type: 'Topic', id: 'some_id'}
      ];
      mockTelemetryUtilsService.getContext = jest.fn(() => context)
      mockTelemetryUtilsService.uppendContext = jest.fn();
      mockTelemetryUtilsService.deleteContext = jest.fn();
      mockConfigService.getRouterSlug = jest.fn(() => 'some_slug');
      const req = {
        tid: 'some_tid',
        slug: 'some_slug'
      }
      // act
      discussHomeComponent.navigateToDiscussionDetails(req);
      // assert
      expect(mockTelemetryUtilsService.deleteContext).toHaveBeenCalledWith(context[0]);
      expect(mockTelemetryUtilsService.uppendContext).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalled();
    });
  });

  describe('getDiscussionList', () => {
    it('should fetch discussion list', (done) => {
      // arrange
      const topics = {
        'privileges.topics:create': true,
        topics: [
          {
            id: 'tid_1'
          }
        ]
      };
      mockDiscussionService.getContextBasedTopic = jest.fn(() => of(topics))
      // act
      discussHomeComponent.getDiscussionList('some_slug');
      // assert
      setTimeout(() => {
        expect(discussHomeComponent.isTopicCreator).toBe(true);
        done()
      });
      
    });
  });

  describe('logTelemetry', () => {
    it('should log telemetry', () => {
      // arrange
      mockTelemetryUtilsService.logInteract = jest.fn();
      // act
      discussHomeComponent.logTelemetry('some_event')
      // assert
      expect(mockTelemetryUtilsService.logInteract).toHaveBeenCalledWith(
        'some_event',
        NSDiscussData.IPageName.HOME
      )
    })
  });

  describe('startDiscussion', () => {
    it('should open start discussion modal', () => {
      // act
      discussHomeComponent.startDiscussion();
      // assert
      expect(discussHomeComponent.showStartDiscussionModal).toBe(true);
    })
  });

  describe('closeModal', () => {
    it('should close start discussion modal', () => {
      // arrange
      const event = {
        message: 'success'
      };
      // act
      discussHomeComponent.closeModal(event);
      // assert
      expect(discussHomeComponent.showStartDiscussionModal).toBe(false);
    })
  })

})