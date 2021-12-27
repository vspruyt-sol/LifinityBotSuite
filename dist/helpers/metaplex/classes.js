"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhitelistedCreator = exports.METADATA_SCHEMA = exports.Metadata = exports.Data = exports.Creator = exports.Edition = exports.EditionMarker = exports.MasterEditionV2 = exports.MasterEditionV1 = void 0;
const types_js_1 = require("./types.js");
class MasterEditionV1 {
    constructor(args) {
        this.key = types_js_1.MetadataKey.MasterEditionV1;
        this.supply = args.supply;
        this.maxSupply = args.maxSupply;
        this.printingMint = args.printingMint;
        this.oneTimePrintingAuthorizationMint =
            args.oneTimePrintingAuthorizationMint;
    }
}
exports.MasterEditionV1 = MasterEditionV1;
class MasterEditionV2 {
    constructor(args) {
        this.key = types_js_1.MetadataKey.MasterEditionV2;
        this.supply = args.supply;
        this.maxSupply = args.maxSupply;
    }
}
exports.MasterEditionV2 = MasterEditionV2;
class EditionMarker {
    constructor(args) {
        this.key = types_js_1.MetadataKey.EditionMarker;
        this.ledger = args.ledger;
    }
    editionTaken(edition) {
        const editionOffset = edition % types_js_1.EDITION_MARKER_BIT_SIZE;
        const indexOffset = Math.floor(editionOffset / 8);
        if (indexOffset > 30) {
            throw Error("bad index for edition");
        }
        const positionInBitsetFromRight = 7 - (editionOffset % 8);
        const mask = Math.pow(2, positionInBitsetFromRight);
        const appliedMask = this.ledger[indexOffset] & mask;
        return appliedMask !== 0;
    }
}
exports.EditionMarker = EditionMarker;
class Edition {
    constructor(args) {
        this.key = types_js_1.MetadataKey.EditionV1;
        this.parent = args.parent;
        this.edition = args.edition;
    }
}
exports.Edition = Edition;
class Creator {
    constructor(args) {
        this.address = args.address;
        this.verified = args.verified;
        this.share = args.share;
    }
}
exports.Creator = Creator;
class Data {
    constructor(args) {
        this.name = args.name;
        this.symbol = args.symbol;
        this.uri = args.uri;
        this.sellerFeeBasisPoints = args.sellerFeeBasisPoints;
        this.creators = args.creators;
    }
}
exports.Data = Data;
class Metadata {
    constructor(args) {
        this.key = types_js_1.MetadataKey.MetadataV1;
        this.updateAuthority = args.updateAuthority;
        this.mint = args.mint;
        this.data = args.data;
        this.primarySaleHappened = args.primarySaleHappened;
        this.isMutable = args.isMutable;
        this.editionNonce = args.editionNonce;
    }
}
exports.Metadata = Metadata;
exports.METADATA_SCHEMA = new Map([
    [
        MasterEditionV1,
        {
            kind: "struct",
            fields: [
                ["key", "u8"],
                ["supply", "u64"],
                ["maxSupply", { kind: "option", type: "u64" }],
                ["printingMint", "pubkeyAsString"],
                ["oneTimePrintingAuthorizationMint", "pubkeyAsString"],
            ],
        },
    ],
    [
        MasterEditionV2,
        {
            kind: "struct",
            fields: [
                ["key", "u8"],
                ["supply", "u64"],
                ["maxSupply", { kind: "option", type: "u64" }],
            ],
        },
    ],
    [
        Edition,
        {
            kind: "struct",
            fields: [
                ["key", "u8"],
                ["parent", "pubkeyAsString"],
                ["edition", "u64"],
            ],
        },
    ],
    [
        Data,
        {
            kind: "struct",
            fields: [
                ["name", "string"],
                ["symbol", "string"],
                ["uri", "string"],
                ["sellerFeeBasisPoints", "u16"],
                ["creators", { kind: "option", type: [Creator] }],
            ],
        },
    ],
    [
        Creator,
        {
            kind: "struct",
            fields: [
                ["address", "pubkeyAsString"],
                ["verified", "u8"],
                ["share", "u8"],
            ],
        },
    ],
    [
        Metadata,
        {
            kind: "struct",
            fields: [
                ["key", "u8"],
                ["updateAuthority", "pubkeyAsString"],
                ["mint", "pubkeyAsString"],
                ["data", Data],
                ["primarySaleHappened", "u8"],
                ["isMutable", "u8"], // bool
            ],
        },
    ],
    [
        EditionMarker,
        {
            kind: "struct",
            fields: [
                ["key", "u8"],
                ["ledger", [31]],
            ],
        },
    ],
]);
class WhitelistedCreator {
    constructor(args) {
        this.key = types_js_1.MetaplexKey.WhitelistedCreatorV1;
        this.activated = true;
        this.address = args.address;
        this.activated = args.activated;
    }
}
exports.WhitelistedCreator = WhitelistedCreator;
//# sourceMappingURL=classes.js.map