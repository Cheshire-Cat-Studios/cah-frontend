export default {
    users: {
        get: '/users/:userId/:secret',
        create: '/users',
        verify: '/users/verify',
    },
    games:{
        index: '/games',
        join: '/games',
        create: '/games/join/:gameId',
    },
}
