// @flow
import {Map, Record, List, Set} from 'immutable'
import * as SearchConstants from './search'
import * as Teams from './teams'
import * as Git from './git'
import * as ChatConstants from './chat'
import HiddenString from '../util/hidden-string'

import type {KBRecord, KBOrderedSet} from './types/more'
import type {NoErrorTypedAction} from './types/flux'
import type {DeviceDetailRecord} from './devices'

export type EntityType = any // TODO stronger typing?

// Actions
export type Delete = NoErrorTypedAction<'entity:delete', {keyPath: Array<string>, ids: Array<string>}>
export type Merge = NoErrorTypedAction<
  'entity:merge',
  {keyPath: Array<string>, entities: {[id: string]: EntityType} | Array<EntityType>}
>
export type Replace = NoErrorTypedAction<
  'entity:replace',
  {keyPath: Array<string>, entities: {[id: string]: EntityType}}
>

export type Actions = Delete | Merge | Replace

// State
export type State = KBRecord<{
  attachmentDownloadProgress: Map<ChatConstants.MessageKey, ?number>,
  attachmentDownloadedPath: Map<ChatConstants.MessageKey, ?string>,
  attachmentPreviewPath: Map<ChatConstants.MessageKey, ?string>,
  attachmentPreviewProgress: Map<ChatConstants.MessageKey, ?number>,
  attachmentSavedPath: Map<ChatConstants.MessageKey, ?string>,
  attachmentUploadProgress: Map<ChatConstants.MessageKey, ?number>,
  convIDToSnippet: Map<ChatConstants.ConversationIDKey, ?HiddenString>,
  conversationMessages: Map<ChatConstants.ConversationIDKey, KBOrderedSet<ChatConstants.MessageKey>>,
  deletedIDs: Map<ChatConstants.ConversationIDKey, Set<ChatConstants.MessageID>>,
  devices: Map<string, DeviceDetailRecord>,
  git: Git.GitRecord,
  inbox: Map<ChatConstants.ConversationIDKey, ChatConstants.InboxState>,
  inboxBigChannels: Map<ChatConstants.ConversationIDKey, string>,
  inboxSmallTimestamps: Map<ChatConstants.ConversationIDKey, string>,
  inboxVersion: Map<ChatConstants.ConversationIDKey, number>,
  inboxIsEmpty: Map<ChatConstants.ConversationIDKey, boolean>,
  inboxAlwaysShow: Map<ChatConstants.ConversationIDKey, boolean>,
  inboxSupersededBy: Map<ChatConstants.ConversationIDKey, boolean>,
  messageUpdates: Map<
    ChatConstants.ConversationIDKey,
    Map<ChatConstants.MessageID, KBOrderedSet<ChatConstants.MessageKey>>
  >,
  messages: Map<ChatConstants.MessageKey, ChatConstants.Message>,
  searchQueryToResult: Map<SearchConstants.SearchQuery, List<SearchConstants.SearchResultId>>,
  searchResults: Map<SearchConstants.SearchResultId, KBRecord<SearchConstants.SearchResult>>,
  teams: Teams.TeamRecord,
}>

const StateRecord = Record({
  attachmentDownloadProgress: Map(),
  attachmentDownloadedPath: Map(),
  attachmentPreviewPath: Map(),
  attachmentPreviewProgress: Map(),
  attachmentSavedPath: Map(),
  attachmentUploadProgress: Map(),
  convIDToSnippet: Map(),
  conversationMessages: Map(),
  deletedIDs: Map(),
  devices: Map(),
  git: new Git.Git(),
  inbox: Map(),
  inboxBigChannels: Map(),
  inboxSmallTimestamps: Map(),
  inboxVersion: Map(),
  inboxIsEmpty: Map(), // maps and not sets as we don't have good helpers for that in entities yet
  inboxAlwaysShow: Map(),
  inboxSupersededBy: Map(),
  messageUpdates: Map(),
  messages: Map(),
  searchQueryToResult: Map(),
  searchResults: Map(),
  teams: new Teams.Team(),
})

export {StateRecord}
