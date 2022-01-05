"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const twitter_1 = __importDefault(require("twitter"));
/**
 * Twitter uses 3 legged oAuth for certain endpoints.
 * You can get the oauth key and secret by simulating the API calls yourselves.
 * You need a approved developer account.
 */
class TwitterHelper {
    constructor(config) {
        this.config = config;
        this.client = new twitter_1.default({
            consumer_key: this.config.twitter.consumerApiKey,
            consumer_secret: this.config.twitter.consumerApiSecret,
            access_token_key: this.config.twitter.oauth.token,
            access_token_secret: this.config.twitter.oauth.secret
        });
    }
    /**
     * Downloads image from a URL and returns it in Base64 format.
     * @param url
     * @returns
     */
    getBase64(url) {
        return axios_1.default.get(url, {
            responseType: 'arraybuffer'
        }).then(response => Buffer.from(response.data, 'binary').toString('base64'));
    }
    /**
     * Format your tweet, you can use emojis.
     * @param saleInfo
     * @returns
     */
    formatTweet(saleInfo) {
        return {
            status: `this is a test ${Math.round(Date.now() / 1000)}`
        };
    }
    /**
     * Creates a formatted tweet, uploads the NFT image to twitter and then posts a status update.
     * @param saleInfo
     */
    send(saleInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const me = this;
            let tweetInfo = me.formatTweet(saleInfo);
            /*let image = await me.getBase64(`${saleInfo.nftInfo.image}`);
            let mediaUpload;
            try {
              mediaUpload = await me.client.post('media/upload', { media_data: image });
            } catch (err) {
              console.log(JSON.stringify(err));
              throw err;
            }*/
            //await me.client.post('statuses/update.json', { status: tweetInfo.status, media_ids: mediaUpload.media_id_string });
            try {
                yield me.client.post('statuses/update.json', { status: tweetInfo.status });
            }
            catch (err) {
                console.log(JSON.stringify(err));
                throw err;
            }
        });
    }
}
exports.default = TwitterHelper;
//# sourceMappingURL=twitter-helper.js.map