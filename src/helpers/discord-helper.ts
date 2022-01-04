import _ from "lodash";
import axios from "axios";

/**
 * Just setup a new channel in discord, then go to settings, integrations and created a new webhook
 * Set the webhook URL in the config.json.
 */
export default class DiscordHelper {
  config: any;
  constructor(config: any) {
    this.config = config;
  }

  
  _createWebhookData(saleInfo: any) {
    const idNbr = saleInfo.nftInfo.id.replace("LIFINITY Flares #", "");
    const transactionUrl = "https://explorer.solana.com/tx/";
    const addressUrl = "https://explorer.solana.com/address/";
    const gifUrl = "https://nft.lifinity.io/api/download/gif/";
    const lifinityUrl = "https://i.postimg.cc/k4qHK2Sp/ezgif-com-gif-maker.png";
    const favicons = {
      MagicEden: "https://i.postimg.cc/9FKyssLm/ME.png",
      Solanart: "https://i.postimg.cc/gJgZs7wP/solanart.png",
    };
    let imgUrl;
    if(saleInfo.marketPlace == "MagicEden") {
      imgUrl = favicons.MagicEden;
    }
    else if(saleInfo.marketPlace == "Solanart"){
      imgUrl = favicons.Solanart;
    }
    
  
    return {
      username: "Flare Sales Bot",
      avatar_url: lifinityUrl,
      embeds: [
        {
          author: {
            name: "Flare Sales Bot",
          },
          fields: [
            {
              name: "Price",
              value: saleInfo.saleAmount,
            },
            {
              name: "Seller",
              value: `[Seller](${addressUrl + saleInfo.seller})`,
              inline: true,
            },
            {
              name: "Buyer",
              value: `[Buyer](${addressUrl + saleInfo.buyer})`,
              inline: true,
            },
            {
              name: "NFT",
              value: `[NFT](${saleInfo.nftInfo.image})`,
              inline: false,
            },
            {
              name: "Transaction ID",
              value: `[Transaction](${transactionUrl + saleInfo.txSignature})`,
              inline: false,
            },
          ],
          color: 5793266,
          title: `${saleInfo.nftInfo.id} → SOLD 🔥`,
          url: transactionUrl + saleInfo.txSignature,
          thumbnail: {
            url: `${gifUrl + idNbr}`,
          },
          image: {
            url: `${gifUrl + idNbr}`,
          },
          footer: {
            text: `Sold on ${saleInfo.marketPlace}`,
            icon_url: imgUrl,
          },
          timestamp: new Date(saleInfo.time * 1000).toISOString(),
        },
      ],
    };
  }

  async send(saleInfo: any) {
    const me = this;
    
    await axios.post(
      this.config.discord.webhookUrl,
      me._createWebhookData(saleInfo)
    );
  }
}
