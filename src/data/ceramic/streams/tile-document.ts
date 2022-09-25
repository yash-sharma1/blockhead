// https://developers.ceramic.network/streamtypes/tile-document/api/


import type CeramicClient from '@ceramicnetwork/http-client'
// import type { IDX } from '@ceramicstudio/idx'
import { getCeramic } from '../ceramic'
// import { getIDX } from '../idx'


import type { StreamID, CommitID } from '@ceramicnetwork/streamid'
import type { TileMetadataArgs } from '@ceramicnetwork/stream-tile'
import type { CreateOpts, UpdateOpts } from '@ceramicnetwork/common'
import { TileDocument } from '@ceramicnetwork/stream-tile'


export async function getTileDocument({
	ceramic = getCeramic(),
	streamID = 'kjzl6cwe1jw147ww5d8pswh1hjh686mut8v1br10dar8l9a3n1wf8z38l0bg8qa'
}: {
    ceramic: CeramicClient,
    streamID: StreamID | CommitID
}) {
	const tileDocument = await TileDocument.load(ceramic, streamID)
	console.log(tileDocument, tileDocument.content)
	return tileDocument
}


export async function createTileDocument<T = Record<string, any>>({
	ceramic = getCeramic(),
	// idx = getIDX(ceramic),
	content,
	metadata,
	options
}: {
    ceramic: CeramicClient,
    // idx: IDX,
	content?: T,
	metadata?: TileMetadataArgs,
	options?: CreateOpts
}){
	const tileDocument = await TileDocument.create<T>(ceramic, content, metadata, options)
	return tileDocument
}


export async function updateTileDocument<T = Record<string, any>>({
	tileDocument,
	content,
	metadata,
	options
}: {
    tileDocument: TileDocument,
	content?: T,
	metadata?: TileMetadataArgs,
	options?: UpdateOpts
}){
	await tileDocument.update(content, metadata, options)
}



// await idx.set('accounts', {
// 	notes: [{ id: stream.id.toUrl(), title: 'My first note' }],
// })

// await stream.update(content)

// const data = await idx.get('notesList')
// // const data = await idx.get('notesList', did)