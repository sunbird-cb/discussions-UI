import { Injectable } from '@angular/core';
import { of as observableOf, throwError as observableThrowError, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { urlConfig } from './../config/url.config';
import { NSDiscussData } from '../models/discuss.model';

/* tslint:disable */
import * as _ from 'lodash'
/* tslint:enable */

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  // tslint:disable-next-line:variable-name
  private _userDetails: any;

  // tslint:disable-next-line:variable-name
  private _userName: any;

  // tslint:disable-next-line:variable-name
  private _forumIds: any;

  usr: any;

  constructor( private http: HttpClient ) {
    // TODO: Take from the logged in user data;
    // this.usr = this.configSvc.userProfile
    this.usr = { userId: '1234' };
  }

  initializeUserDetails(userName) {
    this.fetchUserProfile(userName).subscribe(response => {
      console.log('user', response);
      this.userDetails = response;
    }, (error) => {
      // TODO: toaster error
        console.log('error fetching user details');
      });
  }

  appendPage(page: any, url: string) {
    if (page) {
      return `${url}?page=${page}`;
    }
    return `${url}?page=1`;
  }

  fetchAllTags() {
    const tags = this.http.get(urlConfig.getAllTags())
      .toPromise();
    return tags;
  }

  createPost(data: any) {
    return this.http.post(urlConfig.createPost(), data);
  }
  /**
   * @description To get all the categories
   */
  fetchAllCategories() {
    return this.http.get<NSDiscussData.ICategorie[]>(urlConfig.getAllCategories()).pipe(
      map((data: any) => {
          // Taking only "categories" from the response
          const resp = (data as any).categories;
          return resp;
      }),
      catchError( error => {
        return throwError( 'Something went wrong!' );
      })
    );
  }

  fetchSingleCategoryDetails(cid: any) {
    return this.http.get<NSDiscussData.ICategorie>(urlConfig.getSingleCategoryDetails(cid));
  }
  fetchSingleCategoryDetailsSort(cid: number, sort: any, page?: any) {
    const url = this.appendPage(page, urlConfig.getSingleCategoryDetails(cid));
    return this.http.get(`${url}&sort=${sort}`);
  }

  fetchAllTag() {
    return this.http.get(urlConfig.getAllTags());
  }

  fetchPostDetails() {
    return this.http.get(urlConfig.getAllTags());
  }

  votePost(pid: number, data: any) {
    const url = urlConfig.votePost(pid);
    return this.http.post(url, data);
  }

  deleteVotePost(pid: number) {
    const url = urlConfig.votePost(pid);
    return this.http.delete(url);
  }

  bookmarkPost(pid: number) {
    const url = urlConfig.bookmarkPost(pid);
    return this.http.post(url, {});
  }

  deleteBookmarkPost(pid: number) {
    const url = urlConfig.bookmarkPost(pid);
    return this.http.delete(url);
  }

  replyPost(tid: number, data: any) {
    const url = urlConfig.replyPost(tid);
    return this.http.post(url, data);
  }

  fetchRecentD(page?: any) {
    const url = this.appendPage(page, urlConfig.recentPost());
    return this.http.get(url);
  }
  fetchPopularD(page?: any) {
    const url = this.appendPage(page, urlConfig.popularPost());
    return this.http.get(url);
  }

  fetchTopicById(topicId: number, slug?: any, page?: any) {
    let url = urlConfig.getTopic() + '/' + topicId.toString() + '/' + slug;
    url = this.appendPage(page, url);
    return this.http.get(url);
  }

  fetchTopicByIdSort(topicId: number, sort: any, page?: any) {
    let url = urlConfig.getTopic + topicId.toString();
    url = this.appendPage(page, url);
    return this.http.get(`${url}&sort=${sort}`);
  }

  fetchUnreadCOunt() {
    return this.http.get<any>(urlConfig.unread());
  }
  fetchProfile() {
    return this.http.get(urlConfig.profile());
  }
  fetchProfileInfo(slug: string) {
    return this.http.get(urlConfig.fetchProfile(slug));
  }
  fetchUpvoted() {// 0
    return this.http.get(urlConfig.listUpVote(_.get(this._userDetails, 'username')));
  }
  fetchDownvoted() { // 0
    return this.http.get(urlConfig.listDownVoted(_.get(this._userDetails, 'username')));
  }
  fetchSaved() { // 0 this.usr.userId
    return this.http.get(urlConfig.listSaved(_.get(this._userDetails, 'username')));
  }

  fetchUserProfile(userName) {
    return this.http.get<any>(urlConfig.userDetails(userName));
  }

  getContextBasedTopic(slug: string) {
    return this.http.get(urlConfig.getContextBasedTopics(slug));
  }

  registerUser(data) {
    return this.http.post(urlConfig.registerUser(), data);
  }

  set userDetails(userDetails) {
    this._userDetails = userDetails;
  }

  get userDetails() {
    return this._userDetails;
  }

  set userName(userName) {
    this._userName = userName;
  }

  get userName() {
    return this._userName;
  }

  set forumIds(ids) {
    this._forumIds = ids;
  }

  get forumIds() {
    return this._forumIds;
  }
}
