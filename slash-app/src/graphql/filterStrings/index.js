export const ORDER_BY_CREATED_AT_DESC = 'order : { desc : createdAt }'
export const ORDER_BY_CREATED_AT_ASC = 'order : { asc : createdAt }'

export const ORDER_BY_FAVORITE_COUNT_DESC = 'order : { desc : favoriteCount }'
export const ORDER_BY_FAVORITE_COUNT_ASC = 'order : { asc : favoriteCount }'

export const FILTER_BY_SCREEN_NAME = (screenName) => {
    return `filter: {screenName: {alloftext: "${screenName}"}}`
}