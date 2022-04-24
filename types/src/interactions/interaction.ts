import { ChannelPayload } from "../channels/base.ts";
import { EmbedPayload } from "../channels/embed.ts";
import { AllowedMentionsPayload } from "../channels/etc.ts";
import { AttachmentPayload, MessagePayload } from "../channels/message.ts";
import { Locales } from "../etc/locales.ts";
import { GuildMemberPayload } from "../guilds/member.ts";
import { RolePayload } from "../guilds/role.ts";
import { UserPayload } from "../users/user.ts";
import {
  ApplicationCommandInteractionDataOptionPayload,
  ApplicationCommandOptionChoicePayload,
  ApplicationCommandType,
} from "./command.ts";
import {
  ComponentPayload,
  ComponentType,
  SelectOptionsPayload,
} from "./components.ts";

export interface InteractionPayload {
  id: string;
  application_id: string;
  type: InteractionType;
  data?:
    | ApplicationCommandInteractionDataPayload
    | ComponentInteractionDataPayload
    | SelectMenusComponentInteractionDataPayload
    | CommandInterfaceDataPayload;
  guild_id?: string;
  channel_id?: string;
  member?: GuildMemberPayload;
  user?: UserPayload;
  token: string;
  version: 1;
  message?: MessagePayload;
  locale?: Locales;
  guild_locale?: Locales;
}

export enum InteractionType {
  PING = 1,
  APPLICATION_COMMAND = 2,
  MESSAGE_COMPONENT = 3,
  APPLICATION_COMMAND_AUTOCOMPLETE = 4,
}

export interface ApplicationCommandInteractionDataPayload {
  id: string;
  name: string;
  type: ApplicationCommandType;
  resolved?: ResolvedDataPayload;
  options?: ApplicationCommandInteractionDataOptionPayload[];
}

export interface ComponentInteractionDataPayload {
  custom_id?: string;
  component_type?: ComponentType;
}
export interface SelectMenusComponentInteractionDataPayload
  extends ComponentInteractionDataPayload {
  values?: SelectOptionsPayload[];
}

export interface CommandInterfaceDataPayload {
  target_id?: string;
}

export interface ResolvedDataPayload {
  users?: { string: UserPayload };
  members?: { string: GuildMemberPayload };
  roles?: { string: RolePayload };
  channels?: { string: ChannelPayload };
  messages?: { string: MessagePayload };
}

export interface MessageInteractionPayload {
  id: string;
  type: InteractionType;
  name: string;
  user: UserPayload;
  member?: GuildMemberPayload;
}

export interface InteractionResponsePayload {
  type: InteractionCallbackType;
  data?: MessageInteractionCallbackData | AutocompleteInteractionCallbackData;
}

export enum InteractionCallbackType {
  PONG = 1,
  CHANNEL_MESSAGE_WITH_SOURCE = 4,
  DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5,
  DEFERRED_UPDATE_MESSAGE = 6,
  UPDATE_MESSAGE = 7,
  APPLICATION_COMMAND_AUTOCOMPLETE_RESULT = 8,
}

export interface MessageInteractionCallbackData {
  tts?: boolean;
  content?: string;
  embeds?: EmbedPayload[];
  allowed_mentions?: AllowedMentionsPayload;
  flags?: number;
  components?: ComponentPayload[];
  attachments?: AttachmentPayload[];
}

export interface AutocompleteInteractionCallbackData {
  choices: ApplicationCommandOptionChoicePayload[];
}