"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const images = express_1.default.Router();
images.get('/', (req, res) => {
    let filename = req.query.filename;
    let width = parseInt(req.query.width);
    let height = parseInt(req.query.height);
    resize_image(filename, width, height);
    res.send('This is the images route');
});
function resize_image(image, width, height) {
    const new_image = `${image}_${width}x${height}.jpg`;
    if (fs_1.default.existsSync('./assets/lowres/' + new_image)) {
        console.log('File already exists: ' + new_image);
        return true;
    }
    (0, sharp_1.default)('./assets/fullres/' + image + '.jpg')
        .resize(width, height)
        .toFile('./assets/lowres/' + new_image, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Image converted: ' + new_image);
        }
    });
    return true;
}
exports.default = images;
