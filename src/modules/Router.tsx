import { createSelector } from "@reduxjs/toolkit";
import {CombinedState} from "./RootModule";

const routerSelector = (state: CombinedState) => state.router
const pathname = createSelector(
    routerSelector,
    state => state.location.pathname
    )

export const selectors = {pathname}