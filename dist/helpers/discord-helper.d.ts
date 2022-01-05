/**
 * Just setup a new channel in discord, then go to settings, integrations and created a new webhook
 * Set the webhook URL in the config.json.
 */
export default class DiscordHelper {
    config: any;
    constructor(config: any);
    _createWebhookData(saleInfo: any): {
        username: string;
        avatar_url: string;
        embeds: {
            author: {
                name: string;
            };
            fields: ({
                name: string;
                value: string;
                inline?: undefined;
            } | {
                name: string;
                value: string;
                inline: boolean;
            })[];
            color: number;
            title: string;
            url: string;
            thumbnail: {
                url: string;
            };
            image: {
                url: string;
            };
            footer: {
                text: string;
                icon_url: string | undefined;
            };
            timestamp: string;
        }[];
    };
    send(saleInfo: any): Promise<void>;
}
