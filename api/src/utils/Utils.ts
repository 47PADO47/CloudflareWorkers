import { DiscordWebhookOptions } from '../types/Utils';
import { DISCORD_WEBHOOK } from './Constants';

async function DiscordWebhook(opts: DiscordWebhookOptions = {
    title: "",
    description: "",
}): Promise<boolean> {
    const res = await fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: 'Cloudflare Workers (API) ☁',
            embeds: [{
                title: opts.title,
                description: opts.description,
                color: 16763904,
            }],
        }),
    });
    return res.ok;
};

export {
    DiscordWebhook,
}