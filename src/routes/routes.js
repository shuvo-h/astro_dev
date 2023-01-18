import React from 'react';

const ExplorePublications = React.lazy(()=>import("../components/publications/ExplorePublications"));
const PostDetails = React.lazy(()=>import("../components/PostDetails/PostDetails"));
const UserProfile = React.lazy(()=>import("../components/UserProfile/UserProfile"));
const NotFound = React.lazy(()=>import("../components/NotFound"));

export const publicRoutes = [
    {
        path: "/",
        name: "ExplorePublications",
        Component: ExplorePublications,
    },
    {
        path: "/post/:id",
        name: "PostDetails",
        Component: PostDetails,
    },
    {
        path: "/user/:handle",
        name: "UserProfile",
        Component: UserProfile,
    },
    {
        path: "/*",
        name: "Not Found",
        Component: NotFound,
    },
]