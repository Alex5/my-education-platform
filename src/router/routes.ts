export const appRoutes = {
    home: {
        path: '/',
        courseDirection: {
            path: '/:courseDirection',
            courseId: {
                path: '/:courseDirection/:courseId',
                lessons: {
                    path: '/:courseDirection/:courseId/lessons'
                }
            }
        },
        videos: {
            path: '/videos'
        }
    },
    noMatch: {
        path: '*'
    }
}