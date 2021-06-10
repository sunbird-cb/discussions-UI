import { Renderer2 } from '@angular/core';
import { TelemetryUtilsService } from './../../telemetry-utils.service';
import { ConfigService } from './../../services/config.service';
import { DiscussionService } from './../../services/discussion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DiscussionDetailsComponent } from './discussion-details.component';
import { Location } from '@angular/common';
describe('DiscussionDetailsComponent', () => {
  let discussionDetailsComponent: DiscussionDetailsComponent;

  const mockRouter: Partial<Router> = {
    navigate: jest.fn()
  };

  const mockActivatedRoute: Partial<ActivatedRoute> = {};
  const mockDiscussService: Partial<DiscussionService> = {};
  const mockConfigService: Partial<ConfigService> = {};
  const mockFormBuilder: Partial<FormBuilder> = {};
  const mockTelemetryUtilsService: Partial<TelemetryUtilsService> = {
    uppendContext: jest.fn(),
    logInteract: jest.fn(),
  };
  const mockRenderer2: Partial<Renderer2> = {
    listen: jest.fn()
  };
  const mockLocation: Partial<Location> = {};

  beforeAll(() => {
    discussionDetailsComponent = new DiscussionDetailsComponent(
      mockActivatedRoute as ActivatedRoute,
      mockDiscussService as DiscussionService,
      mockConfigService as ConfigService,
      mockFormBuilder as FormBuilder,
      mockRouter as Router,
      mockTelemetryUtilsService as TelemetryUtilsService,
      mockRenderer2 as Renderer2,
      mockLocation as Location
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should create an instance of DiscussCategoryComponent', () => {
    expect(discussionDetailsComponent).toBeTruthy();
  });

  it('should trigger telemetry event on click of edit ', () => {
    /** Arrange */
    const event = {
      type: 'click',
      target: {
        attributes: {
          id: 'edit-topic'
        }
      }
    };
    const topicData = {
      cid: 356,
      downvotes: 0,
      url: '/discussions/topic/574/test-edit-telemetry'
    };
    jest.spyOn(discussionDetailsComponent, 'logTelemetry').mockImplementation();

    /** Act */
    discussionDetailsComponent.editTopic(event, topicData);

    /** Assert */
    expect(discussionDetailsComponent.showEditTopicModal).toBeTruthy();
    expect(discussionDetailsComponent.logTelemetry).toHaveBeenCalled();
  });
});
