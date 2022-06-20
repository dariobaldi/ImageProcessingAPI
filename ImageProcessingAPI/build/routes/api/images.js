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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const image_processing_1 = __importDefault(require("./image_processing"));
const images = express_1.default.Router();
const assetsPath = path_1.default.resolve(__dirname, '../../../assets');
images.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    let format = req.query.format;
    const supportedFormats = ['jpg', 'jpeg', 'png', 'webp', 'tiff', 'gif'];
    if (!width || !height) {
        res.status(500).send('Error: incorrect height or width for image');
        res.end();
    }
    else if (!filename) {
        res.status(500).send('Error: No filename');
        res.end();
    }
    if (!format) {
        format = 'jpg';
    }
    else if (!supportedFormats.includes(format.toLowerCase())) {
        res.status(500).send('Error: Image format not supported');
        res.end();
    }
    try {
        const newImage = yield (0, image_processing_1.default)(filename, width, height, format);
        res.status(200).sendFile('/lowres/' + newImage, { root: assetsPath });
    }
    catch (error) {
        res.status(500).send(`Error (unkwon): ${error}`);
        res.end();
    }
}));
exports.default = images;
