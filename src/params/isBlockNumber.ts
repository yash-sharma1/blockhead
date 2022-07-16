import type { ParamMatcher } from '@sveltejs/kit'

const isBlockNumber: ParamMatcher = (param) =>
	/^[0-9]+$/i.test(param)

export const match = isBlockNumber