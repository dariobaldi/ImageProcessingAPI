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
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const resizeImage = (image, width, height, format) => __awaiter(void 0, void 0, void 0, function* () {
    const newImage = `${image}_${width}x${height}.${format}`;
    // Check if image file exists
    if (!fs_1.default.existsSync(`./assets/fullres/${image}.${format}`)) {
        throw `File ${image}.${format} doesn't exists.`;
    }
    // Check if resized image file exists
    if (fs_1.default.existsSync(`./assets/lowres/${newImage}`)) {
        return newImage;
    }
    // Resize image
    const resizing = yield (0, sharp_1.default)(`./assets/fullres/${image}.${format}`)
        .resize(width, height)
        .toFile(`./assets/lowres/${newImage}`);
    if (resizing) {
        return newImage;
    }
    else {
        throw `Unkown error creating lowres image`;
    }
});
exports.default = resizeImage;
