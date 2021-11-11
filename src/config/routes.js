export default {
    users: {
        get: '/users/:userId/:secret',
        create: '/users',
        verify: '/users/verify',
    },
    games:{
        index: '/games',
        join: '/games/join/:gameId',
        create: '/games',
    },
}
