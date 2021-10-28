import { createSelector } from "reselect";
import { memoize } from "lodash";

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).sort().map(key => collections[key]) : []
);

export const selectCollection = memoize((collectionUrlParam) => {
    return createSelector(
        [selectCollections],
        collections => collections ? collections[collectionUrlParam] : null
    )
});

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
)