<script lang="ts">
	// Types
	import type { Ethereum } from '../data/ethereum/types'
	import type { BigNumber } from 'ethers'


	// External state
	export let availableTokens: Ethereum.ERC20Token[]

	export let token: Ethereum.ERC20Token
	export let amount: BigNumber

	export let min: BigNumber
	export let max: BigNumber
	export let stepDecimals = token?.decimals // 3

	export let autoFallback = false
	export let required = false


	// Components
	import BigNumberInput from './BigNumberInput.svelte'
	import TokenSelect from './TokenSelect.svelte'
</script>


<style>
	.row {
		grid-template-columns: 1fr auto;
		--grid-gap: 1em;
	}

	.max {
		justify-self: end;
		align-self: center;
		margin-right: .5rem;
	}
</style>


<div class="row">
	<BigNumberInput
		bind:value={amount}
		{min}
		{max}
		{decimals}
		{required}
	/>

	<TokenSelect {availableTokens} {autoFallback} {required} bind:token />
</div>
