export const urlConfig = {
    // endpoint configs...!
    host: 'http://localhost:3002',
    userName: 'admin',
    apiSlug: '/discussion',
    apiBasePath: () => `${urlConfig.host}${urlConfig.apiSlug}`,

    // URLs...!
    getAllCategories: () => `${urlConfig.apiBasePath()}/categories`,
    getSingleCategoryDetails: (cid: number) => `${urlConfig.apiBasePath()}/categories/${cid}`,
    getAllTags: () => `${urlConfig.apiBasePath()}/tags`,
    createPost: () => `${urlConfig.apiBasePath()}/writeApi/v2/topics`,
    votePost: (pid: number) => `${urlConfig.apiBasePath()}/writeApi/v2/posts/${pid}/vote`,
    replyPost: (tid: number) => `${urlConfig.apiBasePath()}/writeApi/v2/topics/${tid}`,
    bookmarkPost: (pid: number) => `${urlConfig.apiBasePath()}/writeApi/v2/posts/${pid}/bookmark`,
    recentPost: () => `${urlConfig.apiBasePath()}/topics/recent`,
    popularPost: () => `${urlConfig.apiBasePath()}/topics/popular`,
    unread: () => `${urlConfig.apiBasePath()}/topics/unread/total`,
    getTopic: () => `${urlConfig.apiBasePath()}/topic`,
    profile: () => `${urlConfig.apiBasePath()}/users/me`,
    fetchProfile: (slug: string) => `${urlConfig.apiBasePath()}/users/${slug}/about`,
    listUpVote: (slug: string) => `${urlConfig.apiBasePath()}/user/${slug}/upvoted`,
    listDownVoted: (slug: string) => `${urlConfig.apiBasePath()}/user/${slug}/downvoted`,
    listSaved: (slug: string) => `${urlConfig.apiBasePath()}/user/${slug}/bookmarks`,
    fetchNetworkProfile: `user/profileDetails/getUserRegistry`,
    userdetails: (slug: string) => `${urlConfig.apiBasePath()}/user/${slug}`,
    getContextBasedTopics: (slug: string) => `${urlConfig.apiBasePath()}/category/${slug}`
};
